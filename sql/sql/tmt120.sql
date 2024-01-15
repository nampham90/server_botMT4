-- --------------------------------------------------------
-- Host:                         localhost
-- Server version:               8.0.13 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.0.0.6468
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for wms
CREATE DATABASE IF NOT EXISTS `wms` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `wms`;

-- Dumping structure for table wms.tmt120_branches
CREATE TABLE IF NOT EXISTS `tmt120_branches` (
  `brnchcd` varchar(10) NOT NULL,
  `branch_name` varchar(100) DEFAULT NULL,
  `branch_description` varchar(255) DEFAULT NULL,
  `branch_zip` varchar(8) DEFAULT NULL,
  `branch_address1` varchar(100) DEFAULT NULL,
  `branch_address2` varchar(100) DEFAULT NULL,
  `brnch_address3` varchar(100) DEFAULT NULL,
  `brnch_tel` varchar(14) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`brnchcd`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table wms.tmt120_branches: ~2 rows (approximately)
INSERT INTO `tmt120_branches` (`brnchcd`, `branch_name`, `branch_description`, `branch_zip`, `branch_address1`, `branch_address2`, `brnch_address3`, `brnch_tel`, `createdAt`, `updatedAt`) VALUES
	('001', 'HIPC', NULL, '530000', '05 Lâm hoàn', NULL, NULL, '0901948123', '2024-01-14 14:44:32', '2024-01-14 14:44:32'),
	('002', 'NANP', NULL, '530000', '112 Lê Đại Hành', NULL, NULL, '0901948124', '2024-01-14 14:44:32', '2024-01-14 14:44:32');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
