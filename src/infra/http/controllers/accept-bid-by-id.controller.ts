import {
  BadRequestException,
  Controller,
  HttpCode,
  Param,
  Patch,
} from "@nestjs/common";
import { CurrentUser } from "@/infra/auth/current-user-decorator";
import { UserPayload } from "@/infra/auth/jwt.strategy";
import { AcceptBidUseCase } from "@/domain/auctions/application/use-cases/accept-bid-by-id";

@Controller("/bids/:id/accept")
export class AcceptBidByIdController {
  constructor(private acceptBidById: AcceptBidUseCase) {}

  @Patch()
  @HttpCode(204)
  async handle(@CurrentUser() user: UserPayload, @Param("id") bidId: string) {
    const result = await this.acceptBidById.execute({
      bidId,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
