-- CreateTable
CREATE TABLE `InventoryImport` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `storeId` INTEGER NULL,
    `userId` INTEGER NULL,
    `code` VARCHAR(191) NOT NULL,
    `note` VARCHAR(191) NULL,
    `totalCost` INTEGER NOT NULL DEFAULT 0,
    `status` VARCHAR(191) NOT NULL DEFAULT 'DONE',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `InventoryImport_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InventoryImportItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `importId` INTEGER NOT NULL,
    `inventoryId` INTEGER NOT NULL,
    `quantity` DOUBLE NOT NULL,
    `unitPrice` INTEGER NOT NULL DEFAULT 0,
    `totalPrice` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `InventoryImportItem` ADD CONSTRAINT `InventoryImportItem_importId_fkey` FOREIGN KEY (`importId`) REFERENCES `InventoryImport`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
