import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Post,
} from "@nestjs/common";
import { CurrentUser } from "@/infra/auth/current-user-decorator";
import { UserPayload } from "@/infra/auth/jwt.strategy";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import { z } from "zod";
import { BidAuctionUseCase } from "@/domain/auctions/application/use-cases/bid-auction";

const bidAuctionBodySchema = z.object({
  amount: z.number(),
  status: z.enum(["accepted", "rejected", "pending"]),
});

const bodyValidationPipe = new ZodValidationPipe(bidAuctionBodySchema);

type BidAuctionBodySchema = z.infer<typeof bidAuctionBodySchema>;

@Controller("/auctions/:auctionId/bids")
export class BidAuctionController {
  constructor(private bidAuction: BidAuctionUseCase) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: BidAuctionBodySchema,
    @CurrentUser() user: UserPayload,
    @Param("auctionId") auctionId: string
  ) {
    const { amount, status } = body;
    const userId = user.sub;

    const result = await this.bidAuction.execute({
      amount,
      auctionId,
      bidderId: userId,
      status,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
