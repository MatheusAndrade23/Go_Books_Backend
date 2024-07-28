import { BadRequestException, Controller, Get } from "@nestjs/common";
import { GetAuctionsByAuthorIdUseCase } from "@/domain/auctions/application/use-cases/get-auctions-by-author-id";
import { AuctionPresenter } from "../presenters/auction-presenter";

import { CurrentUser } from "@/infra/auth/current-user-decorator";
import { UserPayload } from "@/infra/auth/jwt.strategy";

@Controller("/auctions/seller")
export class FetchAuctionsByAuthorIdController {
  constructor(
    private getAuctionsByAuthorIdUseCase: GetAuctionsByAuthorIdUseCase
  ) {}

  @Get()
  async handle(@CurrentUser() user: UserPayload) {
    const authorId = user.sub;

    const result = await this.getAuctionsByAuthorIdUseCase.execute({
      authorId,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    const auctions = result.value.auctions;

    return { auctions: auctions.map(AuctionPresenter.toHTTP) };
  }
}
