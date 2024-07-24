import { InMemoryBuyersRepository } from "test/repositories/in-memory-buyers-repository";
import { FakeHasher } from "test/cryptography/fake-hasher";
import { FakeEncrypter } from "test/cryptography/fake-encrypter";
import { AuthenticateBuyerUseCase } from "./authenticate-buyer";
import { makeBuyer } from "test/factories/make-buyer";

let inMemoryBuyersRepository: InMemoryBuyersRepository;
let fakeHasher: FakeHasher;
let encrypter: FakeEncrypter;

let sut: AuthenticateBuyerUseCase;

describe("Authenticate Buyer", () => {
  beforeEach(() => {
    inMemoryBuyersRepository = new InMemoryBuyersRepository();
    fakeHasher = new FakeHasher();
    encrypter = new FakeEncrypter();

    sut = new AuthenticateBuyerUseCase(
      inMemoryBuyersRepository,
      fakeHasher,
      encrypter
    );
  });

  it("should be able to authenticate a buyer", async () => {
    const buyer = makeBuyer({
      email: "johndoe@example.com",
      password: await fakeHasher.hash("123456"),
    });

    inMemoryBuyersRepository.items.push(buyer);

    const result = await sut.execute({
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    });
  });
});
