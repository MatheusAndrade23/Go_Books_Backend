import {
  BadRequestException,
  Controller,
  HttpCode,
  Param,
  Patch,
} from "@nestjs/common";
import { CurrentUser } from "@/infra/auth/current-user-decorator";
import { UserPayload } from "@/infra/auth/jwt.strategy";
import { RejectBidUseCase } from "@/domain/auctions/application/use-cases/reject-bid-by-id";

@Controller("/bids/:id/reject")
export class RejectBidByIdController {
  constructor(private rejectBidById: RejectBidUseCase) {}

  @Patch()
  @HttpCode(204)
  async handle(@CurrentUser() user: UserPayload, @Param("id") bidId: string) {
    const result = await this.rejectBidById.execute({
      bidId,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
