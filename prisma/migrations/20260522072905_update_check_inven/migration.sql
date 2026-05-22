-- CreateTable
CREATE TABLE `InventoryCheck` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `storeId` INTEGER NULL,
    `userId` INTEGER NULL,
    `code` VARCHAR(191) NOT NULL,
    `note` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'DONE',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `InventoryCheck_code_key`(`code`),
    INDEX `InventoryCheck_storeId_idx`(`storeId`),
    INDEX `InventoryCheck_userId_idx`(`userId`),
    INDEX `InventoryCheck_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InventoryCheckItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `checkId` INTEGER NOT NULL,
    `inventoryId` INTEGER NOT NULL,
    `systemQuantity` DOUBLE NOT NULL DEFAULT 0,
    `actualQuantity` DOUBLE NOT NULL DEFAULT 0,
    `difference` DOUBLE NOT NULL DEFAULT 0,
    `note` VARCHAR(191) NULL,

    INDEX `InventoryCheckItem_checkId_idx`(`checkId`),
    INDEX `InventoryCheckItem_inventoryId_idx`(`inventoryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `InventoryCheck` ADD CONSTRAINT `InventoryCheck_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Store`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InventoryCheck` ADD CONSTRAINT `InventoryCheck_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InventoryCheckItem` ADD CONSTRAINT `InventoryCheckItem_checkId_fkey` FOREIGN KEY (`checkId`) REFERENCES `InventoryCheck`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InventoryCheckItem` ADD CONSTRAINT `InventoryCheckItem_inventoryId_fkey` FOREIGN KEY (`inventoryId`) REFERENCES `Inventory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
