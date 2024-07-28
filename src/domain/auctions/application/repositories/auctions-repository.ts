import { PaginationParams } from "@/core/repositories/pagination-params";
import { Auction } from "@/domain/auctions/enterprise/entities/auction";

export abstract class AuctionsRepository {
  abstract findById(id: string): Promise<Auction | null>;
  abstract findManyBySlug(slug: string): Promise<Auction[]>;
  abstract create(auction: Auction): Promise<void>;
  abstract delete(auction: Auction): Promise<void>;
  abstract save(auction: Auction): Promise<void>;
  abstract findManyRecent(params: PaginationParams): Promise<Auction[]>;
  abstract findManyByBookGenre(bookGenre: string): Promise<Auction[]>;
  abstract findManyByAuthorId(id: string): Promise<Auction[]>;
}
