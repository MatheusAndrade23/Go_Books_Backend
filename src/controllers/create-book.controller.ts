import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CurrentUser } from "src/auth/current-user-decorator";
import { UserPayload } from "src/auth/jwt.strategy";
import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { PrismaService } from "src/prisma/prisma.service";
import { z } from "zod";

const createBookBodySchema = z.object({
  title: z.string(),
  content: z.string(),
});

const bodyValidationPipe = new ZodValidationPipe(createBookBodySchema);

type CreateBookBodySchema = z.infer<typeof createBookBodySchema>;

@Controller("/books")
@UseGuards(JwtAuthGuard)
export class CreateBookController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CreateBookBodySchema,
    @CurrentUser() user: UserPayload
  ) {
    const { title, content } = body;
    const userId = user.sub;

    const slug = this.convertToSlug(title);

    await this.prisma.book.create({
      data: {
        authorId: userId,
        title,
        content,
        slug,
      },
    });
  }

  private convertToSlug(title: string): string {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  }
}
