import { Auction } from "@/domain/auctions/enterprise/entities/auction";
import { AuctionsRepository } from "../repositories/auctions-repository";
import { Either, right } from "@/core/either";
import { Injectable } from "@nestjs/common";

interface FetchAuctionsByBookGenreUseCaseRequest {
  bookGenre: string;
}

type FetchAuctionsByBookGenreUseCaseResponse = Either<
  null,
  {
    auctions: Auction[];
  }
>;

@Injectable()
export class FetchAuctionsByBookGenreUseCase {
  constructor(private auctionsRepository: AuctionsRepository) {}

  async execute({
    bookGenre,
  }: FetchAuctionsByBookGenreUseCaseRequest): Promise<FetchAuctionsByBookGenreUseCaseResponse> {
    const auctions = await this.auctionsRepository.findManyByBookGenre(
      bookGenre
    );

    return right({
      auctions,
    });
  }
}
