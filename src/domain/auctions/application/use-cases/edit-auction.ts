import { Auction } from "@/domain/auctions/enterprise/entities/auction";
import { AuctionsRepository } from "../repositories/auctions-repository";
import { Either, left, right } from "@/core/either";
import { NotAllowedError } from "@/domain/auctions/application/use-cases/errors/not-allowed-error";
import { ResourceNotFoundError } from "@/domain/auctions/application/use-cases/errors/resource-not-found-error";

interface EditAuctionUseCaseRequest {
  authorId: string;
  auctionId: string;
  bookName: string;
  description: string;
}

type EditAuctionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    auction: Auction;
  }
>;

export class EditAuctionUseCase {
  constructor(private auctionsRepository: AuctionsRepository) {}

  async execute({
    authorId,
    auctionId,
    bookName,
    description,
  }: EditAuctionUseCaseRequest): Promise<EditAuctionUseCaseResponse> {
    const auction = await this.auctionsRepository.findById(auctionId);

    if (!auction) {
      return left(new ResourceNotFoundError());
    }

    if (authorId !== auction.authorId.toString()) {
      return left(new NotAllowedError());
    }

    auction.bookName = bookName;
    auction.description = description;

    await this.auctionsRepository.save(auction);

    return right({
      auction,
    });
  }
}
