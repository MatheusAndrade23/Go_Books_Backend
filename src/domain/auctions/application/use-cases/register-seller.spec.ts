import { RegisterSellerUseCase } from "./register-seller";
import { InMemorySellersRepository } from "test/repositories/in-memory-sellers-repository";
import { FakeHasher } from "test/cryptography/fake-hasher";

let inMemorySellersRepository: InMemorySellersRepository;
let fakeHasher: FakeHasher;

let sut: RegisterSellerUseCase;

describe("Register Seller", () => {
  beforeEach(() => {
    inMemorySellersRepository = new InMemorySellersRepository();
    fakeHasher = new FakeHasher();

    sut = new RegisterSellerUseCase(inMemorySellersRepository, fakeHasher);
  });

  it("should be able to register a new seller", async () => {
    const result = await sut.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      seller: inMemorySellersRepository.items[0],
    });
  });

  it("should hash seller password upon registration", async () => {
    const result = await sut.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    const hashedPassword = await fakeHasher.hash("123456");

    expect(result.isRight()).toBe(true);
    expect(inMemorySellersRepository.items[0].password).toEqual(hashedPassword);
  });
});
