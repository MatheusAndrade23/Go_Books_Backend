import { Auction } from "@/domain/auctions/enterprise/entities/auction";
import { AuctionsRepository } from "../repositories/auctions-repository";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Either, right } from "@/core/either";

interface CreateAuctionUseCaseRequest {
  authorId: string;
  bookName: string;
  description: string;
  bookImageUrl: string;
}

type CreateAuctionUseCaseResponse = Either<
  null,
  {
    auction: Auction;
  }
>;

export class CreateAuctionUseCase {
  constructor(private auctionsRepository: AuctionsRepository) {}

  async execute({
    authorId,
    bookName,
    description,
    bookImageUrl,
  }: CreateAuctionUseCaseRequest): Promise<CreateAuctionUseCaseResponse> {
    const auction = Auction.create({
      authorId: new UniqueEntityID(authorId),
      bookName,
      description,
      bookImageUrl,
    });

    await this.auctionsRepository.create(auction);

    return right({
      auction,
    });
  }
}
