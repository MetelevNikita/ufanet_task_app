-- CreateTable
CREATE TABLE "TaskDesign" (
    "ygId" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "subdivision" TEXT NOT NULL,
    "tgId" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "date" TEXT,
    "target" TEXT,
    "audience" TEXT,
    "build" TEXT,
    "size" TEXT,
    "orientation" TEXT,
    "future" TEXT,
    "place" TEXT,
    "file" TEXT,
    "change" TEXT,
    "deadline" TEXT,
    "status" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TaskDesign_pkey" PRIMARY KEY ("id")
);
