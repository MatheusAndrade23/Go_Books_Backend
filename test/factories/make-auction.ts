import { faker } from "@faker-js/faker";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import {
  Auction,
  AuctionProps,
} from "@/domain/auctions/enterprise/entities/auction";

export function makeAuction(
  override: Partial<AuctionProps> = {},
  id?: UniqueEntityID
) {
  const auction = Auction.create(
    {
      authorId: new UniqueEntityID(),
      bookName: faker.lorem.sentence(),
      description: faker.lorem.text(),
      ...override,
    },
    id
  );

  return auction;
}
