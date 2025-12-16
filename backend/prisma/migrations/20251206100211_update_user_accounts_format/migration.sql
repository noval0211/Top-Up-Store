-- AlterTable
ALTER TABLE `userAccounts` ADD COLUMN `isVerified` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `verivyToken` VARCHAR(191) NULL,
    ADD COLUMN `verivyTokenExp` DATETIME(3) NULL;
