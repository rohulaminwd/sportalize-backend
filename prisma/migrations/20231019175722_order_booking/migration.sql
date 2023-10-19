/*
  Warnings:

  - Added the required column `endTime` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `bookings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bookings" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "endTime" TEXT NOT NULL,
ADD COLUMN     "startTime" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
