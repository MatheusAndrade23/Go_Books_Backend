import { Auction } from "@/domain/auctions/enterprise/entities/auction";
import { AuctionsRepository } from "../repositories/auctions-repository";
import { Either, left, right } from "@/core/either";
import { Injectable } from "@nestjs/common";

interface FetchAuctionsBySlugUseCaseRequest {
  slug: string;
}

type FetchAuctionsBySlugUseCaseResponse = Either<
  null,
  {
    auctions: Auction[];
  }
>;

@Injectable()
export class FetchAuctionsBySlugUseCase {
  constructor(private auctionsRepository: AuctionsRepository) {}

  async execute({
    slug,
  }: FetchAuctionsBySlugUseCaseRequest): Promise<FetchAuctionsBySlugUseCaseResponse> {
    const auctions = await this.auctionsRepository.findManyBySlug(slug);

    return right({
      auctions,
    });
  }
}
