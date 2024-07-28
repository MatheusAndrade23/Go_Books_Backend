import { BadRequestException, Controller, Get, Param } from "@nestjs/common";

import { GetAuctionByIdUseCase } from "@/domain/auctions/application/use-cases/get-auction-by-id";

import { AuctionPresenter } from "../presenters/auction-presenter";

@Controller("/auction/:id")
export class GetAuctionByIdController {
  constructor(private getAuctionById: GetAuctionByIdUseCase) {}

  @Get()
  async handle(@Param("id") id: string) {
    const result = await this.getAuctionById.execute({
      id,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    const auction = result.value.auction;

    return { auction: AuctionPresenter.toHTTP(auction) };
  }
}
