import { EditAuctionUseCase } from "./edit-auction";
import { InMemoryAuctionsRepository } from "test/repositories/in-memory-auctions-repository";
import { makeAuction } from "test/factories/make-auction";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { NotAllowedError } from "@/domain/auctions/application/use-cases/errors/not-allowed-error";

let inMemoryAuctionsRepository: InMemoryAuctionsRepository;
let sut: EditAuctionUseCase;

describe("Edit Auction", () => {
  beforeEach(() => {
    inMemoryAuctionsRepository = new InMemoryAuctionsRepository();
    sut = new EditAuctionUseCase(inMemoryAuctionsRepository);
  });

  it("should be able to edit a auction", async () => {
    const newAuction = makeAuction(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("auction-1")
    );

    await inMemoryAuctionsRepository.create(newAuction);

    await sut.execute({
      auctionId: newAuction.id.toValue(),
      authorId: "author-1",
      bookName: "Livro teste",
      description: "Conteúdo teste",
    });

    expect(inMemoryAuctionsRepository.items[0]).toMatchObject({
      bookName: "Livro teste",
      description: "Conteúdo teste",
    });
  });

  it("should not be able to edit a auction from another user", async () => {
    const newAuction = makeAuction(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("auction-1")
    );

    await inMemoryAuctionsRepository.create(newAuction);

    const result = await sut.execute({
      auctionId: newAuction.id.toValue(),
      authorId: "author-2",
      bookName: "Livro teste",
      description: "Conteúdo teste",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
