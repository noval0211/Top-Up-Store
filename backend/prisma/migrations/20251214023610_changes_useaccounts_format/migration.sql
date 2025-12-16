/*
  Warnings:

  - The primary key for the `userAccounts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `userAccounts` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `userAccounts` table. All the data in the column will be lost.
  - You are about to drop the column `verivyToken` on the `userAccounts` table. All the data in the column will be lost.
  - You are about to drop the column `verivyTokenExp` on the `userAccounts` table. All the data in the column will be lost.
  - Added the required column `uid` to the `userAccounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `userAccounts` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `password`,
    DROP COLUMN `verivyToken`,
    DROP COLUMN `verivyTokenExp`,
    ADD COLUMN `avatar` LONGBLOB NULL,
    ADD COLUMN `provider` VARCHAR(191) NULL,
    ADD COLUMN `uid` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`uid`);
