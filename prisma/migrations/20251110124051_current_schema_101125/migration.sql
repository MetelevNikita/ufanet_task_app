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
    "title" TEXT NOT NULL,
    "deadline" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "stage" TEXT NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);
