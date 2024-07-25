/*
  Warnings:

  - The values [PENDING,ACCEPTED,REJECTED] on the enum `AuctionStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [BUYER,SELLER] on the enum `UserRole` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `book_genre` to the `auctions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AuctionStatus_new" AS ENUM ('pending', 'accepted', 'rejected');
ALTER TABLE "bids" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "bids" ALTER COLUMN "status" TYPE "AuctionStatus_new" USING ("status"::text::"AuctionStatus_new");
ALTER TYPE "AuctionStatus" RENAME TO "AuctionStatus_old";
ALTER TYPE "AuctionStatus_new" RENAME TO "AuctionStatus";
DROP TYPE "AuctionStatus_old";
ALTER TABLE "bids" ALTER COLUMN "status" SET DEFAULT 'pending';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "UserRole_new" AS ENUM ('buyer', 'seller');
ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "role" TYPE "UserRole_new" USING ("role"::text::"UserRole_new");
ALTER TYPE "UserRole" RENAME TO "UserRole_old";
ALTER TYPE "UserRole_new" RENAME TO "UserRole";
DROP TYPE "UserRole_old";
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'buyer';
COMMIT;

-- AlterTable
ALTER TABLE "auctions" ADD COLUMN     "book_genre" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "bids" ALTER COLUMN "status" SET DEFAULT 'pending';

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'buyer';
