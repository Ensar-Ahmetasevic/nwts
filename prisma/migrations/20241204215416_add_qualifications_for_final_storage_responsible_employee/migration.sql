/*
  Warnings:

  - Added the required column `qualifications` to the `FinalStorageResponsibleEmployee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FinalStorageResponsibleEmployee" ADD COLUMN     "qualifications" TEXT NOT NULL;
