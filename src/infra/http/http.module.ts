import { Module } from "@nestjs/common";

import { DatabaseModule } from "../database/database.module";
import { CryptographyModule } from "../cryptography/cryptography.module";

import { UploadAttachmentController } from "./controllers/upload-attachment.controller";
import { BidAuctionController } from "./controllers/bid-auction.controller";
import { AuthenticateController } from "./controllers/authenticate.controller";
import { CreateAccountController } from "./controllers/create-account.controller";
import { CreateAuctionController } from "./controllers/create-auction.controller";
import { FetchRecentAuctionsController } from "./controllers/fetch-recent-auctions.controller";
import { DeleteBidController } from "./controllers/delete-bid.controller";
import { DeleteAuctionController } from "./controllers/delete-auction.controller";

import { CreateAuctionUseCase } from "@/domain/auctions/application/use-cases/create-auction";
import { FetchRecentAuctionsUseCase } from "@/domain/auctions/application/use-cases/fetch-recent-auctions";
import { RegisterBuyerUseCase } from "@/domain/auctions/application/use-cases/register-buyer";
import { AuthenticateBuyerUseCase } from "@/domain/auctions/application/use-cases/authenticate-buyer";
import { BidAuctionUseCase } from "@/domain/auctions/application/use-cases/bid-auction";
import { DeleteBidUseCase } from "@/domain/auctions/application/use-cases/delete-bid";
import { DeleteAuctionUseCase } from "@/domain/auctions/application/use-cases/delete-auction";

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateAuctionController,
    FetchRecentAuctionsController,
    UploadAttachmentController,
    BidAuctionController,
    DeleteBidController,
    DeleteAuctionController,
  ],
  providers: [
    CreateAuctionUseCase,
    FetchRecentAuctionsUseCase,
    RegisterBuyerUseCase,
    AuthenticateBuyerUseCase,
    BidAuctionUseCase,
    DeleteBidUseCase,
    DeleteAuctionUseCase,
  ],
})
export class HttpModule {}
