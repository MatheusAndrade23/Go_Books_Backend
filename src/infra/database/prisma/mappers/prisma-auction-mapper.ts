import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Auction } from "@/domain/auctions/enterprise/entities/auction";
import { Slug } from "@/domain/auctions/enterprise/entities/value-objects/slug";
import { Auction as PrismaAuction, Prisma } from "@prisma/client";

export class PrismaAuctionMapper {
  static toDomain(raw: PrismaAuction): Auction {
    return Auction.create(
      {
        bookName: raw.bookName,
        bookImageUrl: raw.bookImageUrl,
        description: raw.description,
        authorId: new UniqueEntityID(raw.authorId),
        slug: Slug.create(raw.slug),
        createdAt: raw.createdAt,
        acceptedBidId: raw.acceptedBidId
          ? new UniqueEntityID(raw.acceptedBidId)
          : null,
      },
      new UniqueEntityID(raw.id)
    );
  }

  static toPrisma(auction: Auction): Prisma.AuctionUncheckedCreateInput {
    return {
      id: auction.id.toString(),
      authorId: auction.authorId.toString(),
      acceptedBidId: auction.acceptedBidId?.toString(),
      bookName: auction.bookName,
      description: auction.description,
      slug: auction.slug.value,
      createdAt: auction.createdAt,
      bookImageUrl: auction.bookImageUrl,
    };
  }
}
