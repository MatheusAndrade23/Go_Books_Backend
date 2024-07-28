import { Either, left, right } from "@/core/either";
import { Injectable } from "@nestjs/common";
import { SellersRepository } from "../repositories/sellers-repository";
import { HashComparer } from "../cryptography/hash-comparer";
import { Encrypter } from "../cryptography/encrypter";
import { WrongCredentialsError } from "./errors/wrong-credentials-error";

interface AuthenticateSellerUseCaseRequest {
  email: string;
  password: string;
}

type AuthenticateSellerUseCaseResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string;
  }
>;

@Injectable()
export class AuthenticateSellerUseCase {
  constructor(
    private sellersRepository: SellersRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateSellerUseCaseRequest): Promise<AuthenticateSellerUseCaseResponse> {
    const seller = await this.sellersRepository.findByEmail(email);

    if (!seller) {
      return left(new WrongCredentialsError());
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      seller.password
    );

    if (!isPasswordValid) {
      return left(new WrongCredentialsError());
    }

    const accessToken = await this.encrypter.encrypt({
      sub: seller.id.toString(),
    });

    return right({
      accessToken,
      ...seller,
    });
  }
}
