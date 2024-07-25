import { DomainEvents } from "@/core/events/domain-events";
import { PaginationParams } from "@/core/repositories/pagination-params";
import { BidsRepository } from "@/domain/auctions/application/repositories/bids-repository";
import { Bid } from "@/domain/auctions/enterprise/entities/bid";

export class InMemoryBidsRepository implements BidsRepository {
  public items: Bid[] = [];

  constructor() {}

  async findById(id: string) {
    const bid = this.items.find((item) => item.id.toString() === id);

    if (!bid) {
      return null;
    }

    return bid;
  }

  async findManyByAuctionId(auctionId: string, { page }: PaginationParams) {
    const bids = this.items
      .filter((item) => item.auctionId.toString() === auctionId)
      .slice((page - 1) * 20, page * 20);

    return bids;
  }

  async create(bid: Bid) {
    this.items.push(bid);
  }

  async save(bid: Bid) {
    const itemIndex = this.items.findIndex((item) => item.id === bid.id);

    this.items[itemIndex] = bid;
  }

  async delete(bid: Bid) {
    const itemIndex = this.items.findIndex((item) => item.id === bid.id);

    this.items.splice(itemIndex, 1);
  }
}
