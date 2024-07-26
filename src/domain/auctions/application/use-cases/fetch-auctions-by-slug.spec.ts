import { FetchAuctionsBySlugUseCase } from "./fetch-auctions-by-slug";
import { InMemoryAuctionsRepository } from "test/repositories/in-memory-auctions-repository";
import { Slug } from "@/domain/auctions/enterprise/entities/value-objects/slug";
import { makeAuction } from "test/factories/make-auction";

let inMemoryAuctionsRepository: InMemoryAuctionsRepository;
let sut: FetchAuctionsBySlugUseCase;

describe("Get Auction By Slug", () => {
  beforeEach(() => {
    inMemoryAuctionsRepository = new InMemoryAuctionsRepository();
    sut = new FetchAuctionsBySlugUseCase(inMemoryAuctionsRepository);
  });

  it("should be able to get auctions by slug", async () => {
    const newAuction = makeAuction({ slug: Slug.create("example-auction") });
    const secondAuction = makeAuction({ slug: Slug.create("example-auction") });

    await inMemoryAuctionsRepository.create(newAuction);
    await inMemoryAuctionsRepository.create(secondAuction);

    const result = await sut.execute({
      slug: "example-auction",
    });

    if (result.isRight()) {
      expect(result.value?.auctions).toBeTruthy();
      expect(result.value.auctions).toHaveLength(2);
    }
  });
});
