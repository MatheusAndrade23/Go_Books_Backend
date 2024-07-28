import { Bid } from "@/domain/auctions/enterprise/entities/bid";

export class BidPresenter {
  static toHTTP(bid: Bid) {
    return {
      id: bid.id.toString(),
      auctionId: bid.auctionId.toString(),
      authorId: bid.bidderId.toString(),
      amount: bid.amount,
      status: bid.status,
    };
  }
}
