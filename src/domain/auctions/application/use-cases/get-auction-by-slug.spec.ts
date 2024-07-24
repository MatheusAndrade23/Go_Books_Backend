import { GetAuctionBySlugUseCase } from "./get-auction-by-slug";
import { InMemoryAuctionsRepository } from "test/repositories/in-memory-auctions-repository";
import { Slug } from "@/domain/auctions/enterprise/entities/value-objects/slug";
import { makeAuction } from "test/factories/make-auction";

let inMemoryAuctionsRepository: InMemoryAuctionsRepository;
let sut: GetAuctionBySlugUseCase;

describe("Get Auction By Slug", () => {
  beforeEach(() => {
    inMemoryAuctionsRepository = new InMemoryAuctionsRepository();
    sut = new GetAuctionBySlugUseCase(inMemoryAuctionsRepository);
  });

  it("should be able to get a auction by slug", async () => {
    const newAuction = makeAuction({ slug: Slug.create("example-auction") });

    await inMemoryAuctionsRepository.create(newAuction);

    const result = await sut.execute({
      slug: "example-auction",
    });

    if (result.isRight()) {
      expect(result.value?.auction.id).toBeTruthy();
      expect(result.value.auction.bookName).toEqual(newAuction.bookName);
    }
  });
});
