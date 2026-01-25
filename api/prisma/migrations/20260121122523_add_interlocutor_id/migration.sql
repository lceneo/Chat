/*
  Warnings:

  - The required column `interlocutor_id` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "interlocutor_id" TEXT NOT NULL;
