import { InMemorySellersRepository } from "test/repositories/in-memory-sellers-repository";
import { FakeHasher } from "test/cryptography/fake-hasher";
import { FakeEncrypter } from "test/cryptography/fake-encrypter";
import { AuthenticateSellerUseCase } from "./authenticate-seller";
import { makeSeller } from "test/factories/make-seller";

let inMemorySellersRepository: InMemorySellersRepository;
let fakeHasher: FakeHasher;
let encrypter: FakeEncrypter;

let sut: AuthenticateSellerUseCase;

describe("Authenticate Seller", () => {
  beforeEach(() => {
    inMemorySellersRepository = new InMemorySellersRepository();
    fakeHasher = new FakeHasher();
    encrypter = new FakeEncrypter();

    sut = new AuthenticateSellerUseCase(
      inMemorySellersRepository,
      fakeHasher,
      encrypter
    );
  });

  it("should be able to authenticate a seller", async () => {
    const seller = makeSeller({
      email: "johndoe@example.com",
      password: await fakeHasher.hash("123456"),
    });

    inMemorySellersRepository.items.push(seller);

    const result = await sut.execute({
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual(
      expect.objectContaining({ accessToken: expect.any(String) })
    );
  });
});
