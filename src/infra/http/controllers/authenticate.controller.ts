import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import { z } from "zod";
import { Public } from "@/infra/auth/public";

import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
} from "@nestjs/common";
import { AuthenticateBuyerUseCase } from "@/domain/auctions/application/use-cases/authenticate-buyer";
import { AuthenticateSellerUseCase } from "@/domain/auctions/application/use-cases/authenticate-seller";
import { WrongCredentialsError } from "@/domain/auctions/application/use-cases/errors/wrong-credentials-error";
import { UserPresenter } from "../presenters/user-presenter";
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from "@nestjs/swagger";

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
  role: z.enum(["buyer", "seller"]),
});

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>;

const userResponseSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    email: { type: "string", format: "email" },
    role: { type: "string", enum: ["buyer", "seller"] },
  },
};

const authenticateResponseSchema = {
  type: "object",
  properties: {
    user: userResponseSchema,
    access_token: { type: "string" },
  },
};

@ApiTags("Authentication")
@Controller("/sessions")
@Public()
export class AuthenticateController {
  constructor(
    private authenticateBuyer: AuthenticateBuyerUseCase,
    private authenticateSeller: AuthenticateSellerUseCase
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  @ApiOperation({ summary: "Authenticate a user." })
  @ApiBody({
    description: "The body for user authentication",
    required: true,
    schema: {
      type: "object",
      properties: {
        email: { type: "string", format: "email" },
        password: { type: "string" },
        role: { type: "string", enum: ["buyer", "seller"] },
      },
      required: ["email", "password", "role"],
    },
  })
  @ApiResponse({
    status: 200,
    description: "User authenticated successfully.",
    schema: authenticateResponseSchema,
  })
  @ApiResponse({ status: 400, description: "Bad Request." })
  @ApiResponse({ status: 401, description: "Unauthorized. Wrong credentials." })
  async handle(@Body() body: AuthenticateBodySchema) {
    const { email, password, role } = body;

    let result;

    if (role === "seller") {
      result = await this.authenticateSeller.execute({
        email,
        password,
      });
    } else {
      result = await this.authenticateBuyer.execute({
        email,
        password,
      });
    }

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }

    const id = result.value._id.value;
    const props = {
      ...result.value.props,
      role,
    };

    const user = {
      ...props,
      id,
    };

    const { accessToken } = result.value;

    return {
      user: UserPresenter.toHTTP(user),
      access_token: accessToken,
    };
  }
}
