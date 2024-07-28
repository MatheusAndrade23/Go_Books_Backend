import { Bid } from "@/domain/auctions/enterprise/entities/bid";
import { BidsRepository } from "../repositories/bids-repository";
import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error";
import { Injectable } from "@nestjs/common";

interface RejectBidUseCaseRequest {
  bidId: string;
}

type RejectBidUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    bid: Bid;
  }
>;

@Injectable()
export class RejectBidUseCase {
  constructor(private bidsRepository: BidsRepository) {}

  async execute({
    bidId,
  }: RejectBidUseCaseRequest): Promise<RejectBidUseCaseResponse> {
    const bid = await this.bidsRepository.findById(bidId);

    if (!bid) {
      return left(new ResourceNotFoundError());
    }

    bid.status = "rejected";

    await this.bidsRepository.save(bid);

    return right({
      bid,
    });
  }
}
