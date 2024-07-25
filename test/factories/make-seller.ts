import { faker } from "@faker-js/faker";

import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import {
  Seller,
  SellerProps,
} from "@/domain/auctions/enterprise/entities/seller";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { PrismaSellerMapper } from "@/infra/database/prisma/mappers/prisma-seller-mapper";

export function makeSeller(
  override: Partial<SellerProps> = {},
  id?: UniqueEntityID
) {
  const seller = Seller.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      ...override,
    },
    id
  );

  return seller;
}

@Injectable()
export class SellerFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaSeller(data: Partial<SellerProps> = {}): Promise<Seller> {
    const seller = makeSeller(data);

    await this.prisma.user.create({
      data: PrismaSellerMapper.toPrisma(seller),
    });

    return seller;
  }
}
