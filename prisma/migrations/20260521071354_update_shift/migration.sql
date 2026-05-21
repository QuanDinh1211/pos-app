/*
  Warnings:

  - A unique constraint covering the columns `[shiftScheduleId]` on the table `Shift` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `order` ADD COLUMN `shiftId` INTEGER NULL;

-- AlterTable
ALTER TABLE `shift` ADD COLUMN `note` VARCHAR(191) NULL,
    ADD COLUMN `shiftScheduleId` INTEGER NULL;

-- CreateTable
CREATE TABLE `ShiftTemplate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `storeId` INTEGER NULL,
    `code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `startTime` VARCHAR(191) NOT NULL,
    `endTime` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ShiftTemplate_code_key`(`code`),
    INDEX `ShiftTemplate_storeId_idx`(`storeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ShiftSchedule` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `storeId` INTEGER NULL,
    `userId` INTEGER NULL,
    `shiftTemplateId` INTEGER NULL,
    `workDate` DATETIME(3) NOT NULL,
    `note` VARCHAR(191) NULL,
    `createdBy` INTEGER NULL,
    `status` ENUM('ASSIGNED', 'CONFIRMED', 'ABSENT', 'CANCELED') NOT NULL DEFAULT 'ASSIGNED',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `ShiftSchedule_workDate_idx`(`workDate`),
    INDEX `ShiftSchedule_userId_idx`(`userId`),
    INDEX `ShiftSchedule_storeId_idx`(`storeId`),
    UNIQUE INDEX `ShiftSchedule_userId_workDate_shiftTemplateId_key`(`userId`, `workDate`, `shiftTemplateId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ShiftAttendance` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `shiftScheduleId` INTEGER NOT NULL,
    `checkInAt` DATETIME(3) NULL,
    `checkOutAt` DATETIME(3) NULL,
    `status` ENUM('PRESENT', 'LATE', 'ABSENT', 'LEAVE') NOT NULL DEFAULT 'PRESENT',
    `note` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `ShiftAttendance_shiftScheduleId_idx`(`shiftScheduleId`),
    UNIQUE INDEX `ShiftAttendance_shiftScheduleId_key`(`shiftScheduleId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ShiftSwap` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fromUserId` INTEGER NOT NULL,
    `toUserId` INTEGER NOT NULL,
    `shiftScheduleId` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `ShiftSwap_fromUserId_idx`(`fromUserId`),
    INDEX `ShiftSwap_toUserId_idx`(`toUserId`),
    INDEX `ShiftSwap_shiftScheduleId_idx`(`shiftScheduleId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Order_shiftId_idx` ON `Order`(`shiftId`);

-- CreateIndex
CREATE UNIQUE INDEX `Shift_shiftScheduleId_key` ON `Shift`(`shiftScheduleId`);

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_shiftId_fkey` FOREIGN KEY (`shiftId`) REFERENCES `Shift`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ShiftTemplate` ADD CONSTRAINT `ShiftTemplate_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Store`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ShiftSchedule` ADD CONSTRAINT `ShiftSchedule_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Store`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ShiftSchedule` ADD CONSTRAINT `ShiftSchedule_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ShiftSchedule` ADD CONSTRAINT `ShiftSchedule_shiftTemplateId_fkey` FOREIGN KEY (`shiftTemplateId`) REFERENCES `ShiftTemplate`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ShiftAttendance` ADD CONSTRAINT `ShiftAttendance_shiftScheduleId_fkey` FOREIGN KEY (`shiftScheduleId`) REFERENCES `ShiftSchedule`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ShiftSwap` ADD CONSTRAINT `ShiftSwap_fromUserId_fkey` FOREIGN KEY (`fromUserId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ShiftSwap` ADD CONSTRAINT `ShiftSwap_toUserId_fkey` FOREIGN KEY (`toUserId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ShiftSwap` ADD CONSTRAINT `ShiftSwap_shiftScheduleId_fkey` FOREIGN KEY (`shiftScheduleId`) REFERENCES `ShiftSchedule`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Shift` ADD CONSTRAINT `Shift_shiftScheduleId_fkey` FOREIGN KEY (`shiftScheduleId`) REFERENCES `ShiftSchedule`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
