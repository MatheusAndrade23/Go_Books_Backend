import { Module } from "@nestjs/common";

import { AuthenticateController } from "./controllers/authenticate.controller";
import { CreateAccountController } from "./controllers/create-account.controller";
import { CreateAuctionController } from "./controllers/create-auction.controller";
import { FetchRecentAuctionsController } from "./controllers/fetch-recent-auctions.controller";
import { DatabaseModule } from "../database/database.module";
import { CreateAuctionUseCase } from "@/domain/auctions/application/use-cases/create-auction";
import { FetchRecentAuctionsUseCase } from "@/domain/auctions/application/use-cases/fetch-recent-auctions";
import { RegisterBuyerUseCase } from "@/domain/auctions/application/use-cases/register-buyer";
import { AuthenticateBuyerUseCase } from "@/domain/auctions/application/use-cases/authenticate-buyer";
import { CryptographyModule } from "../cryptography/cryptography.module";
import { UploadAttachmentController } from "./controllers/upload-attachment.controller";

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateAuctionController,
    FetchRecentAuctionsController,
    UploadAttachmentController,
  ],
  providers: [
    CreateAuctionUseCase,
    FetchRecentAuctionsUseCase,
    RegisterBuyerUseCase,
    AuthenticateBuyerUseCase,
  ],
})
export class HttpModule {}
