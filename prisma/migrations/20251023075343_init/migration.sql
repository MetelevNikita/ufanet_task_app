/*
  Warnings:

  - You are about to drop the column `date` on the `TaskPr` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TaskPr" DROP COLUMN "date",
ADD COLUMN     "deadline" TEXT;
