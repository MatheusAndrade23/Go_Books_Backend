import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from "@nestjs/common";
import { z } from "zod";
import { Public } from "@/infra/auth/public";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import { RegisterBuyerUseCase } from "@/domain/auctions/application/use-cases/register-buyer";
import { BuyerAlreadyExistsError } from "@/domain/auctions/application/use-cases/errors/buyer-already-exists-error";
import { SellerAlreadyExistsError } from "@/domain/auctions/application/use-cases/errors/seller-already-exists-error";
import { RegisterSellerUseCase } from "@/domain/auctions/application/use-cases/register-seller";

import { UserPresenter } from "../presenters/user-presenter";

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  role: z.enum(["buyer", "seller"]).optional().default("buyer"),
});

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>;

@Controller("/accounts")
@Public()
export class CreateAccountController {
  constructor(
    private registerBuyer: RegisterBuyerUseCase,
    private registerSeller: RegisterSellerUseCase
  ) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async handle(@Body() body: CreateAccountBodySchema) {
    const { name, email, password, role } = body;

    let result;
    let id: string;
    let props;

    if (role === "seller") {
      result = await this.registerSeller.execute({
        name,
        email,
        password,
      });

      id = result.value.seller._id.value;
      props = {
        ...result.value.seller.props,
        role: "seller",
      };
    } else {
      result = await this.registerBuyer.execute({
        name,
        email,
        password,
      });

      id = result.value.buyer._id.value;
      props = {
        ...result.value.buyer.props,
        role: "buyer",
      };
    }

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case BuyerAlreadyExistsError:
          throw new ConflictException(error.message);
        case SellerAlreadyExistsError:
          throw new ConflictException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }

    const user = {
      ...props,
      id,
    };

    return UserPresenter.toHTTP(user);
  }
}
