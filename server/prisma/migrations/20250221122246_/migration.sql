/*
  Warnings:

  - You are about to drop the `Gadget` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Gadget" DROP CONSTRAINT "Gadget_createdBy_fkey";

-- DropTable
DROP TABLE "Gadget";

-- DropTable
DROP TABLE "User";

-- DropEnum
DROP TYPE "Status";

-- CreateTable
CREATE TABLE "Task" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);
