/*
  Warnings:

  - You are about to alter the column `points` on the `Comment` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - Added the required column `description` to the `Community` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Community` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "points" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Community" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;
