import { Module } from "@nestjs/common";

import { AuthenticateController } from "./controllers/authenticate.controller";
import { CreateAccountController } from "./controllers/create-account.controller";
import { CreateAuctionController } from "./controllers/create-auction.controller";
import { FetchRecentAuctionsController } from "./controllers/fetch-recent-auctions.controller";
import { DatabaseModule } from "../database/database.module";
import { CreateAuctionUseCase } from "@/domain/auctions/application/use-cases/create-auction";
import { FetchRecentAuctionsUseCase } from "@/domain/auctions/application/use-cases/fetch-recent-auctions";

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateAuctionController,
    FetchRecentAuctionsController,
  ],
  providers: [CreateAuctionUseCase, FetchRecentAuctionsUseCase],
})
export class HttpModule {}
