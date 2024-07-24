import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { DomainEvent } from "@/core/events/domain-event";
import { Auction } from "../entities/auction";

export class AuctionBidAcceptedEvent implements DomainEvent {
  public ocurredAt: Date;
  public auction: Auction;
  public acceptedBidId: UniqueEntityID;

  constructor(auction: Auction, acceptedBidId: UniqueEntityID) {
    this.auction = auction;
    this.acceptedBidId = acceptedBidId;
    this.ocurredAt = new Date();
  }

  getAggregateId(): UniqueEntityID {
    return this.auction.id;
  }
}
