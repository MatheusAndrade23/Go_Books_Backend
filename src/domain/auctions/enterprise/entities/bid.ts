import { AggregateRoot } from "@/core/entities/aggregate-root";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";

export interface BidProps {
  bidderId: UniqueEntityID;
  auctionId: UniqueEntityID;
  amount: number;
  createdAt?: Date;
  status: "pending" | "accepted" | "rejected";
}

export class Bid extends AggregateRoot<BidProps> {
  get bidderId() {
    return this.props.bidderId;
  }

  get auctionId() {
    return this.props.auctionId;
  }

  get amount() {
    return this.props.amount;
  }

  get status() {
    return this.props.status;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  set status(status: "pending" | "accepted" | "rejected") {
    this.props.status = status;
  }

  set amount(amount: number) {
    this.props.amount = amount;
  }

  static create(props: Optional<BidProps, "createdAt">, id?: UniqueEntityID) {
    const bid = new Bid(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    );

    return bid;
  }
}
