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
  async findManyBySlug(slug: string): Promise<Auction[]> {
    const auctions = await this.prisma.auction.findMany({
      where: {
        slug,
      },
    });

    return auctions.map(PrismaAuctionMapper.toDomain);
  }

  async findManyByAuthorId(authorId: string): Promise<Auction[]> {
    const auctions = await this.prisma.auction.findMany({
      where: {
        authorId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return auctions.map(PrismaAuctionMapper.toDomain);
  }

  async create(auction: Auction): Promise<void> {
    const data = PrismaAuctionMapper.toPrisma(auction);

    data.bookGenre = data.bookGenre.toLowerCase();

    await this.prisma.auction.create({
      data,
    });
  }
  async delete(auction: Auction): Promise<void> {
    const data = PrismaAuctionMapper.toPrisma(auction);

    await this.prisma.auction.delete({
      where: {
        id: data.id,
      },
    });
  }

  async save(auction: Auction): Promise<void> {
    const data = PrismaAuctionMapper.toPrisma(auction);

    await this.prisma.auction.update({
      where: {
        id: auction.id.toString(),
      },
      data,
    });
  }
  async findManyRecent({ page }: PaginationParams): Promise<Auction[]> {
    const auctions = await this.prisma.auction.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return auctions.map(PrismaAuctionMapper.toDomain);
  }

  async findManyByBookGenre(bookGenre: string): Promise<Auction[]> {
    const auctions = await this.prisma.auction.findMany({
      where: {
        bookGenre: bookGenre.toLowerCase(),
      },
    });

    return auctions.map(PrismaAuctionMapper.toDomain);
  }
}
