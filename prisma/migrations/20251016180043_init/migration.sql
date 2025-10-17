/*
  Warnings:

  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `status` to the `TaskPr` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TaskPr" ADD COLUMN     "status" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."Task";
