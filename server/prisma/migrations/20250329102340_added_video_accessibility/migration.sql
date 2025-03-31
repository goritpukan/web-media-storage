/*
  Warnings:

  - Added the required column `accessibility` to the `videos` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "VideoAccessibility" AS ENUM ('PUBLIC', 'PRIVATE');

-- AlterTable
ALTER TABLE "videos" ADD COLUMN     "accessibility" "VideoAccessibility" NOT NULL;
