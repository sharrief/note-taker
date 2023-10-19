/*
  Warnings:

  - Added the required column `text_json` to the `note` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "note" 
ADD COLUMN "text_json" JSONB NOT NULL,
ALTER COLUMN "text" SET DATA TYPE VARCHAR(500);
