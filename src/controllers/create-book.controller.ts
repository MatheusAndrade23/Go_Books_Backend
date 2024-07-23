import { Controller, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("/books")
@UseGuards(JwtAuthGuard)
export class CreateBookController {
  constructor() {}

  @Post()
  async handle() {
    return "ok";
  }
}
