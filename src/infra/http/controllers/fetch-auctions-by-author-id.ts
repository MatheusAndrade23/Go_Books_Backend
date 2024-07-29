import { BadRequestException, Controller, Get } from "@nestjs/common";
import { GetAuctionsByAuthorIdUseCase } from "@/domain/auctions/application/use-cases/get-auctions-by-author-id";
import { AuctionPresenter } from "../presenters/auction-presenter";

import { CurrentUser } from "@/infra/auth/current-user-decorator";
import { UserPayload } from "@/infra/auth/jwt.strategy";

import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags("Auctions")
@Controller("/auctions/seller")
export class FetchAuctionsByAuthorIdController {
  constructor(
    private getAuctionsByAuthorIdUseCase: GetAuctionsByAuthorIdUseCase
  ) {}

  @Get()
  @ApiOperation({ summary: "Fetch auctions by the authenticated seller." })
  @ApiResponse({
    status: 200,
    description: "List of auctions for the authenticated seller.",
    schema: {
      type: "object",
      properties: {
        auctions: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string" },
              bookName: { type: "string" },
              description: { type: "string" },
              bookImageUrl: { type: "string" },
              bookGenre: { type: "string" },
            },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: "Bad Request." })
  async handle(@CurrentUser() user: UserPayload) {
    const authorId = user.sub;

    const result = await this.getAuctionsByAuthorIdUseCase.execute({
      authorId,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    const auctions = result.value.auctions;

    return { auctions: auctions.map(AuctionPresenter.toHTTP) };
  }
}
