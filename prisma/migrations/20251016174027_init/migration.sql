-- CreateTable
CREATE TABLE "public"."TaskPr" (
    "id" SERIAL NOT NULL,
    "deraptment" TEXT NOT NULL,
    "product" TEXT NOT NULL,
    "event" TEXT,
    "name" TEXT NOT NULL,
    "subdivision" TEXT NOT NULL,
    "tgId" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "target" TEXT,
    "build" TEXT,
    "leader" TEXT,
    "place" TEXT,
    "site" TEXT,
    "participants" TEXT,
    "date" TEXT,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TaskPr_pkey" PRIMARY KEY ("id")
);
