/*
  Warnings:

  - You are about to drop the column `bookingPlayGroundId` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the `booking_play_ground` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `bookings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "booking_play_ground" DROP CONSTRAINT "booking_play_ground_userId_fkey";

-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_bookingPlayGroundId_fkey";

-- AlterTable
ALTER TABLE "bookings" DROP COLUMN "bookingPlayGroundId",
DROP COLUMN "quantity",
ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'pending',
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "dateOfBirth" TEXT;

-- DropTable
DROP TABLE "booking_play_ground";

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
