/*
  Warnings:

  - The `status` column on the `bids` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `books` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('BUYER', 'SELLER');

-- CreateEnum
CREATE TYPE "AuctionStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- DropForeignKey
ALTER TABLE "bids" DROP CONSTRAINT "bids_book_id_fkey";

-- DropForeignKey
ALTER TABLE "books" DROP CONSTRAINT "books_author_id_fkey";

-- AlterTable
ALTER TABLE "bids" DROP COLUMN "status",
ADD COLUMN     "status" "AuctionStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'BUYER';

-- DropTable
DROP TABLE "books";

-- CreateTable
CREATE TABLE "auctions" (
    "id" TEXT NOT NULL,
    "book_name" TEXT NOT NULL,
    "book_image_url" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "author_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "accepted_bid_id" TEXT,

    CONSTRAINT "auctions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "auctions_slug_key" ON "auctions"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "auctions_accepted_bid_id_key" ON "auctions"("accepted_bid_id");

-- AddForeignKey
ALTER TABLE "auctions" ADD CONSTRAINT "auctions_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auctions" ADD CONSTRAINT "auctions_accepted_bid_id_fkey" FOREIGN KEY ("accepted_bid_id") REFERENCES "bids"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bids" ADD CONSTRAINT "bids_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "auctions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
