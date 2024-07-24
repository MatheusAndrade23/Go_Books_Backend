import { PaginationParams } from "@/core/repositories/pagination-params";
import { AuctionsRepository } from "@/domain/auctions/application/repositories/auctions-repository";
import { Auction } from "@/domain/auctions/enterprise/entities/auction";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { PrismaAuctionMapper } from "../mappers/prisma-auction-mapper";

@Injectable()
export class PrismaAuctionsRepository implements AuctionsRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Auction | null> {
    const auction = await this.prisma.auction.findUnique({
      where: {
        id,
      },
    });

    if (!auction) {
      return null;
    }

    return PrismaAuctionMapper.toDomain(auction);
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
