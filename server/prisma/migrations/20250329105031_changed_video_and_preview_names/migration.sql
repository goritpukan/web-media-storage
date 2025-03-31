/*
  Warnings:

  - You are about to drop the column `preview_minio_path` on the `videos` table. All the data in the column will be lost.
  - You are about to drop the column `video_minio_path` on the `videos` table. All the data in the column will be lost.
  - Added the required column `preview_key` to the `videos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `video_key` to the `videos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "videos" DROP COLUMN "preview_minio_path",
DROP COLUMN "video_minio_path",
ADD COLUMN     "preview_key" TEXT NOT NULL,
ADD COLUMN     "video_key" TEXT NOT NULL;
