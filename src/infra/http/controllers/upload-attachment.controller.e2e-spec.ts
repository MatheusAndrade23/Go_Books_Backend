import { AppModule } from "@/infra/app.module";
import { DatabaseModule } from "@/infra/database/database.module";
import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { AuctionFactory } from "test/factories/make-auction";
import { BuyerFactory } from "test/factories/make-buyer";

describe("Upload attachment (E2E)", () => {
  let app: INestApplication;
  let buyerFactory: BuyerFactory;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [BuyerFactory, AuctionFactory],
    }).compile();

    app = moduleRef.createNestApplication();

    buyerFactory = moduleRef.get(BuyerFactory);
    jwt = moduleRef.get(JwtService);

    await app.init();
  });

  test("[POST] /attachments", async () => {
    const user = await buyerFactory.makePrismaBuyer();

    const accessToken = jwt.sign({ sub: user.id.toString() });

    const response = await request(app.getHttpServer())
      .post("/attachments")
      .set("Authorization", `Bearer ${accessToken}`)
      .attach("file", "./test/e2e/sample-upload.jpg");

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      attachmentUrl: expect.any(String),
      attachmentId: expect.any(String),
    });
  });
});
