/*
  Warnings:

  - The primary key for the `userAccounts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `avatar` on the `userAccounts` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `userAccounts` DROP PRIMARY KEY,
    MODIFY `avatar` VARCHAR(191) NULL,
    MODIFY `uid` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`uid`);
