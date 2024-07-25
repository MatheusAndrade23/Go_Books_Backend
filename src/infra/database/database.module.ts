import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaAuctionsRepository } from "./prisma/repositories/prisma-auctions-repository";
import { AuctionsRepository } from "@/domain/auctions/application/repositories/auctions-repository";
import { BuyersRepository } from "@/domain/auctions/application/repositories/buyers-repository";
import { PrismaBuyersRepository } from "./prisma/repositories/prisma-buyers-repository";
import { PrismaBidsRepository } from "./prisma/repositories/prisma-bids-repository";
import { BidsRepository } from "@/domain/auctions/application/repositories/bids-repository";

@Module({
  providers: [
    PrismaService,
    {
      provide: AuctionsRepository,
      useClass: PrismaAuctionsRepository,
    },
    {
      provide: BuyersRepository,
      useClass: PrismaBuyersRepository,
    },
    {
      provide: BidsRepository,
      useClass: PrismaBidsRepository,
    },
  ],
  exports: [
    PrismaService,
    AuctionsRepository,
    BuyersRepository,
    BidsRepository,
  ],
})
export class DatabaseModule {}
