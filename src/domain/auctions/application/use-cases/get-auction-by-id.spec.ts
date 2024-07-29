import { GetAuctionByIdUseCase } from "./get-auction-by-id";
import { InMemoryAuctionsRepository } from "test/repositories/in-memory-auctions-repository";
import { InMemoryAuctionAttachmentsRepository } from "test/repositories/in-memory-auctions-attachments-repository";

import { makeAuction } from "test/factories/make-auction";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

let inMemoryAuctionAttachmentsRepository: InMemoryAuctionAttachmentsRepository;
let inMemoryAuctionsRepository: InMemoryAuctionsRepository;
let sut: GetAuctionByIdUseCase;

describe("Get Auction By Id", () => {
  beforeEach(() => {
    inMemoryAuctionsRepository = new InMemoryAuctionsRepository(
      inMemoryAuctionAttachmentsRepository
    );
    sut = new GetAuctionByIdUseCase(inMemoryAuctionsRepository);
  });

  it("should be able to Get a auction by id", async () => {
    const newAuction = makeAuction(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("auction-1")
    );

    await inMemoryAuctionsRepository.create(newAuction);

    const response = await sut.execute({
      id: newAuction.id.toString(),
    });

    const auction = response.value;

    expect(auction).toBeTruthy();
  });
});
