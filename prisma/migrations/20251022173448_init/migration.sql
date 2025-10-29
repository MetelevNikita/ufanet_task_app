/*
  Warnings:

  - Added the required column `leader` to the `TaskDesign` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TaskDesign" ADD COLUMN     "leader" TEXT NOT NULL;
