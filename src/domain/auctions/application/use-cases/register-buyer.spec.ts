import { RegisterBuyerUseCase } from "./register-buyer";
import { InMemoryBuyersRepository } from "test/repositories/in-memory-buyers-repository";
import { FakeHasher } from "test/cryptography/fake-hasher";

let inMemoryBuyersRepository: InMemoryBuyersRepository;
let fakeHasher: FakeHasher;

let sut: RegisterBuyerUseCase;

describe("Register Buyer", () => {
  beforeEach(() => {
    inMemoryBuyersRepository = new InMemoryBuyersRepository();
    fakeHasher = new FakeHasher();

    sut = new RegisterBuyerUseCase(inMemoryBuyersRepository, fakeHasher);
  });

  it("should be able to register a new buyer", async () => {
    const result = await sut.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      buyer: inMemoryBuyersRepository.items[0],
    });
  });

  it("should hash buyer password upon registration", async () => {
    const result = await sut.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    const hashedPassword = await fakeHasher.hash("123456");

    expect(result.isRight()).toBe(true);
    expect(inMemoryBuyersRepository.items[0].password).toEqual(hashedPassword);
  });
});
