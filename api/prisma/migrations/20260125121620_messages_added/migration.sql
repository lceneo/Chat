/*
  Warnings:

  - You are about to drop the column `interlocutor_id` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[interlocutorId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - The required column `interlocutorId` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "interlocutor_id",
ADD COLUMN     "interlocutorId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_interlocutorId_key" ON "User"("interlocutorId");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("interlocutorId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("interlocutorId") ON DELETE RESTRICT ON UPDATE CASCADE;
