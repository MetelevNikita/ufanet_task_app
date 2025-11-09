/*
  Warnings:

  - You are about to drop the `TaskDesign` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TaskPr` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."TaskDesign";

-- DropTable
DROP TABLE "public"."TaskPr";

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "ygId" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "fio" TEXT NOT NULL,
    "subdivision" TEXT NOT NULL,
    "tgId" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "leader" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);
