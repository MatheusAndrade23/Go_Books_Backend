import { DeleteAuctionsUseCase } from "./delete-auction";
import { InMemoryAuctionsRepository } from "test/repositories/in-memory-auctions-repository";
import { makeAuction } from "test/factories/make-auction";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { NotAllowedError } from "@/domain/auctions/application/use-cases/errors/not-allowed-error";

let inMemoryAuctionsRepository: InMemoryAuctionsRepository;
let sut: DeleteAuctionsUseCase;

describe("Delete Auctions", () => {
  beforeEach(() => {
    inMemoryAuctionsRepository = new InMemoryAuctionsRepository();
    sut = new DeleteAuctionsUseCase(inMemoryAuctionsRepository);
  });

  it("should be able to delete a auction", async () => {
    const newAuction = makeAuction(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("auction-1")
    );

    await inMemoryAuctionsRepository.create(newAuction);

    await sut.execute({
      auctionId: "auction-1",
      authorId: "author-1",
    });

    expect(inMemoryAuctionsRepository.items).toHaveLength(0);
  });

  it("should not be able to delete a auction from another user", async () => {
    const newAuction = makeAuction(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("auction-1")
    );

    await inMemoryAuctionsRepository.create(newAuction);

    const result = await sut.execute({
      auctionId: "auction-1",
      authorId: "author-2",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
