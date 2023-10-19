/*
  Warnings:

  - You are about to drop the `_noteTotag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tag` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_noteTotag" DROP CONSTRAINT "_noteTotag_A_fkey";

-- DropForeignKey
ALTER TABLE "_noteTotag" DROP CONSTRAINT "_noteTotag_B_fkey";

-- DropForeignKey
ALTER TABLE "tag" DROP CONSTRAINT "tag_userId_fkey";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_noteTotag";

-- DropTable
DROP TABLE "tag";
