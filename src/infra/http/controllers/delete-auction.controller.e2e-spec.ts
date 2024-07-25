import { AppModule } from "@/infra/app.module";
import { DatabaseModule } from "@/infra/database/database.module";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { AuctionFactory } from "test/factories/make-auction";
import { BuyerFactory } from "test/factories/make-buyer";

describe("Delete auction (E2E)", () => {
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

  test("[DELETE] /auctions/:id", async () => {
    const user = await buyerFactory.makePrismaBuyer();

    const accessToken = jwt.sign({ sub: user.id.toString() });

    const auction = await auctionFactory.makePrismaAuction({
      authorId: user.id,
    });

    const auctionId = auction.id.toString();

    const response = await request(app.getHttpServer())
      .delete(`/auctions/${auctionId}`)
      .set("Authorization", `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(204);

    const auctionOnDatabase = await prisma.auction.findUnique({
      where: {
        id: auctionId,
      },
    });

    expect(auctionOnDatabase).toBeNull();
  });
});
