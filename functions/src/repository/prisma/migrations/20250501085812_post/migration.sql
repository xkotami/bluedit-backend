/*
  Warnings:

  - Added the required column `descriptiong` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "descriptiong" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
