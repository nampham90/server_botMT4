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

-- Dumping structure for table wms.tmt130_lcnts
CREATE TABLE IF NOT EXISTS `tmt130_lcnts` (
  `LCTNCD` varchar(20) NOT NULL,
  `DESCRIPTION` varchar(255) DEFAULT NULL,
  `AREA` varchar(10) DEFAULT NULL,
  `FLOOR` varchar(10) DEFAULT NULL,
  `ROW` int(11) DEFAULT NULL,
  `COLUNM` int(11) DEFAULT NULL,
  `STATUS` varchar(1) DEFAULT NULL,
  `CAPACITY` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `BRNCHCD` varchar(10) DEFAULT NULL,
  `tmt120BranchBrnchcd` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`LCTNCD`),
  KEY `BRNCHCD` (`BRNCHCD`),
  KEY `tmt120BranchBrnchcd` (`tmt120BranchBrnchcd`),
  CONSTRAINT `tmt130_lcnts_ibfk_1` FOREIGN KEY (`BRNCHCD`) REFERENCES `tmt120_branches` (`brnchcd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tmt130_lcnts_ibfk_2` FOREIGN KEY (`tmt120BranchBrnchcd`) REFERENCES `tmt120_branches` (`brnchcd`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table wms.tmt130_lcnts: ~0 rows (approximately)
INSERT INTO `tmt130_lcnts` (`LCTNCD`, `DESCRIPTION`, `AREA`, `FLOOR`, `ROW`, `COLUNM`, `STATUS`, `CAPACITY`, `createdAt`, `updatedAt`, `BRNCHCD`, `tmt120BranchBrnchcd`) VALUES
	('AAA-BBB-CCC', NULL, 'Khu A', 'Tầng 1', 2, 3, '0', 10, '2024-01-14 14:46:54', '2024-01-14 14:46:55', '001', '001'),
	('AAA-BBB-DDD', NULL, 'Khu A', 'Tầng 1', 2, 3, '0', 10, '2024-01-14 14:46:54', '2024-01-14 14:46:55', '001', '001');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
