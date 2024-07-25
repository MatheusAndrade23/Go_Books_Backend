import { Bid as PrismaBid, Prisma } from "@prisma/client";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Bid } from "@/domain/auctions/enterprise/entities/bid";

export class PrismaBidMapper {
  static toDomain(raw: PrismaBid): Bid {
    return Bid.create(
      {
        auctionId: new UniqueEntityID(raw.auctionId),
        bidderId: new UniqueEntityID(raw.bidderId),
        createdAt: raw.createdAt,
        amount: raw.amount,
        status: raw.status,
      },
      new UniqueEntityID(raw.id)
    );
  }

  static toPrisma(bid: Bid): Prisma.BidUncheckedCreateInput {
    return {
      id: bid.id.toString(),
      bidderId: bid.bidderId.toString(),
      auctionId: bid.auctionId.toString(),
      createdAt: bid.createdAt,
      amount: bid.amount,
      status: bid.status,
    };
  }
}
