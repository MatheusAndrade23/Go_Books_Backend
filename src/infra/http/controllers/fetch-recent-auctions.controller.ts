import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Query,
} from "@nestjs/common";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import { FetchRecentAuctionsUseCase } from "@/domain/auctions/application/use-cases/fetch-recent-auctions";
import { z } from "zod";

import { AuctionPresenter } from "../presenters/auction-presenter";

import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiQuery,
} from "@nestjs/swagger";

const pageQueryParamSchema = z
  .string()
  .optional()
  .default("1")
  .transform(Number)
  .pipe(z.number().min(1));

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema);

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>;

@ApiBearerAuth()
@ApiTags("Auctions")
@Controller("/auctions")
export class FetchRecentAuctionsController {
  constructor(private fetchRecentAuctions: FetchRecentAuctionsUseCase) {}

  @Get()
  @ApiOperation({ summary: "Fetch recent auctions." })
  @ApiQuery({
    name: "page",
    required: false,
    description: "The page number for pagination.",
    type: Number,
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: "List of recent auctions.",
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
              createdAt: { type: "string", format: "date-time" },
            },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: "Bad Request." })
  async handle(@Query("page", queryValidationPipe) page: PageQueryParamSchema) {
    const result = await this.fetchRecentAuctions.execute({
      page,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    const auctions = result.value.auctions;

    return { auctions: auctions.map(AuctionPresenter.toHTTP) };
  }
}
