import { AggregateRoot } from "@/core/entities/aggregate-root";
import { Slug } from "./value-objects/slug";
import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";
import dayjs from "dayjs";

export interface AuctionProps {
  authorId: UniqueEntityID;
  bookName: string;
  description: string;
  slug: Slug;
  createdAt?: Date;
}

export class Auction extends AggregateRoot<AuctionProps> {
  get authorId() {
    return this.props.authorId;
  }

  get bookName() {
    return this.props.bookName;
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

  set bookName(bookName: string) {
    this.props.bookName = bookName;
    this.props.slug = Slug.createFromText(bookName);
  }

  set description(description: string) {
    this.props.description = description;
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
