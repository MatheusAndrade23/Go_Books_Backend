import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

interface SellerProps {
  name: string;
}

export class Seller extends Entity<SellerProps> {
  static create(props: SellerProps, id?: UniqueEntityID) {
    const seller = new Seller(props, id);

    return seller;
  }
}
