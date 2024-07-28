import { Auction } from "@/domain/auctions/enterprise/entities/auction";
import { AuctionsRepository } from "../repositories/auctions-repository";
import { Either, left, right } from "@/core/either";
import { NotAllowedError } from "@/domain/auctions/application/use-cases/errors/not-allowed-error";
import { ResourceNotFoundError } from "@/domain/auctions/application/use-cases/errors/resource-not-found-error";
import { Injectable } from "@nestjs/common";

interface GetAuctionByIdUseCaseRequest {
  id: string;
}

type GetAuctionByIdUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    auction: Auction;
  }
>;

@Injectable()
export class GetAuctionByIdUseCase {
  constructor(private auctionsRepository: AuctionsRepository) {}

  async execute({
    id,
  }: GetAuctionByIdUseCaseRequest): Promise<GetAuctionByIdUseCaseResponse> {
    const auction = await this.auctionsRepository.findById(id);

    if (!auction) {
      return left(new ResourceNotFoundError());
    }

    return right({
      auction,
    });
  }
}
