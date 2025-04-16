/*
  Warnings:

  - Added the required column `preview_url` to the `videos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `video_url` to the `videos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "videos" ADD COLUMN     "preview_url" TEXT NOT NULL,
ADD COLUMN     "video_url" TEXT NOT NULL;
