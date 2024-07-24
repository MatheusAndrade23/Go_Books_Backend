import { faker } from "@faker-js/faker";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import {
  Auction,
  AuctionProps,
} from "@/domain/auctions/enterprise/entities/auction";
import { PrismaAuctionMapper } from "@/infra/database/prisma/mappers/prisma-auction-mapper";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/infra/database/prisma/prisma.service";

export function makeAuction(
  override: Partial<AuctionProps> = {},
  id?: UniqueEntityID
) {
  const auction = Auction.create(
    {
      authorId: new UniqueEntityID(),
      bookName: faker.lorem.sentence(),
      description: faker.lorem.text(),
      bookImageUrl: faker.image.imageUrl(),
      ...override,
    },
    id
  );

  return auction;
}

@Injectable()
export class AuctionFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaAuction(data: Partial<AuctionProps> = {}): Promise<Auction> {
    const auction = makeAuction(data);

    await this.prisma.auction.create({
      data: PrismaAuctionMapper.toPrisma(auction),
    });

    return auction;
  }
}
