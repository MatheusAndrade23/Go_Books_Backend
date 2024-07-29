import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from "@nestjs/common";
import { CurrentUser } from "@/infra/auth/current-user-decorator";
import { UserPayload } from "@/infra/auth/jwt.strategy";
import { DeleteAuctionUseCase } from "@/domain/auctions/application/use-cases/delete-auction";
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";

@ApiTags("Auctions")
@Controller("/auctions/:id")
export class DeleteAuctionController {
  constructor(private deleteAuction: DeleteAuctionUseCase) {}

  @Delete()
  @HttpCode(204)
  @ApiOperation({ summary: "Delete an auction." })
  @ApiParam({
    name: "id",
    description: "The ID of the auction to be deleted.",
    required: true,
  })
  @ApiResponse({ status: 204, description: "Auction deleted successfully." })
  @ApiResponse({ status: 400, description: "Bad Request." })
  async handle(
    @CurrentUser() user: UserPayload,
    @Param("id") auctionId: string
  ) {
    const userId = user.sub;

    const result = await this.deleteAuction.execute({
      auctionId,
      authorId: userId,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
