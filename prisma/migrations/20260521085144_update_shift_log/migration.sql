/*
  Warnings:

  - You are about to drop the `shiftattendance` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `shiftattendance` DROP FOREIGN KEY `ShiftAttendance_shiftScheduleId_fkey`;

-- DropTable
DROP TABLE `shiftattendance`;

-- CreateTable
CREATE TABLE `ShiftAttendanceLog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `shiftScheduleId` INTEGER NOT NULL,
    `userId` INTEGER NULL,
    `type` ENUM('CHECK_IN', 'CHECK_OUT', 'BREAK_START', 'BREAK_END') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `note` VARCHAR(191) NULL,

    INDEX `ShiftAttendanceLog_shiftScheduleId_idx`(`shiftScheduleId`),
    INDEX `ShiftAttendanceLog_userId_idx`(`userId`),
    INDEX `ShiftAttendanceLog_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ShiftAttendanceLog` ADD CONSTRAINT `ShiftAttendanceLog_shiftScheduleId_fkey` FOREIGN KEY (`shiftScheduleId`) REFERENCES `ShiftSchedule`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ShiftAttendanceLog` ADD CONSTRAINT `ShiftAttendanceLog_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
