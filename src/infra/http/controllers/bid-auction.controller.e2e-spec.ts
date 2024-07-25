import { AppModule } from "@/infra/app.module";
import { DatabaseModule } from "@/infra/database/database.module";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { AuctionFactory } from "test/factories/make-auction";
import { BuyerFactory } from "test/factories/make-buyer";

describe("Bid auction (E2E)", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let buyerFactory: BuyerFactory;
  let auctionFactory: AuctionFactory;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [BuyerFactory, AuctionFactory],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PrismaService);
    buyerFactory = moduleRef.get(BuyerFactory);
    auctionFactory = moduleRef.get(AuctionFactory);
    jwt = moduleRef.get(JwtService);

    await app.init();
  });

  test("[POST] /auctions/:auctionId/bids", async () => {
    const user = await buyerFactory.makePrismaBuyer();

    const accessToken = jwt.sign({ sub: user.id.toString() });

    const auction = await auctionFactory.makePrismaAuction({
      authorId: user.id,
    });

    const auctionId = auction.id.toString();

    const response = await request(app.getHttpServer())
      .post(`/auctions/${auctionId}/bids`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        amount: 100,
        status: "accepted",
      });

    expect(response.statusCode).toBe(201);

    const bidOnDatabase = await prisma.bid.findFirst({
      where: {
        amount: 100,
      },
    });

    expect(bidOnDatabase).toBeTruthy();
  });
});
