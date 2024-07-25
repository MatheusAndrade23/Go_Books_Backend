import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from "@nestjs/common";
import { CurrentUser } from "@/infra/auth/current-user-decorator";
import { UserPayload } from "@/infra/auth/jwt.strategy";
import { DeleteBidUseCase } from "@/domain/auctions/application/use-cases/delete-bid";

@Controller("/bids/:id")
export class DeleteBidController {
  constructor(private deleteBid: DeleteBidUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(@CurrentUser() user: UserPayload, @Param("id") bidId: string) {
    const userId = user.sub;

    const result = await this.deleteBid.execute({
      bidId,
      bidderId: userId,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
