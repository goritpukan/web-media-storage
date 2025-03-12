-- CreateTable
CREATE TABLE "videos" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "author_id" TEXT NOT NULL,
    "video_minio_path" TEXT NOT NULL,
    "preview_minio_path" TEXT NOT NULL,

    CONSTRAINT "videos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "videos" ADD CONSTRAINT "videos_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
