import { EditBidUseCase } from "./edit-bid";
import { InMemoryBidsRepository } from "test/repositories/in-memory-bids-repository";
import { makeBid } from "test/factories/make-bid";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error";

let inMemoryBidsRepository: InMemoryBidsRepository;
let sut: EditBidUseCase;

describe("Edit Bid", () => {
  beforeEach(() => {
    inMemoryBidsRepository = new InMemoryBidsRepository();

    sut = new EditBidUseCase(inMemoryBidsRepository);
  });

  it("should be able to edit a bid", async () => {
    const newBid = makeBid(
      {
        bidderId: new UniqueEntityID("bidder-1"),
      },
      new UniqueEntityID("bid-1")
    );

    await inMemoryBidsRepository.create(newBid);

    await sut.execute({
      bidId: newBid.id.toValue(),
      bidderId: "bidder-1",
      amount: 100,
      status: "accepted",
    });

    expect(inMemoryBidsRepository.items[0]).toMatchObject({
      amount: 100,
    });
  });

  it("should not be able to edit a bid from another user", async () => {
    const newBid = makeBid(
      {
        bidderId: new UniqueEntityID("bidder-1"),
      },
      new UniqueEntityID("bid-1")
    );

    await inMemoryBidsRepository.create(newBid);

    const result = await sut.execute({
      bidId: newBid.id.toValue(),
      bidderId: "bidder-2",
      amount: 100,
      status: "accepted",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });

  it("should sync new and removed attachment when editing an bid", async () => {
    const newBid = makeBid(
      {
        bidderId: new UniqueEntityID("bidder-1"),
      },
      new UniqueEntityID("question-1")
    );

    await inMemoryBidsRepository.create(newBid);

    const result = await sut.execute({
      bidId: newBid.id.toValue(),
      bidderId: "bidder-1",
      amount: 100,
      status: "accepted",
    });

    expect(result.isRight()).toBe(true);
  });
});
