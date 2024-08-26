-- DropForeignKey
ALTER TABLE "link_posts" DROP CONSTRAINT "link_posts_post_id_fkey";

-- DropForeignKey
ALTER TABLE "photo_posts" DROP CONSTRAINT "photo_posts_post_id_fkey";

-- DropForeignKey
ALTER TABLE "quote_posts" DROP CONSTRAINT "quote_posts_post_id_fkey";

-- DropForeignKey
ALTER TABLE "text_posts" DROP CONSTRAINT "text_posts_post_id_fkey";

-- DropForeignKey
ALTER TABLE "video_posts" DROP CONSTRAINT "video_posts_post_id_fkey";

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "isRepost" BOOLEAN DEFAULT false,
ADD COLUMN     "parentId" TEXT,
ALTER COLUMN "is_draft" SET DEFAULT false,
ALTER COLUMN "publish_date" SET DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "video_posts" ADD CONSTRAINT "video_posts_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "text_posts" ADD CONSTRAINT "text_posts_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quote_posts" ADD CONSTRAINT "quote_posts_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photo_posts" ADD CONSTRAINT "photo_posts_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "link_posts" ADD CONSTRAINT "link_posts_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
