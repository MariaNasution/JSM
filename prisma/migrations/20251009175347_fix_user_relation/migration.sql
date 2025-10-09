/*
  Warnings:

  - You are about to drop the column `role` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Employee` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."Employee_username_key";

-- AlterTable
ALTER TABLE "public"."Employee" DROP COLUMN "role",
DROP COLUMN "username";
