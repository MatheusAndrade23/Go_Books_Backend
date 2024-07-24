import { Auction } from "@/domain/auctions/enterprise/entities/auction";
import { AuctionsRepository } from "../repositories/auctions-repository";
import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/domain/auctions/application/use-cases/errors/resource-not-found-error";

interface GetAuctionBySlugUseCaseRequest {
  slug: string;
}

type GetAuctionBySlugUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    auction: Auction;
  }
>;
export class GetAuctionBySlugUseCase {
  constructor(private auctionsRepository: AuctionsRepository) {}

  async execute({
    slug,
  }: GetAuctionBySlugUseCaseRequest): Promise<GetAuctionBySlugUseCaseResponse> {
    const auction = await this.auctionsRepository.findBySlug(slug);

    if (!auction) {
      return left(new ResourceNotFoundError());
    }

    return right({
      auction,
    });
  }
}
