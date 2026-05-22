-- CreateTable
CREATE TABLE `InventoryAdjust` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `storeId` INTEGER NULL,
    `userId` INTEGER NULL,
    `code` VARCHAR(191) NOT NULL,
    `note` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'DONE',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `InventoryAdjust_code_key`(`code`),
    INDEX `InventoryAdjust_storeId_idx`(`storeId`),
    INDEX `InventoryAdjust_userId_idx`(`userId`),
    INDEX `InventoryAdjust_createdAt_idx`(`createdAt`),
    INDEX `InventoryAdjust_status_idx`(`status`),
    INDEX `InventoryAdjust_storeId_createdAt_idx`(`storeId`, `createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InventoryAdjustItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `adjustId` INTEGER NOT NULL,
    `inventoryId` INTEGER NOT NULL,
    `systemQuantity` DOUBLE NOT NULL DEFAULT 0,
    `actualQuantity` DOUBLE NOT NULL DEFAULT 0,
    `difference` DOUBLE NOT NULL DEFAULT 0,
    `note` VARCHAR(191) NULL,

    INDEX `InventoryAdjustItem_adjustId_idx`(`adjustId`),
    INDEX `InventoryAdjustItem_inventoryId_idx`(`inventoryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `InventoryExport_storeId_idx` ON `InventoryExport`(`storeId`);

-- CreateIndex
CREATE INDEX `InventoryExport_userId_idx` ON `InventoryExport`(`userId`);

-- CreateIndex
CREATE INDEX `InventoryExport_createdAt_idx` ON `InventoryExport`(`createdAt`);

-- CreateIndex
CREATE INDEX `InventoryExport_status_idx` ON `InventoryExport`(`status`);

-- CreateIndex
CREATE INDEX `InventoryExport_storeId_createdAt_idx` ON `InventoryExport`(`storeId`, `createdAt`);

-- CreateIndex
CREATE INDEX `InventoryExportItem_inventoryId_idx` ON `InventoryExportItem`(`inventoryId`);

-- CreateIndex
CREATE INDEX `InventoryImport_storeId_idx` ON `InventoryImport`(`storeId`);

-- CreateIndex
CREATE INDEX `InventoryImport_userId_idx` ON `InventoryImport`(`userId`);

-- CreateIndex
CREATE INDEX `InventoryImport_createdAt_idx` ON `InventoryImport`(`createdAt`);

-- CreateIndex
CREATE INDEX `InventoryImport_status_idx` ON `InventoryImport`(`status`);

-- CreateIndex
CREATE INDEX `InventoryImport_storeId_createdAt_idx` ON `InventoryImport`(`storeId`, `createdAt`);

-- CreateIndex
CREATE INDEX `InventoryImportItem_inventoryId_idx` ON `InventoryImportItem`(`inventoryId`);

-- AddForeignKey
ALTER TABLE `InventoryImport` ADD CONSTRAINT `InventoryImport_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Store`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InventoryImport` ADD CONSTRAINT `InventoryImport_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InventoryImportItem` ADD CONSTRAINT `InventoryImportItem_inventoryId_fkey` FOREIGN KEY (`inventoryId`) REFERENCES `Inventory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InventoryExport` ADD CONSTRAINT `InventoryExport_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Store`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InventoryExport` ADD CONSTRAINT `InventoryExport_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InventoryExportItem` ADD CONSTRAINT `InventoryExportItem_inventoryId_fkey` FOREIGN KEY (`inventoryId`) REFERENCES `Inventory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InventoryAdjust` ADD CONSTRAINT `InventoryAdjust_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Store`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InventoryAdjust` ADD CONSTRAINT `InventoryAdjust_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InventoryAdjustItem` ADD CONSTRAINT `InventoryAdjustItem_adjustId_fkey` FOREIGN KEY (`adjustId`) REFERENCES `InventoryAdjust`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InventoryAdjustItem` ADD CONSTRAINT `InventoryAdjustItem_inventoryId_fkey` FOREIGN KEY (`inventoryId`) REFERENCES `Inventory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `inventoryexportitem` RENAME INDEX `InventoryExportItem_exportId_fkey` TO `InventoryExportItem_exportId_idx`;

-- RenameIndex
ALTER TABLE `inventoryimportitem` RENAME INDEX `InventoryImportItem_importId_fkey` TO `InventoryImportItem_importId_idx`;
