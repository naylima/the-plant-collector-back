/*
  Warnings:

  - Added the required column `full_name` to the `enrollments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "enrollments" ADD COLUMN     "full_name" VARCHAR(255) NOT NULL;
