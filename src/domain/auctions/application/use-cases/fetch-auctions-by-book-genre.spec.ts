import { InMemoryAuctionsRepository } from "test/repositories/in-memory-auctions-repository";
import { makeAuction } from "test/factories/make-auction";
import { FetchAuctionsByBookGenreUseCase } from "./fetch-auctions-by-book-genre";

let inMemoryAuctionsRepository: InMemoryAuctionsRepository;
let sut: FetchAuctionsByBookGenreUseCase;

describe("Fetch Recent Auctions", () => {
  beforeEach(() => {
    inMemoryAuctionsRepository = new InMemoryAuctionsRepository();
    sut = new FetchAuctionsByBookGenreUseCase(inMemoryAuctionsRepository);
  });

  it("should be able to fetch auctions by book genre", async () => {
    await inMemoryAuctionsRepository.create(
      makeAuction({ bookGenre: "fantasy" })
    );
    await inMemoryAuctionsRepository.create(
      makeAuction({ bookGenre: "fantasy" })
    );
    await inMemoryAuctionsRepository.create(
      makeAuction({ bookGenre: "fantasy" })
    );

    const result = await sut.execute({
      bookGenre: "fantasy",
    });

    expect(result.value?.auctions).toEqual([
      expect.objectContaining({ bookGenre: "fantasy" }),
      expect.objectContaining({ bookGenre: "fantasy" }),
      expect.objectContaining({ bookGenre: "fantasy" }),
    ]);
  });
});
