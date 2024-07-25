import { PaginationParams } from "@/core/repositories/pagination-params";
import { Bid } from "../../enterprise/entities/bid";

export abstract class BidsRepository {
  abstract findById(id: string): Promise<Bid | null>;
  abstract findManyByAuctionId(
    auctionId: string,
    params: PaginationParams
  ): Promise<Bid[]>;

  abstract create(bid: Bid): Promise<void>;
  abstract save(bid: Bid): Promise<void>;
  abstract delete(bid: Bid): Promise<void>;
}
