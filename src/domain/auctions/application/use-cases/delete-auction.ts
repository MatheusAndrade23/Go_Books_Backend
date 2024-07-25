import { Either, left, right } from "@/core/either";
import { AuctionsRepository } from "../repositories/auctions-repository";
import { ResourceNotFoundError } from "@/domain/auctions/application/use-cases/errors/resource-not-found-error";
import { NotAllowedError } from "@/domain/auctions/application/use-cases/errors/not-allowed-error";
import { Injectable } from "@nestjs/common";

interface DeleteAuctionUseCaseRequest {
  authorId: string;
  auctionId: string;
}

type DeleteAuctionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>;

@Injectable()
export class DeleteAuctionUseCase {
  constructor(private auctionsRepository: AuctionsRepository) {}

  async execute({
    auctionId,
    authorId,
  }: DeleteAuctionUseCaseRequest): Promise<DeleteAuctionUseCaseResponse> {
    const auction = await this.auctionsRepository.findById(auctionId);

    if (!auction) {
      return left(new ResourceNotFoundError());
    }

    if (authorId !== auction.authorId.toString()) {
      return left(new NotAllowedError());
    }

    await this.auctionsRepository.delete(auction);

    return right({});
  }
}
