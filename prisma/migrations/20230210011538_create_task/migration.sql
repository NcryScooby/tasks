-- AlterTable
ALTER TABLE `tasks` ALTER COLUMN `important` DROP DEFAULT,
    ALTER COLUMN `completed` DROP DEFAULT,
    MODIFY `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);