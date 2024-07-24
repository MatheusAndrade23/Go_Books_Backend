import { Either, left, right } from "@/core/either";
import { Injectable } from "@nestjs/common";
import { Buyer } from "../../enterprise/entities/buyer";
import { BuyersRepository } from "../repositories/buyers-repository";
import { HashGenerator } from "../cryptography/hash-generator";
import { BuyerAlreadyExistsError } from "./errors/buyer-already-exists-error";

interface RegisterBuyerUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

type RegisterBuyerUseCaseResponse = Either<
  BuyerAlreadyExistsError,
  {
    buyer: Buyer;
  }
>;

@Injectable()
export class RegisterBuyerUseCase {
  constructor(
    private buyersRepository: BuyersRepository,
    private hashGenerator: HashGenerator
  ) {}

  async execute({
    name,
    email,
    password,
  }: RegisterBuyerUseCaseRequest): Promise<RegisterBuyerUseCaseResponse> {
    const buyerWithSameEmail = await this.buyersRepository.findByEmail(email);

    if (buyerWithSameEmail) {
      return left(new BuyerAlreadyExistsError(email));
    }

    const hashedPassword = await this.hashGenerator.hash(password);

    const buyer = Buyer.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.buyersRepository.create(buyer);

    return right({
      buyer,
    });
  }
}
