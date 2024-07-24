import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "@/infra/auth/jwt-auth.guard";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import { FetchRecentAuctionsUseCase } from "@/domain/auctions/application/use-cases/fetch-recent-auctions";
import { z } from "zod";

const pageQueryParamSchema = z
  .string()
  .optional()
  .default("1")
  .transform(Number)
  .pipe(z.number().min(1));

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema);

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>;

@Controller("/auctions")
@UseGuards(JwtAuthGuard)
export class FetchRecentAuctionsController {
  constructor(private fetchRecentAuctions: FetchRecentAuctionsUseCase) {}

  @Get()
  async handle(@Query("page", queryValidationPipe) page: PageQueryParamSchema) {
    const perPage = 20;

    const auctions = await this.fetchRecentAuctions.execute({
      page,
    });

    return { auctions };
  }
}
