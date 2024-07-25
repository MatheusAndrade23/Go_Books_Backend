import { Either, left, right } from "@/core/either";
import { BidsRepository } from "../repositories/bids-repository";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error";
import { Injectable } from "@nestjs/common";

interface DeleteBidUseCaseRequest {
  bidderId: string;
  bidId: string;
}

type DeleteBidUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>;

@Injectable()
export class DeleteBidUseCase {
  constructor(private bidsRepository: BidsRepository) {}

  async execute({
    bidId,
    bidderId,
  }: DeleteBidUseCaseRequest): Promise<DeleteBidUseCaseResponse> {
    const bid = await this.bidsRepository.findById(bidId);

    if (!bid) {
      return left(new ResourceNotFoundError());
    }

    if (bidderId !== bid.bidderId.toString()) {
      return left(new NotAllowedError());
    }

    await this.bidsRepository.delete(bid);

    return right(null);
  }
}
