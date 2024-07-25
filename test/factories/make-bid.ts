import { faker } from "@faker-js/faker";

import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Bid, BidProps } from "@/domain/auctions/enterprise/entities/bid";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { PrismaBidMapper } from "@/infra/database/prisma/mappers/prisma-bid-mapper";

export function makeBid(override: Partial<BidProps> = {}, id?: UniqueEntityID) {
  const bid = Bid.create(
    {
      bidderId: new UniqueEntityID(),
      auctionId: new UniqueEntityID(),
      amount: faker.datatype.number(),
      status: "pending",
      ...override,
    },
    id
  );

  return bid;
}

@Injectable()
export class BidFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaBid(data: Partial<BidProps> = {}): Promise<Bid> {
    const bid = makeBid(data);

    await this.prisma.bid.create({
      data: PrismaBidMapper.toPrisma(bid),
    });

    return bid;
  }
}
