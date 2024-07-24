import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaAuctionsRepository } from "./prisma/repositories/prisma-auctions-repository";
import { AuctionsRepository } from "@/domain/auctions/application/repositories/auctions-repository";
import { BuyersRepository } from "@/domain/auctions/application/repositories/buyers-repository";
import { PrismaBuyersRepository } from "./prisma/repositories/prisma-buyers-repository";

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
  ],
  exports: [PrismaService, AuctionsRepository, BuyersRepository],
})
export class DatabaseModule {}
