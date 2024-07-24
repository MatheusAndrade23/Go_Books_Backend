import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { CurrentUser } from "@/auth/current-user-decorator";
import { JwtAuthGuard } from "@/auth/jwt-auth.guard";
import { UserPayload } from "@/auth/jwt.strategy";
import { ZodValidationPipe } from "@/pipes/zod-validation-pipe";
import { PrismaService } from "@/prisma/prisma.service";
import { z } from "zod";

const createAuctionBodySchema = z.object({
  bookName: z.string(),
  description: z.string(),
});

const bodyValidationPipe = new ZodValidationPipe(createAuctionBodySchema);

type CreateAuctionBodySchema = z.infer<typeof createAuctionBodySchema>;

@Controller("/auctions")
@UseGuards(JwtAuthGuard)
export class CreateAuctionController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CreateAuctionBodySchema,
    @CurrentUser() user: UserPayload
  ) {
    const { bookName, description } = body;
    const userId = user.sub;

    const slug = this.convertToSlug(bookName);

    await this.prisma.auction.create({
      data: {
        authorId: userId,
        bookName,
        description,
        slug,
      },
    });
  }

  private convertToSlug(bookName: string): string {
    return bookName
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  }
}
