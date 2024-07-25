import { Auction } from "@/domain/auctions/enterprise/entities/auction";

export class AuctionPresenter {
  static toHTTP(auction: Auction) {
    return {
      id: auction.id.toString(),
      bookName: auction.bookName,
      slug: auction.slug.value,
      acceptedBidId: auction.acceptedBidId?.toString(),
      createdAt: auction.createdAt,
      bookImageUrl: auction.bookImageUrl,
      bookGenre: auction.bookGenre,
    };
  }
}
