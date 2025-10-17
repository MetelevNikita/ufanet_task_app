/*
  Warnings:

  - You are about to drop the column `deraptment` on the `TaskPr` table. All the data in the column will be lost.
  - Added the required column `department` to the `TaskPr` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TaskPr" DROP COLUMN "deraptment",
ADD COLUMN     "department" TEXT NOT NULL;
