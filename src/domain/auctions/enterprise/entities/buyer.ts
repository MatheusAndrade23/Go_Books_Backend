import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

export interface BuyerProps {
  name: string;
  email: string;
  password: string;
}

export class Buyer extends Entity<BuyerProps> {
  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  static create(props: BuyerProps, id?: UniqueEntityID) {
    const buyer = new Buyer(props, id);

    return buyer;
  }
}
