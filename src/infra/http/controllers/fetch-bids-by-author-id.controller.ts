import { BadRequestException, Controller, Get } from "@nestjs/common";
import { GetBidsByAuthorIdUseCase } from "@/domain/auctions/application/use-cases/get-bids-by-author-id";
import { BidPresenter } from "../presenters/bid-presenter";

import { CurrentUser } from "@/infra/auth/current-user-decorator";
import { UserPayload } from "@/infra/auth/jwt.strategy";

@Controller("/bids")
export class FetchBidsByAuthorIdController {
  constructor(private getBidsByAuthorIdUseCase: GetBidsByAuthorIdUseCase) {}

  @Get()
  async handle(@CurrentUser() user: UserPayload) {
    const authorId = user.sub;

    const result = await this.getBidsByAuthorIdUseCase.execute({
      authorId,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    const bids = result.value.bids;

    return { bids: bids.map(BidPresenter.toHTTP) };
  }
}
