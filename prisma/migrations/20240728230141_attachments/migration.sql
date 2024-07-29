-- AlterTable
ALTER TABLE "auctions" ADD COLUMN     "attachments_ids" TEXT[] DEFAULT ARRAY[]::TEXT[];
