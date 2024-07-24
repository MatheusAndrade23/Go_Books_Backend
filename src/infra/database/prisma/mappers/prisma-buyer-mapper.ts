import { User as PrismaUser, Prisma } from "@prisma/client";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Buyer } from "@/domain/auctions/enterprise/entities/buyer";

export class PrismaBuyerMapper {
  static toDomain(raw: PrismaUser): Buyer {
    return Buyer.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
      },
      new UniqueEntityID(raw.id)
    );
  }

  static toPrisma(buyer: Buyer): Prisma.UserUncheckedCreateInput {
    return {
      id: buyer.id.toString(),
      name: buyer.name,
      email: buyer.email,
      password: buyer.password,
    };
  }
}
