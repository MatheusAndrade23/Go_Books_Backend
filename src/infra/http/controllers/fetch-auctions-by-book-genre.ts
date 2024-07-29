import { BadRequestException, Controller, Get, Param } from "@nestjs/common";
import { FetchAuctionsByBookGenreUseCase } from "@/domain/auctions/application/use-cases/fetch-auctions-by-book-genre";
import { AuctionPresenter } from "../presenters/auction-presenter";
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags("Auctions")
@Controller("/auctions/bookGenre/:bookGenre")
export class FetchAuctionsByBookGenreController {
  constructor(
    private fetchAuctionsByBookGenre: FetchAuctionsByBookGenreUseCase
  ) {}

  @Get()
  @ApiOperation({ summary: "Fetch auctions by book genre." })
  @ApiResponse({
    status: 200,
    description: "List of auctions filtered by book genre.",
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
  async handle(@Param("bookGenre") bookGenre: string) {
    const result = await this.fetchAuctionsByBookGenre.execute({
      bookGenre: bookGenre.toLowerCase(),
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    const auctions = result.value.auctions;

    return { auctions: auctions.map(AuctionPresenter.toHTTP) };
  }
}
