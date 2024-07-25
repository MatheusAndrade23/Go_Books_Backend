import { AppModule } from "@/infra/app.module";
import { DatabaseModule } from "@/infra/database/database.module";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { BidFactory } from "test/factories/make-bid";
import { AuctionFactory } from "test/factories/make-auction";
import { BuyerFactory } from "test/factories/make-buyer";

describe("Delete bid (E2E)", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let buyerFactory: BuyerFactory;
  let auctionFactory: AuctionFactory;
  let bidFactory: BidFactory;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [BuyerFactory, AuctionFactory, BidFactory],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PrismaService);
    buyerFactory = moduleRef.get(BuyerFactory);
    auctionFactory = moduleRef.get(AuctionFactory);
    bidFactory = moduleRef.get(BidFactory);
    jwt = moduleRef.get(JwtService);

    await app.init();
  });

  test("[DELETE] /bids/:id", async () => {
    const user = await buyerFactory.makePrismaBuyer();

    const accessToken = jwt.sign({ sub: user.id.toString() });

    const auction = await auctionFactory.makePrismaAuction({
      authorId: user.id,
    });

    const bid = await bidFactory.makePrismaBid({
      bidderId: user.id,
      auctionId: auction.id,
      amount: 100,
      status: "pending",
    });

    const bidId = bid.id.toString();

    const response = await request(app.getHttpServer())
      .delete(`/bids/${bidId}`)
      .set("Authorization", `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(204);

    const bidOnDatabase = await prisma.bid.findUnique({
      where: {
        id: bidId,
      },
    });

    expect(bidOnDatabase).toBeNull();
  });
});
