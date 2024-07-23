import { AuthModule } from "./auth/auth.module";
import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { CreateAccountController } from "./controllers/create-account.controller";
import { AuthenticateController } from "./controllers/authenticate.controller";
import { CreateBookController } from "./controllers/create-book.controller";
import { ConfigModule } from "@nestjs/config";
import { envSchema } from "src/env";

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateBookController,
  ],
  providers: [PrismaService],
})
export class AppModule {}
