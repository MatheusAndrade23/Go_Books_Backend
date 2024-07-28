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
import { FetchAuctionsByBookGenreController } from "./controllers/fetch-auctions-by-book-genre";
import { GetAuctionByIdController } from "./controllers/get-auction-by-id.controller";
import { FetchBidsByAuthorIdController } from "./controllers/fetch-bids-by-author-id.controller";
import { FetchAuctionsByAuthorIdController } from "./controllers/fetch-auctions-by-author-id";
import { FetchBidsByAuctionIdController } from "./controllers/fetch-bids-by-auction-id.controller";
import { AcceptBidByIdController } from "./controllers/accept-bid-by-id.controller";
import { RejectBidByIdController } from "./controllers/reject-bid-by-id.controller";

import { CreateAuctionUseCase } from "@/domain/auctions/application/use-cases/create-auction";
import { FetchRecentAuctionsUseCase } from "@/domain/auctions/application/use-cases/fetch-recent-auctions";
import { RegisterBuyerUseCase } from "@/domain/auctions/application/use-cases/register-buyer";
import { AuthenticateBuyerUseCase } from "@/domain/auctions/application/use-cases/authenticate-buyer";
import { BidAuctionUseCase } from "@/domain/auctions/application/use-cases/bid-auction";
import { DeleteBidUseCase } from "@/domain/auctions/application/use-cases/delete-bid";
import { DeleteAuctionUseCase } from "@/domain/auctions/application/use-cases/delete-auction";
import { AuthenticateSellerUseCase } from "@/domain/auctions/application/use-cases/authenticate-seller";
import { RegisterSellerUseCase } from "@/domain/auctions/application/use-cases/register-seller";
import { FetchAuctionsByBookGenreUseCase } from "@/domain/auctions/application/use-cases/fetch-auctions-by-book-genre";
import { GetAuctionByIdUseCase } from "@/domain/auctions/application/use-cases/get-auction-by-id";
import { GetBidsByAuthorIdUseCase } from "@/domain/auctions/application/use-cases/get-bids-by-author-id";
import { GetAuctionsByAuthorIdUseCase } from "@/domain/auctions/application/use-cases/get-auctions-by-author-id";
import { GetBidsByAuctionIdUseCase } from "@/domain/auctions/application/use-cases/fetch-bids-by-auction-id";
import { RejectBidUseCase } from "@/domain/auctions/application/use-cases/reject-bid-by-id";
import { AcceptBidUseCase } from "@/domain/auctions/application/use-cases/accept-bid-by-id";

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
    FetchAuctionsByBookGenreController,
    GetAuctionByIdController,
    FetchBidsByAuthorIdController,
    FetchAuctionsByAuthorIdController,
    FetchBidsByAuctionIdController,
    AcceptBidByIdController,
    RejectBidByIdController,
  ],
  providers: [
    CreateAuctionUseCase,
    FetchRecentAuctionsUseCase,
    RegisterBuyerUseCase,
    AuthenticateBuyerUseCase,
    BidAuctionUseCase,
    DeleteBidUseCase,
    DeleteAuctionUseCase,
    AuthenticateSellerUseCase,
    RegisterSellerUseCase,
    FetchAuctionsByBookGenreUseCase,
    GetAuctionByIdUseCase,
    GetBidsByAuthorIdUseCase,
    GetAuctionsByAuthorIdUseCase,
    GetBidsByAuctionIdUseCase,
    RejectBidUseCase,
    AcceptBidUseCase,
  ],
})
export class HttpModule {}
