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

-- Dumping structure for table wms.products
CREATE TABLE IF NOT EXISTS `products` (
  `id` varchar(10) NOT NULL,
  `lang` varchar(3) NOT NULL,
  `product_name` varchar(100) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `is_composite` tinyint(1) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `productCategoryId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`,`lang`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table wms.products: ~0 rows (approximately)
INSERT INTO `products` (`id`, `lang`, `product_name`, `description`, `price`, `stock`, `is_composite`, `image`, `createdAt`, `updatedAt`, `category_id`, `productCategoryId`) VALUES
	('BF00001', 'vi', 'Bàn Phím Cơ', NULL, NULL, NULL, NULL, NULL, '2024-01-14 15:34:49', '2024-01-14 15:34:50', 1, 1),
	('CPU0001', 'vi', 'Core i3 10000', NULL, NULL, NULL, NULL, NULL, '2024-01-14 15:34:49', '2024-01-14 15:34:50', 3, 3);

-- Dumping structure for table wms.product_categories
CREATE TABLE IF NOT EXISTS `product_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lang` varchar(3) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `fatherId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`,`lang`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- Dumping data for table wms.product_categories: ~0 rows (approximately)
INSERT INTO `product_categories` (`id`, `lang`, `name`, `description`, `createdAt`, `updatedAt`, `fatherId`) VALUES
	(1, 'vi', 'Bàn phím', NULL, '2024-01-14 14:56:31', '2024-01-14 14:56:31', 0),
	(2, 'vi', 'Chuột', NULL, '2024-01-14 14:56:31', '2024-01-14 14:56:31', 0),
	(3, 'vi', 'CPU', NULL, '2024-01-14 14:56:31', '2024-01-14 14:56:31', 0),
	(4, 'vi', 'Màn hình', NULL, '2024-01-14 14:56:31', '2024-01-14 14:56:31', 0),
	(5, 'vi', 'RAM', NULL, '2024-01-14 14:56:31', '2024-01-14 14:56:31', 0),
	(6, 'vi', 'SSD', NULL, '2024-01-14 14:56:31', '2024-01-14 14:56:31', 0),
	(7, 'vi', 'HDD', NULL, '2024-01-14 14:56:31', '2024-01-14 14:56:31', 0),
	(8, 'vi', 'AVG', NULL, '2024-01-14 14:56:31', '2024-01-14 14:56:31', 0);

-- Dumping structure for table wms.tmt140_qualities
CREATE TABLE IF NOT EXISTS `tmt140_qualities` (
  `QTYCD` varchar(2) NOT NULL,
  `QTYNM` varchar(50) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`QTYCD`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table wms.tmt140_qualities: ~0 rows (approximately)
INSERT INTO `tmt140_qualities` (`QTYCD`, `QTYNM`, `createdAt`, `updatedAt`) VALUES
	('01', 'Sản phẩm mới', '2024-01-14 15:59:59', '2024-01-14 16:00:00'),
	('02', 'Sản phẩm củ', '2024-01-14 16:00:19', '2024-01-14 16:00:20'),
	('03', 'Qua sử dụng', '2024-01-14 16:00:19', '2024-01-14 16:00:20');

-- Dumping structure for table wms.tmt170_delimthds
CREATE TABLE IF NOT EXISTS `tmt170_delimthds` (
  `DELIMTHCD` varchar(4) NOT NULL,
  `DELIMTHNM` varchar(80) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`DELIMTHCD`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table wms.tmt170_delimthds: ~0 rows (approximately)
INSERT INTO `tmt170_delimthds` (`DELIMTHCD`, `DELIMTHNM`, `createdAt`, `updatedAt`) VALUES
	('0001', 'Nhân viên giao hàng', '2024-01-14 14:48:31', '2024-01-14 14:48:32'),
	('0002', 'Giao hàng tiết kiệm', '2024-01-14 14:49:11', '2024-01-14 14:49:12'),
	('0003', 'Giao hàng nhanh', '2024-01-14 14:49:30', '2024-01-14 14:49:30');

-- Dumping structure for table wms.tmt171_paymethds
CREATE TABLE IF NOT EXISTS `tmt171_paymethds` (
  `PAYMETHDCD` varchar(4) NOT NULL,
  `PAYMETHDNM` varchar(80) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`PAYMETHDCD`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table wms.tmt171_paymethds: ~0 rows (approximately)
INSERT INTO `tmt171_paymethds` (`PAYMETHDCD`, `PAYMETHDNM`, `createdAt`, `updatedAt`) VALUES
	('01', 'Qua thẻ', '2024-01-14 14:49:47', '2024-01-14 14:49:48'),
	('02', 'Tiền mặt', '2024-01-14 14:49:47', '2024-01-14 14:49:48'),
	('03', 'Khi nhận hàng', '2024-01-14 14:50:13', '2024-01-14 14:50:13');

-- Dumping structure for table wms.tst010_stcks
CREATE TABLE IF NOT EXISTS `tst010_stcks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `SERIALNUM` varchar(16) DEFAULT NULL,
  `PURPIRCE` double DEFAULT NULL,
  `SELLPIRCE` double DEFAULT NULL,
  `ALLWQTY` int(11) DEFAULT NULL,
  `STCKQTY` int(11) DEFAULT NULL,
  `RECEIVEDATE` datetime DEFAULT NULL,
  `LIMITDATE` datetime DEFAULT NULL,
  `IMAGE` varchar(100) DEFAULT NULL,
  `DESCRIPTION` varchar(400) DEFAULT NULL,
  `STATUS` varchar(1) DEFAULT NULL,
  `STRRSRV1` varchar(256) DEFAULT NULL,
  `STRRSRV2` varchar(256) DEFAULT NULL,
  `STRRSRV3` varchar(256) DEFAULT NULL,
  `STRRSRV4` varchar(256) DEFAULT NULL,
  `STRRSRV5` varchar(256) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `productId` varchar(10) DEFAULT NULL,
  `BRNCHCD` varchar(10) DEFAULT NULL,
  `tmt120BranchBrnchcd` varchar(10) DEFAULT NULL,
  `SUPPLYCD` int(11) DEFAULT NULL,
  `sysUserId` int(11) DEFAULT NULL,
  `MANUFACTTURECD` int(11) DEFAULT NULL,
  `EMPLOYEECD` int(11) DEFAULT NULL,
  `LCTNCD` varchar(20) DEFAULT NULL,
  `tmt130LcntLCTNCD` varchar(20) DEFAULT NULL,
  `PRODUCTCD` varchar(10) DEFAULT NULL,
  `QTYCD` varchar(2) DEFAULT NULL,
  `tmt140QualityQTYCD` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `BRNCHCD` (`BRNCHCD`),
  KEY `tmt120BranchBrnchcd` (`tmt120BranchBrnchcd`),
  KEY `SUPPLYCD` (`SUPPLYCD`),
  KEY `sysUserId` (`sysUserId`),
  KEY `MANUFACTTURECD` (`MANUFACTTURECD`),
  KEY `EMPLOYEECD` (`EMPLOYEECD`),
  KEY `LCTNCD` (`LCTNCD`),
  KEY `tmt130LcntLCTNCD` (`tmt130LcntLCTNCD`),
  KEY `QTYCD` (`QTYCD`),
  KEY `tmt140QualityQTYCD` (`tmt140QualityQTYCD`),
  CONSTRAINT `tst010_stcks_QTYCD_foreign_idx` FOREIGN KEY (`QTYCD`) REFERENCES `tmt140_qualities` (`qtycd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_100` FOREIGN KEY (`tmt130LcntLCTNCD`) REFERENCES `tmt130_lcnts` (`lctncd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_101` FOREIGN KEY (`QTYCD`) REFERENCES `tmt140_qualities` (`qtycd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_102` FOREIGN KEY (`tmt140QualityQTYCD`) REFERENCES `tmt140_qualities` (`qtycd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_109` FOREIGN KEY (`LCTNCD`) REFERENCES `tmt130_lcnts` (`lctncd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_110` FOREIGN KEY (`tmt130LcntLCTNCD`) REFERENCES `tmt130_lcnts` (`lctncd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_111` FOREIGN KEY (`QTYCD`) REFERENCES `tmt140_qualities` (`qtycd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_112` FOREIGN KEY (`tmt140QualityQTYCD`) REFERENCES `tmt140_qualities` (`qtycd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_119` FOREIGN KEY (`LCTNCD`) REFERENCES `tmt130_lcnts` (`lctncd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_120` FOREIGN KEY (`tmt130LcntLCTNCD`) REFERENCES `tmt130_lcnts` (`lctncd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_121` FOREIGN KEY (`QTYCD`) REFERENCES `tmt140_qualities` (`qtycd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_122` FOREIGN KEY (`tmt140QualityQTYCD`) REFERENCES `tmt140_qualities` (`qtycd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_129` FOREIGN KEY (`LCTNCD`) REFERENCES `tmt130_lcnts` (`lctncd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_130` FOREIGN KEY (`tmt130LcntLCTNCD`) REFERENCES `tmt130_lcnts` (`lctncd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_131` FOREIGN KEY (`QTYCD`) REFERENCES `tmt140_qualities` (`qtycd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_132` FOREIGN KEY (`tmt140QualityQTYCD`) REFERENCES `tmt140_qualities` (`qtycd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_139` FOREIGN KEY (`LCTNCD`) REFERENCES `tmt130_lcnts` (`lctncd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_140` FOREIGN KEY (`tmt130LcntLCTNCD`) REFERENCES `tmt130_lcnts` (`lctncd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_141` FOREIGN KEY (`QTYCD`) REFERENCES `tmt140_qualities` (`qtycd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_142` FOREIGN KEY (`tmt140QualityQTYCD`) REFERENCES `tmt140_qualities` (`qtycd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_149` FOREIGN KEY (`LCTNCD`) REFERENCES `tmt130_lcnts` (`lctncd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_15` FOREIGN KEY (`LCTNCD`) REFERENCES `tmt130_lcnts` (`lctncd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_150` FOREIGN KEY (`tmt130LcntLCTNCD`) REFERENCES `tmt130_lcnts` (`lctncd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_151` FOREIGN KEY (`QTYCD`) REFERENCES `tmt140_qualities` (`qtycd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_152` FOREIGN KEY (`tmt140QualityQTYCD`) REFERENCES `tmt140_qualities` (`qtycd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_159` FOREIGN KEY (`LCTNCD`) REFERENCES `tmt130_lcnts` (`lctncd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_16` FOREIGN KEY (`tmt130LcntLCTNCD`) REFERENCES `tmt130_lcnts` (`lctncd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_160` FOREIGN KEY (`tmt130LcntLCTNCD`) REFERENCES `tmt130_lcnts` (`lctncd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_161` FOREIGN KEY (`QTYCD`) REFERENCES `tmt140_qualities` (`qtycd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_162` FOREIGN KEY (`tmt140QualityQTYCD`) REFERENCES `tmt140_qualities` (`qtycd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_169` FOREIGN KEY (`LCTNCD`) REFERENCES `tmt130_lcnts` (`lctncd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_170` FOREIGN KEY (`tmt130LcntLCTNCD`) REFERENCES `tmt130_lcnts` (`lctncd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_171` FOREIGN KEY (`QTYCD`) REFERENCES `tmt140_qualities` (`qtycd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_172` FOREIGN KEY (`tmt140QualityQTYCD`) REFERENCES `tmt140_qualities` (`qtycd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_179` FOREIGN KEY (`LCTNCD`) REFERENCES `tmt130_lcnts` (`lctncd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_180` FOREIGN KEY (`tmt130LcntLCTNCD`) REFERENCES `tmt130_lcnts` (`lctncd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_181` FOREIGN KEY (`QTYCD`) REFERENCES `tmt140_qualities` (`qtycd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_182` FOREIGN KEY (`tmt140QualityQTYCD`) REFERENCES `tmt140_qualities` (`qtycd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_189` FOREIGN KEY (`LCTNCD`) REFERENCES `tmt130_lcnts` (`lctncd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_190` FOREIGN KEY (`tmt130LcntLCTNCD`) REFERENCES `tmt130_lcnts` (`lctncd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_191` FOREIGN KEY (`QTYCD`) REFERENCES `tmt140_qualities` (`qtycd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_192` FOREIGN KEY (`tmt140QualityQTYCD`) REFERENCES `tmt140_qualities` (`qtycd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_199` FOREIGN KEY (`LCTNCD`) REFERENCES `tmt130_lcnts` (`lctncd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_200` FOREIGN KEY (`tmt130LcntLCTNCD`) REFERENCES `tmt130_lcnts` (`lctncd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_201` FOREIGN KEY (`QTYCD`) REFERENCES `tmt140_qualities` (`qtycd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_202` FOREIGN KEY (`tmt140QualityQTYCD`) REFERENCES `tmt140_qualities` (`qtycd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_209` FOREIGN KEY (`LCTNCD`) REFERENCES `tmt130_lcnts` (`lctncd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_210` FOREIGN KEY (`tmt130LcntLCTNCD`) REFERENCES `tmt130_lcnts` (`lctncd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_211` FOREIGN KEY (`QTYCD`) REFERENCES `tmt140_qualities` (`qtycd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_212` FOREIGN KEY (`tmt140QualityQTYCD`) REFERENCES `tmt140_qualities` (`qtycd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_219` FOREIGN KEY (`LCTNCD`) REFERENCES `tmt130_lcnts` (`lctncd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_220` FOREIGN KEY (`tmt130LcntLCTNCD`) REFERENCES `tmt130_lcnts` (`lctncd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_221` FOREIGN KEY (`QTYCD`) REFERENCES `tmt140_qualities` (`qtycd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_222` FOREIGN KEY (`tmt140QualityQTYCD`) REFERENCES `tmt140_qualities` (`qtycd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_229` FOREIGN KEY (`LCTNCD`) REFERENCES `tmt130_lcnts` (`lctncd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_23` FOREIGN KEY (`LCTNCD`) REFERENCES `tmt130_lcnts` (`lctncd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_230` FOREIGN KEY (`tmt130LcntLCTNCD`) REFERENCES `tmt130_lcnts` (`lctncd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_231` FOREIGN KEY (`QTYCD`) REFERENCES `tmt140_qualities` (`qtycd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_232` FOREIGN KEY (`tmt140QualityQTYCD`) REFERENCES `tmt140_qualities` (`qtycd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_239` FOREIGN KEY (`LCTNCD`) REFERENCES `tmt130_lcnts` (`lctncd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_24` FOREIGN KEY (`tmt130LcntLCTNCD`) REFERENCES `tmt130_lcnts` (`lctncd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_240` FOREIGN KEY (`tmt130LcntLCTNCD`) REFERENCES `tmt130_lcnts` (`lctncd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_241` FOREIGN KEY (`QTYCD`) REFERENCES `tmt140_qualities` (`qtycd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_242` FOREIGN KEY (`tmt140QualityQTYCD`) REFERENCES `tmt140_qualities` (`qtycd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_249` FOREIGN KEY (`LCTNCD`) REFERENCES `tmt130_lcnts` (`lctncd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_250` FOREIGN KEY (`tmt130LcntLCTNCD`) REFERENCES `tmt130_lcnts` (`lctncd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_251` FOREIGN KEY (`QTYCD`) REFERENCES `tmt140_qualities` (`qtycd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_252` FOREIGN KEY (`tmt140QualityQTYCD`) REFERENCES `tmt140_qualities` (`qtycd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_259` FOREIGN KEY (`LCTNCD`) REFERENCES `tmt130_lcnts` (`lctncd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_260` FOREIGN KEY (`tmt130LcntLCTNCD`) REFERENCES `tmt130_lcnts` (`lctncd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_261` FOREIGN KEY (`QTYCD`) REFERENCES `tmt140_qualities` (`qtycd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_262` FOREIGN KEY (`tmt140QualityQTYCD`) REFERENCES `tmt140_qualities` (`qtycd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_269` FOREIGN KEY (`LCTNCD`) REFERENCES `tmt130_lcnts` (`lctncd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_270` FOREIGN KEY (`tmt130LcntLCTNCD`) REFERENCES `tmt130_lcnts` (`lctncd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_271` FOREIGN KEY (`QTYCD`) REFERENCES `tmt140_qualities` (`qtycd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_272` FOREIGN KEY (`tmt140QualityQTYCD`) REFERENCES `tmt140_qualities` (`qtycd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_273` FOREIGN KEY (`BRNCHCD`) REFERENCES `tmt120_branches` (`brnchcd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_274` FOREIGN KEY (`tmt120BranchBrnchcd`) REFERENCES `tmt120_branches` (`brnchcd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_275` FOREIGN KEY (`SUPPLYCD`) REFERENCES `sys_users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_276` FOREIGN KEY (`sysUserId`) REFERENCES `sys_users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_277` FOREIGN KEY (`MANUFACTTURECD`) REFERENCES `sys_users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_278` FOREIGN KEY (`EMPLOYEECD`) REFERENCES `sys_users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_279` FOREIGN KEY (`LCTNCD`) REFERENCES `tmt130_lcnts` (`lctncd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_280` FOREIGN KEY (`tmt130LcntLCTNCD`) REFERENCES `tmt130_lcnts` (`lctncd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_281` FOREIGN KEY (`QTYCD`) REFERENCES `tmt140_qualities` (`qtycd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_282` FOREIGN KEY (`tmt140QualityQTYCD`) REFERENCES `tmt140_qualities` (`qtycd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_31` FOREIGN KEY (`LCTNCD`) REFERENCES `tmt130_lcnts` (`lctncd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_32` FOREIGN KEY (`tmt130LcntLCTNCD`) REFERENCES `tmt130_lcnts` (`lctncd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_39` FOREIGN KEY (`LCTNCD`) REFERENCES `tmt130_lcnts` (`lctncd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_40` FOREIGN KEY (`tmt130LcntLCTNCD`) REFERENCES `tmt130_lcnts` (`lctncd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_41` FOREIGN KEY (`QTYCD`) REFERENCES `tmt140_qualities` (`qtycd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_42` FOREIGN KEY (`tmt140QualityQTYCD`) REFERENCES `tmt140_qualities` (`qtycd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_49` FOREIGN KEY (`LCTNCD`) REFERENCES `tmt130_lcnts` (`lctncd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_50` FOREIGN KEY (`tmt130LcntLCTNCD`) REFERENCES `tmt130_lcnts` (`lctncd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_51` FOREIGN KEY (`QTYCD`) REFERENCES `tmt140_qualities` (`qtycd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_52` FOREIGN KEY (`tmt140QualityQTYCD`) REFERENCES `tmt140_qualities` (`qtycd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_59` FOREIGN KEY (`LCTNCD`) REFERENCES `tmt130_lcnts` (`lctncd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_60` FOREIGN KEY (`tmt130LcntLCTNCD`) REFERENCES `tmt130_lcnts` (`lctncd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_61` FOREIGN KEY (`QTYCD`) REFERENCES `tmt140_qualities` (`qtycd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_62` FOREIGN KEY (`tmt140QualityQTYCD`) REFERENCES `tmt140_qualities` (`qtycd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_69` FOREIGN KEY (`LCTNCD`) REFERENCES `tmt130_lcnts` (`lctncd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_7` FOREIGN KEY (`LCTNCD`) REFERENCES `tmt130_lcnts` (`lctncd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_70` FOREIGN KEY (`tmt130LcntLCTNCD`) REFERENCES `tmt130_lcnts` (`lctncd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_71` FOREIGN KEY (`QTYCD`) REFERENCES `tmt140_qualities` (`qtycd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_72` FOREIGN KEY (`tmt140QualityQTYCD`) REFERENCES `tmt140_qualities` (`qtycd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_79` FOREIGN KEY (`LCTNCD`) REFERENCES `tmt130_lcnts` (`lctncd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_8` FOREIGN KEY (`tmt130LcntLCTNCD`) REFERENCES `tmt130_lcnts` (`lctncd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_80` FOREIGN KEY (`tmt130LcntLCTNCD`) REFERENCES `tmt130_lcnts` (`lctncd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_81` FOREIGN KEY (`QTYCD`) REFERENCES `tmt140_qualities` (`qtycd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_82` FOREIGN KEY (`tmt140QualityQTYCD`) REFERENCES `tmt140_qualities` (`qtycd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_89` FOREIGN KEY (`LCTNCD`) REFERENCES `tmt130_lcnts` (`lctncd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_90` FOREIGN KEY (`tmt130LcntLCTNCD`) REFERENCES `tmt130_lcnts` (`lctncd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_91` FOREIGN KEY (`QTYCD`) REFERENCES `tmt140_qualities` (`qtycd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_92` FOREIGN KEY (`tmt140QualityQTYCD`) REFERENCES `tmt140_qualities` (`qtycd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_99` FOREIGN KEY (`LCTNCD`) REFERENCES `tmt130_lcnts` (`lctncd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_tmt140QualityQTYCD_foreign_idx` FOREIGN KEY (`tmt140QualityQTYCD`) REFERENCES `tmt140_qualities` (`qtycd`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- Dumping data for table wms.tst010_stcks: ~0 rows (approximately)
INSERT INTO `tst010_stcks` (`id`, `SERIALNUM`, `PURPIRCE`, `SELLPIRCE`, `ALLWQTY`, `STCKQTY`, `RECEIVEDATE`, `LIMITDATE`, `IMAGE`, `DESCRIPTION`, `STATUS`, `STRRSRV1`, `STRRSRV2`, `STRRSRV3`, `STRRSRV4`, `STRRSRV5`, `createdAt`, `updatedAt`, `productId`, `BRNCHCD`, `tmt120BranchBrnchcd`, `SUPPLYCD`, `sysUserId`, `MANUFACTTURECD`, `EMPLOYEECD`, `LCTNCD`, `tmt130LcntLCTNCD`, `PRODUCTCD`, `QTYCD`, `tmt140QualityQTYCD`) VALUES
	(1, 'SR140124000001', 120000, 300000, 1, 1, '2024-01-14 14:53:29', '2026-01-14 14:53:31', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, '2024-01-14 14:54:25', '2024-01-14 14:54:26', 'BF00001', '001', '001', 18, 18, 8, 1, 'AAA-BBB-CCC', 'AAA-BBB-CCC', 'BF00001', '01', '01'),
	(2, 'SR140124000002', 120000, 300000, 1, 1, '2024-01-14 14:53:29', '2026-01-14 14:53:31', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, '2024-01-14 14:54:25', '2024-01-14 14:54:26', 'BF00001', '001', '001', 18, 18, 8, 1, 'AAA-BBB-CCC', 'AAA-BBB-CCC', 'BF00001', '01', '01'),
	(3, 'SR140124000003', 120000, 300000, 1, 1, '2024-01-14 14:53:29', '2026-01-14 14:53:31', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, '2024-01-14 14:54:25', '2024-01-14 14:54:26', 'BF00001', '001', '001', 18, 18, 8, 1, 'AAA-BBB-CCC', 'AAA-BBB-CCC', 'BF00001', '01', '01'),
	(4, 'SR140124000004', 1000000, 2000000, 1, 1, '2024-01-14 14:53:29', '2026-01-14 14:53:31', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, '2024-01-14 14:54:25', '2024-01-14 14:54:26', 'CPU0001', '001', '001', 18, 18, 8, 1, 'AAA-BBB-DDD', 'AAA-BBB-DDD', 'CPU0001', '01', '01'),
	(5, 'SR140124000005', 1000000, 2000000, 1, 1, '2024-01-14 14:53:29', '2026-01-14 14:53:31', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, '2024-01-14 14:54:25', '2024-01-14 14:54:26', 'CPU0001', '001', '001', 18, 18, 8, 1, 'AAA-BBB-DDD', 'AAA-BBB-DDD', 'CPU0001', '01', '01'),
	(6, 'SR140124000006', 600000, 1000000, 1, 1, '2024-01-14 14:53:29', '2026-01-14 14:53:31', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, '2024-01-14 14:54:25', '2024-01-14 14:54:26', 'CPU0001', '001', '001', 18, 18, 8, 1, 'AAA-BBB-DDD', 'AAA-BBB-DDD', 'CPU0001', '02', '02');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
