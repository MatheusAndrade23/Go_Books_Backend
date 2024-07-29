import {
  BadRequestException,
  Controller,
  HttpCode,
  Param,
  Patch,
} from "@nestjs/common";
import { CurrentUser } from "@/infra/auth/current-user-decorator";
import { UserPayload } from "@/infra/auth/jwt.strategy";
import { AcceptBidUseCase } from "@/domain/auctions/application/use-cases/accept-bid-by-id";
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags("Bids")
@Controller("/bids/:id/accept")
export class AcceptBidByIdController {
  constructor(private acceptBidById: AcceptBidUseCase) {}
  @Patch()
  @HttpCode(204)
  @ApiOperation({ summary: "Accept a bid by its ID." })
  @ApiParam({
    name: "id",
    description: "The ID of the bid to accept.",
    required: true,
    type: String,
  })
  @ApiResponse({ status: 204, description: "Bid accepted successfully." })
  @ApiResponse({ status: 400, description: "Bad Request." })
  async handle(@CurrentUser() user: UserPayload, @Param("id") bidId: string) {
    const result = await this.acceptBidById.execute({
      bidId,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
