import { InMemoryAuctionsRepository } from "test/repositories/in-memory-auctions-repository";
import { makeAuction } from "test/factories/make-auction";
import { FetchRecentAuctionsUseCase } from "./fetch-recent-auctions";

let inMemoryAuctionsRepository: InMemoryAuctionsRepository;
let sut: FetchRecentAuctionsUseCase;

describe("Fetch Recent Auctions", () => {
  beforeEach(() => {
    inMemoryAuctionsRepository = new InMemoryAuctionsRepository();
    sut = new FetchRecentAuctionsUseCase(inMemoryAuctionsRepository);
  });

  it("should be able to fetch recent auctions", async () => {
    await inMemoryAuctionsRepository.create(
      makeAuction({ createdAt: new Date(2022, 0, 20) })
    );
    await inMemoryAuctionsRepository.create(
      makeAuction({ createdAt: new Date(2022, 0, 18) })
    );
    await inMemoryAuctionsRepository.create(
      makeAuction({ createdAt: new Date(2022, 0, 23) })
    );

    const result = await sut.execute({
      page: 1,
    });

    expect(result.value?.auctions).toEqual([
      expect.objectContaining({ createdAt: new Date(2022, 0, 23) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 18) }),
    ]);
  });

  it("should be able to fetch paginated recent auctions", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAuctionsRepository.create(makeAuction());
    }

    const result = await sut.execute({
      page: 2,
    });

    expect(result.value?.auctions).toHaveLength(2);
  });
});
