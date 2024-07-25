import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { SellersRepository } from "@/domain/auctions/application/repositories/sellers-repository";
import { Seller } from "@/domain/auctions/enterprise/entities/seller";
import { PrismaSellerMapper } from "../mappers/prisma-seller-mapper";

@Injectable()
export class PrismaSellersRepository implements SellersRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<Seller | null> {
    const seller = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!seller) {
      return null;
    }

    return PrismaSellerMapper.toDomain(seller);
  }

  async create(seller: Seller): Promise<void> {
    const data = PrismaSellerMapper.toPrisma(seller);

    await this.prisma.user.create({
      data,
    });
  }
}
