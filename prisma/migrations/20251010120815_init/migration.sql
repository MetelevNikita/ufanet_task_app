/*
  Warnings:

  - You are about to drop the column `description` on the `Task` table. All the data in the column will be lost.
  - Added the required column `email` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `leader` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Task" DROP COLUMN "description",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "leader" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;
