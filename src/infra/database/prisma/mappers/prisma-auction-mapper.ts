import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Auction } from "@/domain/auctions/enterprise/entities/auction";
import { Slug } from "@/domain/auctions/enterprise/entities/value-objects/slug";
import { Auction as PrismaAuction } from "@prisma/client";

export class PrismaAuctionMapper {
  static toDomain(raw: PrismaAuction): Auction {
    return Auction.create(
      {
        bookName: raw.bookName,
        description: raw.description,
        authorId: new UniqueEntityID(raw.authorId),
        slug: Slug.create(raw.slug),
        createdAt: raw.createdAt,
      },
      new UniqueEntityID(raw.id)
    );
  }
}
