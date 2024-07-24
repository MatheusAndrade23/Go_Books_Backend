import { Either, left, right } from "@/core/either";
import { Injectable } from "@nestjs/common";
import { BuyersRepository } from "../repositories/buyers-repository";
import { HashComparer } from "../cryptography/hash-comparer";
import { Encrypter } from "../cryptography/encrypter";
import { WrongCredentialsError } from "./errors/wrong-credentials-error";

interface AuthenticateBuyerUseCaseRequest {
  email: string;
  password: string;
}

type AuthenticateBuyerUseCaseResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string;
  }
>;

@Injectable()
export class AuthenticateBuyerUseCase {
  constructor(
    private buyersRepository: BuyersRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateBuyerUseCaseRequest): Promise<AuthenticateBuyerUseCaseResponse> {
    const buyer = await this.buyersRepository.findByEmail(email);

    if (!buyer) {
      return left(new WrongCredentialsError());
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      buyer.password
    );

    if (!isPasswordValid) {
      return left(new WrongCredentialsError());
    }

    const accessToken = await this.encrypter.encrypt({
      sub: buyer.id.toString(),
    });

    return right({
      accessToken,
    });
  }
}
