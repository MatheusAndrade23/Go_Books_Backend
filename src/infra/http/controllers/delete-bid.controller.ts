import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from "@nestjs/common";
import { CurrentUser } from "@/infra/auth/current-user-decorator";
import { UserPayload } from "@/infra/auth/jwt.strategy";
import { DeleteBidUseCase } from "@/domain/auctions/application/use-cases/delete-bid";
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags("Bids")
@Controller("/bids/:id")
export class DeleteBidController {
  constructor(private deleteBid: DeleteBidUseCase) {}

  @Delete()
  @HttpCode(204)
  @ApiOperation({ summary: "Delete a bid." })
  @ApiParam({
    name: "id",
    description: "The ID of the bid to be deleted.",
    required: true,
  })
  @ApiResponse({ status: 204, description: "Bid deleted successfully." })
  @ApiResponse({ status: 400, description: "Bad Request." })
  async handle(@CurrentUser() user: UserPayload, @Param("id") bidId: string) {
    const userId = user.sub;

    const result = await this.deleteBid.execute({
      bidId,
      bidderId: userId,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
