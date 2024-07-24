import { PaginationParams } from "@/core/repositories/pagination-params";
import { AuctionsRepository } from "@/domain/auctions/application/repositories/auctions-repository";
import { Auction } from "@/domain/auctions/enterprise/entities/auction";

export class PrismaAuctionsRepository implements AuctionsRepository {
  findById(id: string): Promise<Auction | null> {
    throw new Error("Method not implemented.");
  }
  findBySlug(slug: string): Promise<Auction | null> {
    throw new Error("Method not implemented.");
  }
  create(auction: Auction): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(auction: Auction): Promise<void> {
    throw new Error("Method not implemented.");
  }
  save(auction: Auction): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findManyRecent(params: PaginationParams): Promise<Auction[]> {
    throw new Error("Method not implemented.");
  }
}
