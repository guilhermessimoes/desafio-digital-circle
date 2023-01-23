/*
  Warnings:

  - You are about to drop the `Tb01` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Tb01";

-- CreateTable
CREATE TABLE "tb01" (
    "id" INTEGER NOT NULL,
    "col_text" TEXT NOT NULL,
    "col_dt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb01_pkey" PRIMARY KEY ("id")
);
