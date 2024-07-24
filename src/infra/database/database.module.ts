import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaAuctionsRepository } from "./prisma/repositories/prisma-auctions-repository";

@Module({
  providers: [PrismaService, PrismaAuctionsRepository],
  exports: [PrismaService, PrismaAuctionsRepository],
})
export class DatabaseModule {}
