import { AppModule } from "@/infra/app.module";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import request from "supertest";

describe("Get auction by auction Id (E2E)", () => {
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

  test("[GET] /auction/:id", async () => {
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
          id: "1",
          bookName: "Book 01",
          slug: "Book-01",
          bookImageUrl: "https://via.placeholder.com/150",
          description: "Book content",
          authorId: user.id,
          bookGenre: "Fantasy",
        },
        {
          id: "2",
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
      .get(`/auction/1`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body.auction).toEqual(
      expect.objectContaining({ bookName: "Book 01" })
    );
  });
});
