/*
  Warnings:

  - You are about to drop the `tb01` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "tb01";

-- CreateTable
CREATE TABLE "Tb01" (
    "id" TEXT NOT NULL,
    "col_text0" TEXT NOT NULL,
    "col_dt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tb01_pkey" PRIMARY KEY ("id")
);
