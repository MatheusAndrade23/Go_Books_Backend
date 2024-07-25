import { Bid } from "@/domain/auctions/enterprise/entities/bid";
import { BidsRepository } from "../repositories/bids-repository";
import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Injectable } from "@nestjs/common";

interface EditBidUseCaseRequest {
  bidderId: string;
  bidId: string;
  amount: number;
  status: "pending" | "accepted" | "rejected";
}

type EditBidUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    bid: Bid;
  }
>;

@Injectable()
export class EditBidUseCase {
  constructor(private bidsRepository: BidsRepository) {}

  async execute({
    bidderId,
    bidId,
    amount,
    status,
  }: EditBidUseCaseRequest): Promise<EditBidUseCaseResponse> {
    const bid = await this.bidsRepository.findById(bidId);

    if (!bid) {
      return left(new ResourceNotFoundError());
    }

    if (bidderId !== bid.bidderId.toString()) {
      return left(new NotAllowedError());
    }

    bid.amount = amount;
    bid.status = status;

    await this.bidsRepository.save(bid);

    return right({
      bid,
    });
  }
}
