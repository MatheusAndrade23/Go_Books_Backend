import { DeleteBidUseCase } from "./delete-bid";
import { InMemoryBidsRepository } from "test/repositories/in-memory-bids-repository";
import { makeBid } from "test/factories/make-bid";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error";

let inMemoryBidsRepository: InMemoryBidsRepository;
let sut: DeleteBidUseCase;

describe("Delete Bid", () => {
  beforeEach(() => {
    inMemoryBidsRepository = new InMemoryBidsRepository();

    sut = new DeleteBidUseCase(inMemoryBidsRepository);
  });

  it("should be able to delete a bid", async () => {
    const newBid = makeBid(
      {
        bidderId: new UniqueEntityID("bidder-1"),
      },
      new UniqueEntityID("bid-1")
    );

    await inMemoryBidsRepository.create(newBid);

    await sut.execute({
      bidId: "bid-1",
      bidderId: "bidder-1",
    });

    expect(inMemoryBidsRepository.items).toHaveLength(0);
  });

  it("should not be able to delete a bid from another user", async () => {
    const newBid = makeBid(
      {
        bidderId: new UniqueEntityID("bidder-1"),
      },
      new UniqueEntityID("bid-1")
    );

    await inMemoryBidsRepository.create(newBid);

    const result = await sut.execute({
      bidId: "bid-1",
      bidderId: "bidder-2",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
