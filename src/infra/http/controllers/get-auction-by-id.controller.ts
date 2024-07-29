import { BadRequestException, Controller, Get, Param } from "@nestjs/common";

import { GetAuctionByIdUseCase } from "@/domain/auctions/application/use-cases/get-auction-by-id";

import { AuctionPresenter } from "../presenters/auction-presenter";

import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags("Auctions")
@Controller("/auction/:id")
export class GetAuctionByIdController {
  constructor(private getAuctionById: GetAuctionByIdUseCase) {}

  @Get()
  @ApiOperation({ summary: "Fetch an auction by its ID." })
  @ApiParam({
    name: "id",
    required: true,
    description: "The ID of the auction.",
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: "Auction details.",
    schema: {
      type: "object",
      properties: {
        auction: {
          type: "object",
          properties: {
            id: { type: "string" },
            bookName: { type: "string" },
            description: { type: "string" },
            bookImageUrl: { type: "string" },
            bookGenre: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: "Bad Request." })
  async handle(@Param("id") id: string) {
    const result = await this.getAuctionById.execute({
      id,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    const auction = result.value.auction;

    return { auction: AuctionPresenter.toHTTP(auction) };
  }
}
