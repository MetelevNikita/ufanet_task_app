/*
  Warnings:

  - Added the required column `ydId` to the `TaskPr` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TaskPr" ADD COLUMN     "ydId" TEXT NOT NULL;
