import { AppModule } from "@/infra/app.module";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import request from "supertest";

describe("Create auction (E2E)", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PrismaService);
    jwt = moduleRef.get(JwtService);

    await app.init();
  });

  test("[POST] /auctions", async () => {
    const user = await prisma.user.create({
      data: {
        name: "John Doe",
        email: "johndoe@example.com",
        password: "123456",
      },
    });

    const accessToken = jwt.sign({ sub: user.id });

    const response = await request(app.getHttpServer())
      .post("/auctions")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        bookName: "New Book",
        bookImageUrl: "https://example.com/image.jpg",
        description: "LOREM IPSUM",
        bookGenre: "Fantasy",
      });

    expect(response.statusCode).toBe(201);

    const auctionOnDatabase = await prisma.auction.findFirst({
      where: {
        bookName: "New Book",
      },
    });

    expect(auctionOnDatabase).toBeTruthy();
  });
});
