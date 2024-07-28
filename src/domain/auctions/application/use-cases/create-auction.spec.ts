import { CreateAuctionUseCase } from "./create-auction";
import { InMemoryAuctionsRepository } from "test/repositories/in-memory-auctions-repository";

let inMemoryAuctionsRepository: InMemoryAuctionsRepository;
let sut: CreateAuctionUseCase;

describe("Create Auction", () => {
  beforeEach(() => {
    inMemoryAuctionsRepository = new InMemoryAuctionsRepository();
    sut = new CreateAuctionUseCase(inMemoryAuctionsRepository);
  });

  it("should be able to create a auction", async () => {
    const result = await sut.execute({
      authorId: "1",
      bookName: "Nova Livro",
      description: "Descrição da Livro",
      bookImageUrl: "http://image.com",
      bookGenre: "Ficção",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryAuctionsRepository.items[0]).toEqual(result.value?.auction);
  });
});
