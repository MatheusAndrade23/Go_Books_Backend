import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaAuctionsRepository } from "./prisma/repositories/prisma-auctions-repository";
import { AuctionsRepository } from "@/domain/auctions/application/repositories/auctions-repository";

@Module({
  providers: [
    PrismaService,
    {
      provide: AuctionsRepository,
      useClass: PrismaAuctionsRepository,
    },
  ],
  exports: [PrismaService, AuctionsRepository],
})
export class DatabaseModule {}
