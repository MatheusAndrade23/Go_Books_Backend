import { AppModule } from "@/infra/app.module";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import request from "supertest";

describe("Fetch recent auctions (E2E)", () => {
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

  test("[GET] /auctions", async () => {
    const user = await prisma.user.create({
      data: {
        name: "John Doe",
        email: "johndoe@example.com",
        password: "123456",
      },
    });

    const accessToken = jwt.sign({ sub: user.id });

    await prisma.auction.createMany({
      data: [
        {
          bookName: "Book 01",
          slug: "Book-01",
          bookImageUrl: "https://via.placeholder.com/150",
          description: "Book content",
          authorId: user.id,
          bookGenre: "Fantasy",
        },
        {
          bookName: "Book 02",
          slug: "Book-02",
          bookImageUrl: "https://via.placeholder.com/150",
          description: "Book content",
          authorId: user.id,
          bookGenre: "Fantasy",
        },
      ],
    });

    const response = await request(app.getHttpServer())
      .get("/auctions")
      .set("Authorization", `Bearer ${accessToken}`)
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      auctions: [
        expect.objectContaining({ bookName: "Book 01" }),
        expect.objectContaining({ bookName: "Book 02" }),
      ],
    });
  });
});
