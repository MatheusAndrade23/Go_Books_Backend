import { faker } from "@faker-js/faker";

import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Buyer, BuyerProps } from "@/domain/auctions/enterprise/entities/buyer";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { PrismaBuyerMapper } from "@/infra/database/prisma/mappers/prisma-buyer-mapper";

export function makeBuyer(
  override: Partial<BuyerProps> = {},
  id?: UniqueEntityID
) {
  const buyer = Buyer.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      ...override,
    },
    id
  );

  return buyer;
}

@Injectable()
export class BuyerFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaBuyer(data: Partial<BuyerProps> = {}): Promise<Buyer> {
    const buyer = makeBuyer(data);

    await this.prisma.user.create({
      data: PrismaBuyerMapper.toPrisma(buyer),
    });

    return buyer;
  }
}
