/*
  Warnings:

  - You are about to drop the column `isVerified` on the `userAccounts` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `productPacks` DROP FOREIGN KEY `productPacks_productId_fkey`;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `status` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `userAccounts` DROP COLUMN `isVerified`;

-- AddForeignKey
ALTER TABLE `productPacks` ADD CONSTRAINT `productPacks_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
