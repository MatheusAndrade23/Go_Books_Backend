import { User as PrismaUser, Prisma } from "@prisma/client";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Seller } from "@/domain/auctions/enterprise/entities/seller";

export class PrismaSellerMapper {
  static toDomain(raw: PrismaUser): Seller {
    return Seller.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
      },
      new UniqueEntityID(raw.id)
    );
  }

  static toPrisma(seller: Seller): Prisma.UserUncheckedCreateInput {
    return {
      id: seller.id.toString(),
      name: seller.name,
      email: seller.email,
      password: seller.password,
      role: "seller",
    };
  }
}
