-- CreateTable
CREATE TABLE `CashTransaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `storeId` INTEGER NULL,
    `shiftId` INTEGER NULL,
    `userId` INTEGER NULL,
    `type` ENUM('IN', 'OUT') NOT NULL,
    `amount` INTEGER NOT NULL DEFAULT 0,
    `category` ENUM('OPENING', 'ADD_CASH', 'BUY_ICE', 'BUY_SUPPLIES', 'SALARY_ADVANCE', 'REFUND', 'OTHER') NOT NULL,
    `reason` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `shiftSwapId` INTEGER NULL,

    INDEX `CashTransaction_storeId_idx`(`storeId`),
    INDEX `CashTransaction_shiftId_idx`(`shiftId`),
    INDEX `CashTransaction_userId_idx`(`userId`),
    INDEX `CashTransaction_type_idx`(`type`),
    INDEX `CashTransaction_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CashTransaction` ADD CONSTRAINT `CashTransaction_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Store`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CashTransaction` ADD CONSTRAINT `CashTransaction_shiftId_fkey` FOREIGN KEY (`shiftId`) REFERENCES `Shift`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CashTransaction` ADD CONSTRAINT `CashTransaction_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CashTransaction` ADD CONSTRAINT `CashTransaction_shiftSwapId_fkey` FOREIGN KEY (`shiftSwapId`) REFERENCES `ShiftSwap`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
