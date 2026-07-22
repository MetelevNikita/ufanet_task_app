-- AlterTable
ALTER TABLE "User" ADD COLUMN     "department" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "policy" BOOLEAN NOT NULL DEFAULT false;
