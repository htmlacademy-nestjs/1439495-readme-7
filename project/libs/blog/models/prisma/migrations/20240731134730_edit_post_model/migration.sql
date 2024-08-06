/*
  Warnings:

  - You are about to drop the column `isDraft` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `publishDate` on the `posts` table. All the data in the column will be lost.
  - Added the required column `is_draft` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publish_date` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "isDraft",
DROP COLUMN "publishDate",
ADD COLUMN     "is_draft" BOOLEAN NOT NULL,
ADD COLUMN     "publish_date" TIMESTAMP(3) NOT NULL;
