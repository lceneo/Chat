/*
  Warnings:

  - You are about to drop the column `hashedloginId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[hashedLoginId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - The required column `hashedLoginId` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX "User_hashedloginId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "hashedloginId",
ADD COLUMN     "hashedLoginId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_hashedLoginId_key" ON "User"("hashedLoginId");
