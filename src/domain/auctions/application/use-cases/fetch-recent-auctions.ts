import { Auction } from "@/domain/auctions/enterprise/entities/auction";
import { AuctionsRepository } from "../repositories/auctions-repository";
import { Either, right } from "@/core/either";
import { Injectable } from "@nestjs/common";

interface FetchRecentAuctionsUseCaseRequest {
  page: number;
}

type FetchRecentAuctionsUseCaseResponse = Either<
  null,
  {
    auctions: Auction[];
  }
>;

@Injectable()
export class FetchRecentAuctionsUseCase {
  constructor(private auctionsRepository: AuctionsRepository) {}

  async execute({
    page,
  }: FetchRecentAuctionsUseCaseRequest): Promise<FetchRecentAuctionsUseCaseResponse> {
    const auctions = await this.auctionsRepository.findManyRecent({ page });

    return right({
      auctions,
    });
  }
}
