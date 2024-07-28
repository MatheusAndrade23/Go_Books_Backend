import { Auction } from "@/domain/auctions/enterprise/entities/auction";
import { AuctionsRepository } from "../repositories/auctions-repository";
import { Either, left, right } from "@/core/either";
import { NotAllowedError } from "@/domain/auctions/application/use-cases/errors/not-allowed-error";
import { ResourceNotFoundError } from "@/domain/auctions/application/use-cases/errors/resource-not-found-error";
import { Injectable } from "@nestjs/common";

interface GetAuctionAuthorByIdUseCaseRequest {
  authorId: string;
}

type GetAuctionByAuthorIdUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    auctions: Auction[];
  }
>;

@Injectable()
export class GetAuctionsByAuthorIdUseCase {
  constructor(private auctionsRepository: AuctionsRepository) {}

  async execute({
    authorId,
  }: GetAuctionAuthorByIdUseCaseRequest): Promise<GetAuctionByAuthorIdUseCaseResponse> {
    const auctions = await this.auctionsRepository.findManyByAuthorId(authorId);

    if (!auctions) {
      return left(new ResourceNotFoundError());
    }

    return right({
      auctions,
    });
  }
}
