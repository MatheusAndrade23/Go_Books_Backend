import {
  BadRequestException,
  Controller,
  HttpCode,
  Param,
  Patch,
} from "@nestjs/common";
import { CurrentUser } from "@/infra/auth/current-user-decorator";
import { UserPayload } from "@/infra/auth/jwt.strategy";
import { RejectBidUseCase } from "@/domain/auctions/application/use-cases/reject-bid-by-id";

import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags("Bids")
@Controller("/bids/:id/reject")
export class RejectBidByIdController {
  constructor(private rejectBidById: RejectBidUseCase) {}

  @Patch()
  @HttpCode(204)
  @ApiOperation({ summary: "Reject a bid by its ID." })
  @ApiParam({
    name: "id",
    required: true,
    description: "The ID of the bid to be rejected.",
    type: String,
  })
  @ApiResponse({ status: 204, description: "Bid rejected successfully." })
  @ApiResponse({ status: 400, description: "Bad Request." })
  async handle(@CurrentUser() user: UserPayload, @Param("id") bidId: string) {
    const result = await this.rejectBidById.execute({
      bidId,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
