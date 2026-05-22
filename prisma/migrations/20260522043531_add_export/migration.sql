-- CreateTable
CREATE TABLE `InventoryExport` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `storeId` INTEGER NULL,
    `userId` INTEGER NULL,
    `code` VARCHAR(191) NOT NULL,
    `note` VARCHAR(191) NULL,
    `totalCost` INTEGER NOT NULL DEFAULT 0,
    `status` VARCHAR(191) NOT NULL DEFAULT 'DONE',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `InventoryExport_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InventoryExportItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `exportId` INTEGER NOT NULL,
    `inventoryId` INTEGER NOT NULL,
    `quantity` DOUBLE NOT NULL,
    `unitCost` INTEGER NOT NULL DEFAULT 0,
    `totalCost` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `InventoryExportItem` ADD CONSTRAINT `InventoryExportItem_exportId_fkey` FOREIGN KEY (`exportId`) REFERENCES `InventoryExport`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
