import { AggregateRoot } from "@/core/entities/aggregate-root";
import { Slug } from "./value-objects/slug";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";
import dayjs from "dayjs";
import { AuctionBidAcceptedEvent } from "../events/auction-bid-accepted-event";

export interface AuctionProps {
  authorId: UniqueEntityID;
  bookName: string;
  bookImageUrl: string;
  description: string;
  slug: Slug;
  acceptedBidId?: UniqueEntityID | null;
  createdAt?: Date;
}

export class Auction extends AggregateRoot<AuctionProps> {
  get authorId() {
    return this.props.authorId;
  }

  get bookName() {
    return this.props.bookName;
  }

  get bookImageUrl() {
    return this.props.bookImageUrl;
  }

  get description() {
    return this.props.description;
  }

  get slug() {
    return this.props.slug;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get isNew(): boolean {
    return dayjs().diff(this.createdAt, "days") <= 3;
  }

  get excerpt() {
    return this.description.substring(0, 120).trimEnd().concat("...");
  }

  get acceptedBidId() {
    return this.props.acceptedBidId;
  }

  set acceptedBidId(acceptedBidId: UniqueEntityID | undefined | null) {
    if (acceptedBidId === undefined || acceptedBidId === null) {
      return;
    }

    if (
      this.props.acceptedBidId === undefined ||
      this.props.acceptedBidId === null ||
      !acceptedBidId.equals(this.props.acceptedBidId)
    ) {
      this.addDomainEvent(new AuctionBidAcceptedEvent(this, acceptedBidId));
    }

    this.props.acceptedBidId = acceptedBidId;
  }

  set bookName(bookName: string) {
    this.props.bookName = bookName;
    this.props.slug = Slug.createFromText(bookName);
  }

  set description(description: string) {
    this.props.description = description;
  }

  set bookImageUrl(bookImageUrl: string) {
    this.props.description = bookImageUrl;
  }

  static create(
    props: Optional<AuctionProps, "createdAt" | "slug">,
    id?: UniqueEntityID
  ) {
    const auction = new Auction(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.bookName),
        createdAt: props.createdAt ?? new Date(),
      },
      id
    );

    return auction;
  }
}
