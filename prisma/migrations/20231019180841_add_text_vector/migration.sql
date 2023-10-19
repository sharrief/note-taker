/*
  Warnings:

  - You are about to drop the column `text_tsvector` on the `note` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "note" DROP COLUMN "text_tsvector";
