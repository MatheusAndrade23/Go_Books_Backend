import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { Env } from "./env/env";

import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const config = new DocumentBuilder()
    .setTitle("Go Books API")
    .setDescription(
      "Um site de leilão de livros onde usuários podem comprar ou vender."
    )
    .setVersion("1.0")
    .addBearerAuth()
    .addTag("Authentication")
    .addTag("Auctions")
    .addTag("Bids")
    .addTag("Attachments")
    .build();

  const app = await NestFactory.create(AppModule, {
    // logger: false,
  });

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  const configService: ConfigService<Env, true> = app.get(ConfigService);
  const port = configService.get("PORT", { infer: true });
  app.enableCors();
  await app.listen(port);
}
bootstrap();
