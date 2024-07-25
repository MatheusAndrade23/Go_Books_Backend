import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Bid } from "../../enterprise/entities/bid";
import { BidsRepository } from "../repositories/bids-repository";
import { Either, right } from "@/core/either";
import { Injectable } from "@nestjs/common";

interface BidAuctionUseCaseRequest {
  bidderId: string;
  auctionId: string;
  amount: number;
  status: "pending" | "accepted" | "rejected";
}

type BidAuctionUseCaseResponse = Either<
  null,
  {
    bid: Bid;
  }
>;

@Injectable()
export class BidAuctionUseCase {
  constructor(private bidsRepository: BidsRepository) {}

  async execute({
    bidderId,
    auctionId,
    amount,
    status,
  }: BidAuctionUseCaseRequest): Promise<BidAuctionUseCaseResponse> {
    const bid = Bid.create({
      bidderId: new UniqueEntityID(bidderId),
      auctionId: new UniqueEntityID(auctionId),
      amount,
      status,
    });

    await this.bidsRepository.create(bid);

    return right({
      bid,
    });
  }
}
