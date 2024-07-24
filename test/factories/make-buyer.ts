import { faker } from "@faker-js/faker";

import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Buyer, BuyerProps } from "@/domain/auctions/enterprise/entities/buyer";

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
