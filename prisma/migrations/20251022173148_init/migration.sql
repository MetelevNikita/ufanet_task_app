/*
  Warnings:

  - You are about to drop the column `name` on the `TaskDesign` table. All the data in the column will be lost.
  - Added the required column `fio` to the `TaskDesign` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TaskDesign" DROP COLUMN "name",
ADD COLUMN     "fio" TEXT NOT NULL;
