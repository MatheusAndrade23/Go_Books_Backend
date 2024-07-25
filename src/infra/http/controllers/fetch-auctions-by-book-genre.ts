import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Query,
} from "@nestjs/common";
import { FetchAuctionsByBookGenreUseCase } from "@/domain/auctions/application/use-cases/fetch-auctions-by-book-genre";
import { AuctionPresenter } from "../presenters/auction-presenter";

@Controller("/auctions/bookGenre/:bookGenre")
export class FetchAuctionsByBookGenreController {
  constructor(
    private fetchAuctionsByBookGenre: FetchAuctionsByBookGenreUseCase
  ) {}

  @Get()
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
