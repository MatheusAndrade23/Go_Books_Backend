import { PaginationParams } from "@/core/repositories/pagination-params";
import { Auction } from "@/domain/auctions/enterprise/entities/auction";

export interface AuctionsRepository {
  findById(id: string): Promise<Auction | null>;
  findBySlug(slug: string): Promise<Auction | null>;
  create(auction: Auction): Promise<void>;
  delete(auction: Auction): Promise<void>;
  save(auction: Auction): Promise<void>;
  findManyRecent(params: PaginationParams): Promise<Auction[]>;
}
