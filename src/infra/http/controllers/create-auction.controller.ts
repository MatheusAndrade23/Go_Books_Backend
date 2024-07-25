import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { CurrentUser } from "@/infra/auth/current-user-decorator";
import { UserPayload } from "@/infra/auth/jwt.strategy";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import { CreateAuctionUseCase } from "@/domain/auctions/application/use-cases/create-auction";
import { z } from "zod";

const createAuctionBodySchema = z.object({
  bookName: z.string(),
  description: z.string(),
  bookImageUrl: z.string(),
  bookGenre: z.string(),
});

const bodyValidationPipe = new ZodValidationPipe(createAuctionBodySchema);

type CreateAuctionBodySchema = z.infer<typeof createAuctionBodySchema>;

@Controller("/auctions")
export class CreateAuctionController {
  constructor(private createAuction: CreateAuctionUseCase) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CreateAuctionBodySchema,
    @CurrentUser() user: UserPayload
  ) {
    const { bookName, description, bookImageUrl, bookGenre } = body;
    const userId = user.sub;

    const result = await this.createAuction.execute({
      authorId: userId,
      bookName,
      bookImageUrl,
      description,
      bookGenre,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
