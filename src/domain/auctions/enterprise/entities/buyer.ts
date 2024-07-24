import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

interface BuyerProps {
  name: string;
}

export class Buyer extends Entity<BuyerProps> {
  static create(props: BuyerProps, id?: UniqueEntityID) {
    const buyer = new Buyer(props, id);

    return buyer;
  }
}
