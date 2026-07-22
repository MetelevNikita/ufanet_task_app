-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telegramId" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "loginCorp" TEXT NOT NULL,
    "сonfirmed" BOOLEAN NOT NULL,
    "admin" BOOLEAN NOT NULL,
    "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
