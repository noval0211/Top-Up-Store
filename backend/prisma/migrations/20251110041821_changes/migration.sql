/*
  Warnings:

  - You are about to drop the column `description` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `product` DROP COLUMN `description`,
    DROP COLUMN `price`,
    ADD COLUMN `type` VARCHAR(191) NULL;
