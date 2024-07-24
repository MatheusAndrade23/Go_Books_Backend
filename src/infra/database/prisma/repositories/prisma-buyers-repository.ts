import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { BuyersRepository } from "@/domain/auctions/application/repositories/buyers-repository";
import { Buyer } from "@/domain/auctions/enterprise/entities/buyer";
import { PrismaBuyerMapper } from "../mappers/prisma-buyer-mapper";

@Injectable()
export class PrismaBuyersRepository implements BuyersRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<Buyer | null> {
    const buyer = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!buyer) {
      return null;
    }

    return PrismaBuyerMapper.toDomain(buyer);
  }

  async create(buyer: Buyer): Promise<void> {
    const data = PrismaBuyerMapper.toPrisma(buyer);

    await this.prisma.user.create({
      data,
    });
  }
}
