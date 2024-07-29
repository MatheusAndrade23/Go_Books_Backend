import { BadRequestException, Controller, Get } from "@nestjs/common";
import { GetBidsByAuthorIdUseCase } from "@/domain/auctions/application/use-cases/get-bids-by-author-id";
import { BidPresenter } from "../presenters/bid-presenter";

import { CurrentUser } from "@/infra/auth/current-user-decorator";
import { UserPayload } from "@/infra/auth/jwt.strategy";

import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags("Bids")
@Controller("/bids")
export class FetchBidsByAuthorIdController {
  constructor(private getBidsByAuthorIdUseCase: GetBidsByAuthorIdUseCase) {}

  @Get()
  @ApiOperation({ summary: "Fetch bids by author ID." })
  @ApiResponse({
    status: 200,
    description: "List of bids for the authenticated user.",
    schema: {
      type: "object",
      properties: {
        bids: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string" },
              amount: { type: "number" },
              status: { type: "string" },
              auctionId: { type: "string" },
              bidderId: { type: "string" },
            },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: "Bad Request." })
  async handle(@CurrentUser() user: UserPayload) {
    const authorId = user.sub;

    const result = await this.getBidsByAuthorIdUseCase.execute({
      authorId,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    const bids = result.value.bids;

    return { bids: bids.map(BidPresenter.toHTTP) };
  }
}
