/*
  Warnings:

  - Added the required column `userId` to the `sweets` table without a default value. This is not possible if the table is not empty.

*/

-- Delete existing sweets (they don't have a userId)
DELETE FROM "sweets";

-- AlterTable
ALTER TABLE "sweets" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "sweets" ADD CONSTRAINT "sweets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
