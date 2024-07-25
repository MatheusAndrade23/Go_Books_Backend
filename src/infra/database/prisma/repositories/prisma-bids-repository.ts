import { PaginationParams } from "@/core/repositories/pagination-params";
import { BidsRepository } from "@/domain/auctions/application/repositories/bids-repository";
import { Bid } from "@/domain/auctions/enterprise/entities/bid";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { PrismaBidMapper } from "../mappers/prisma-bid-mapper";

@Injectable()
export class PrismaBidsRepository implements BidsRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Bid | null> {
    const bid = await this.prisma.bid.findUnique({
      where: {
        id,
      },
    });

    if (!bid) {
      return null;
    }

    return PrismaBidMapper.toDomain(bid);
  }

  async findManyByAuctionId(
    auctionId: string,
    { page }: PaginationParams
  ): Promise<Bid[]> {
    const bids = await this.prisma.bid.findMany({
      where: {
        auctionId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return bids.map(PrismaBidMapper.toDomain);
  }

  async create(bid: Bid): Promise<void> {
    const data = PrismaBidMapper.toPrisma(bid);

    await this.prisma.bid.create({
      data,
    });
  }

  async save(bid: Bid): Promise<void> {
    const data = PrismaBidMapper.toPrisma(bid);

    await Promise.all([
      this.prisma.bid.update({
        where: {
          id: bid.id.toString(),
        },
        data,
      }),
    ]);
  }

  async delete(bid: Bid): Promise<void> {
    await this.prisma.bid.delete({
      where: {
        id: bid.id.toString(),
      },
    });
  }
}
