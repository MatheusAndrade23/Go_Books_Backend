import { Bid } from "@/domain/auctions/enterprise/entities/bid";
import { BidsRepository } from "../repositories/bids-repository";
import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error";
import { Injectable } from "@nestjs/common";

interface AcceptBidUseCaseRequest {
  bidId: string;
}

type AcceptBidUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    bid: Bid;
  }
>;

@Injectable()
export class AcceptBidUseCase {
  constructor(private bidsRepository: BidsRepository) {}

  async execute({
    bidId,
  }: AcceptBidUseCaseRequest): Promise<AcceptBidUseCaseResponse> {
    const bid = await this.bidsRepository.findById(bidId);

    if (!bid) {
      return left(new ResourceNotFoundError());
    }

    bid.status = "accepted";

    await this.bidsRepository.save(bid);

    return right({
      bid,
    });
  }
}
