import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from "@nestjs/common";
import { CurrentUser } from "@/infra/auth/current-user-decorator";
import { UserPayload } from "@/infra/auth/jwt.strategy";
import { DeleteAuctionUseCase } from "@/domain/auctions/application/use-cases/delete-auction";

@Controller("/auctions/:id")
export class DeleteAuctionController {
  constructor(private deleteAuction: DeleteAuctionUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: UserPayload,
    @Param("id") auctionId: string
  ) {
    const userId = user.sub;

    const result = await this.deleteAuction.execute({
      auctionId,
      authorId: userId,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
