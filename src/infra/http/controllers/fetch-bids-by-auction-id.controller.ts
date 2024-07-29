import { BadRequestException, Controller, Get, Param } from "@nestjs/common";
import { GetBidsByAuctionIdUseCase } from "@/domain/auctions/application/use-cases/fetch-bids-by-auction-id";
import { BidPresenter } from "../presenters/bid-presenter";
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags("Bids")
@Controller("/bids/auction/:id")
export class FetchBidsByAuctionIdController {
  constructor(private getBidsByAuctionIdUseCase: GetBidsByAuctionIdUseCase) {}

  @Get()
  @ApiOperation({ summary: "Fetch bids by auction ID." })
  @ApiResponse({
    status: 200,
    description: "List of bids for the specified auction.",
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
              bidderId: { type: "string" },
              auctionId: { type: "string" },
            },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: "Bad Request." })
  async handle(@Param() id: { id: string }) {
    const auctionId = id.id;

    const result = await this.getBidsByAuctionIdUseCase.execute({
      auctionId,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    const bids = result.value.bids;

    return { bids: bids.map(BidPresenter.toHTTP) };
  }
}
