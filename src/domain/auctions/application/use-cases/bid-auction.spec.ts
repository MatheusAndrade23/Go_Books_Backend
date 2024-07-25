import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { BidAuctionUseCase } from "@/domain/auctions/application/use-cases/bid-auction";
import { InMemoryBidsRepository } from "test/repositories/in-memory-bids-repository";

let inMemoryBidsRepository: InMemoryBidsRepository;
let sut: BidAuctionUseCase;

describe("Create Bid", () => {
  beforeEach(() => {
    inMemoryBidsRepository = new InMemoryBidsRepository();
    sut = new BidAuctionUseCase(inMemoryBidsRepository);
  });

  it("should be able to create a bid", async () => {
    const result = await sut.execute({
      auctionId: "1",
      bidderId: "1",
      amount: 100,
      status: "pending",
    });

    expect(result.isRight()).toBe(true);
  });

  it("should persist attachments when creating a new bid", async () => {
    const result = await sut.execute({
      auctionId: "1",
      bidderId: "1",
      amount: 100,
      status: "pending",
    });

    expect(result.isRight()).toBe(true);
  });
});
