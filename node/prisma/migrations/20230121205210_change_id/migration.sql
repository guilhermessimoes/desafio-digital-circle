/*
  Warnings:

  - The primary key for the `tb01` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "tb01" DROP CONSTRAINT "tb01_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "tb01_pkey" PRIMARY KEY ("id");
