/*
  Warnings:

  - You are about to drop the column `loginId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[hashedloginId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_loginId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "loginId",
ADD COLUMN     "hashedloginId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_hashedloginId_key" ON "User"("hashedloginId");
