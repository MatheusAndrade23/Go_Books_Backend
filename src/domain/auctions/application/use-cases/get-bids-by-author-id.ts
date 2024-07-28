import { Bid } from "@/domain/auctions/enterprise/entities/bid";
import { BidsRepository } from "../repositories/bids-repository";
import { Either, left, right } from "@/core/either";
import { NotAllowedError } from "@/domain/auctions/application/use-cases/errors/not-allowed-error";
import { ResourceNotFoundError } from "@/domain/auctions/application/use-cases/errors/resource-not-found-error";
import { Injectable } from "@nestjs/common";

interface GetBidAuthorByIdUseCaseRequest {
  authorId: string;
}

type GetBidByAuthorIdUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    bids: Bid[];
  }
>;

@Injectable()
export class GetBidsByAuthorIdUseCase {
  constructor(private bidsRepository: BidsRepository) {}

  async execute({
    authorId,
  }: GetBidAuthorByIdUseCaseRequest): Promise<GetBidByAuthorIdUseCaseResponse> {
    const bids = await this.bidsRepository.findManyByAuthorId(authorId);

    if (!bids) {
      return left(new ResourceNotFoundError());
    }

    return right({
      bids,
    });
  }
}
