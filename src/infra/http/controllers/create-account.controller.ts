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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";
import { Buyer } from "@/domain/auctions/enterprise/entities/buyer";

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  role: z.enum(["buyer", "seller"]).optional().default("buyer"),
});

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>;

const userResponseSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    email: { type: "string", format: "email" },
    role: { type: "string", enum: ["buyer", "seller"] },
  },
};

@ApiTags("Authentication")
@Controller("/accounts")
@Public()
export class CreateAccountController {
  constructor(
    private registerBuyer: RegisterBuyerUseCase,
    private registerSeller: RegisterSellerUseCase
  ) {}

  @Post()
  @ApiOperation({ summary: "Create a new user." })
  @ApiBody({
    description: "The body for creating a new user",
    required: true,
    schema: {
      type: "object",
      properties: {
        name: { type: "string" },
        email: { type: "string", format: "email" },
        password: { type: "string" },
        role: { type: "string", enum: ["buyer", "seller"] },
      },
      required: ["name", "email", "password"],
    },
  })
  @ApiResponse({
    status: 201,
    description: "User created successfully.",
    schema: userResponseSchema,
  })
  @ApiResponse({ status: 400, description: "Bad Request." })
  @ApiResponse({ status: 409, description: "Conflict. User already exists." })
  async handle(@Body() body: CreateAccountBodySchema) {
    const { name, email, password, role } = body;

    let result;

    if (role === "seller") {
      result = await this.registerSeller.execute({
        name,
        email,
        password,
      });
    } else {
      result = await this.registerBuyer.execute({
        name,
        email,
        password,
      });
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

    const id = result.value[role]._id.value;
    const props = {
      ...result.value[role].props,
      role,
    };

    const user = {
      ...props,
      id,
    };

    return UserPresenter.toHTTP(user);
  }
}
