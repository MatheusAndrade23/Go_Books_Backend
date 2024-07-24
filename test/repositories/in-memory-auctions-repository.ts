import { PaginationParams } from "@/core/repositories/pagination-params";
import { AuctionsRepository } from "@/domain/auctions/application/repositories/auctions-repository";
import { Auction } from "@/domain/auctions/enterprise/entities/auction";

export class InMemoryAuctionsRepository implements AuctionsRepository {
  public items: Auction[] = [];

  async findBySlug(slug: string) {
    const auction = this.items.find((item) => item.slug.value === slug);

    if (!auction) {
      return null;
    }

    return auction;
  }

  async create(auction: Auction) {
    this.items.push(auction);
  }

  async findById(id: string) {
    const auction = this.items.find((item) => item.id.toString() === id);

    if (!auction) {
      return null;
    }

    return auction;
  }

  async delete(auction: Auction) {
    const itemIndex = this.items.findIndex((item) => item.id === auction.id);

    this.items.splice(itemIndex, 1);
  }

  async save(auction: Auction) {
    const itemIndex = this.items.findIndex((item) => item.id === auction.id);

    this.items[itemIndex] = auction;
  }

  async findManyRecent({ page }: PaginationParams) {
    const auctions = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20);

    return auctions;
  }
}
