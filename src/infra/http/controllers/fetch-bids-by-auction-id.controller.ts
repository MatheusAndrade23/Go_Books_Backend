import { BadRequestException, Controller, Get, Param } from "@nestjs/common";
import { GetBidsByAuctionIdUseCase } from "@/domain/auctions/application/use-cases/fetch-bids-by-auction-id";
import { BidPresenter } from "../presenters/bid-presenter";

@Controller("/bids/auction/:id")
export class FetchBidsByAuctionIdController {
  constructor(private getBidsByAuctionIdUseCase: GetBidsByAuctionIdUseCase) {}

  @Get()
  async handle(@Param() id: { id: string }) {
    const auctionId = id.id;

    const result = await this.getBidsByAuctionIdUseCase.execute({
      auctionId,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    const bids = result.value.bids;

    return { bids: bids.map(BidPresenter.toHTTP) };
  }
}
