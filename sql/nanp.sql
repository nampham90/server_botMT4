-- --------------------------------------------------------
-- Host:                         localhost
-- Server version:               8.1.0 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table nanp.products
CREATE TABLE IF NOT EXISTS `products` (
  `id` varchar(10) NOT NULL,
  `lang` varchar(3) NOT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `stock` int DEFAULT NULL,
  `is_composite` tinyint(1) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `category_id` int DEFAULT NULL,
  `productCategoryId` int DEFAULT NULL,
  PRIMARY KEY (`id`,`lang`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table nanp.products: ~17 rows (approximately)
INSERT INTO `products` (`id`, `lang`, `product_name`, `description`, `price`, `stock`, `is_composite`, `image`, `createdAt`, `updatedAt`, `category_id`, `productCategoryId`) VALUES
	('CPU001', 'vi', 'Intel G3900', NULL, NULL, NULL, NULL, NULL, '2024-01-14 15:34:49', '2024-01-14 15:34:50', 3, 3),
	('CPU002', 'vi', ' G4600', NULL, 0.00, 0, 0, NULL, '2023-12-18 15:14:51', '2023-12-18 15:14:52', 3, 3),
	('KB001', 'vi', 'Bàn phím cơ Asestek AK100', NULL, NULL, NULL, NULL, NULL, '2024-01-14 15:34:49', '2024-01-14 15:34:50', 1, 1),
	('KB002', 'vi', 'Bàn phím Dareu-U EK810 Black Blue swich ', '', 0.00, 0, 0, '', '2024-03-01 01:35:22', '2024-03-01 01:35:22', 1, 1),
	('KB003', 'vi', 'Bàn Phím Cơ Dareu EK810 Pink Led Pink,Blue switch', '', 0.00, 0, 0, '', '2024-03-01 01:36:12', '2024-03-01 01:36:12', 1, 1),
	('KB004', 'vi', 'Bàn Phím giả cơ Dareu Lk145 (Thu Văn Đại 10/6/2022)', '', 0.00, 0, 0, '', '2024-03-01 01:37:27', '2024-03-01 01:37:27', 1, 1),
	('KB005', 'vi', 'Bàn phím có dây Golden Field KG108', '', 0.00, 0, 0, '', '2024-03-01 01:37:45', '2024-03-01 01:37:45', 1, 1),
	('KB006', 'vi', 'Phím Giả cơ Meetion K9300 ', '', 0.00, 0, 0, '', '2024-03-01 01:37:58', '2024-03-01 01:37:58', 1, 1),
	('KB007', 'vi', 'Bàn phím Gnet KM1925 màu đen', '', 0.00, 0, 0, '', '2024-03-01 01:38:15', '2024-03-01 01:38:15', 1, 1),
	('KB008', 'vi', 'Bàn phím Gnet KM1925 màu trắng', '', 0.00, 0, 0, '', '2024-03-01 01:38:26', '2024-03-01 01:38:26', 1, 1),
	('KB009', 'vi', 'Bàn phím Dareu EK1280S V2 Blue Switch', '', 0.00, 0, 0, '', '2024-03-01 01:38:47', '2024-03-01 01:38:47', 1, 1),
	('KB010', 'vi', 'Bàn phím giả cơ Gnet GK311', '', 0.00, 0, 0, '', '2024-03-01 01:38:59', '2024-03-01 01:38:59', 1, 1),
	('KB011', 'vi', 'Bàn phím Dareu máy tính LK185', '', 0.00, 0, 0, '', '2024-03-01 01:39:14', '2024-03-01 01:39:14', 1, 1),
	('MT001', 'vi', 'Màn hình HKC 19.5 inch MB20S1 ', NULL, 0.00, 0, 0, NULL, '2023-12-18 14:56:33', '2023-12-18 14:56:34', 4, 4),
	('RAM001', 'vi', 'Ram MTASE 4GB DDR4 Buss 1600 có tản nhiệt xám ', '', 0.00, 0, 0, '', '2024-03-01 01:13:20', '2024-03-01 01:13:20', 5, 5),
	('RAM002', 'vi', 'Ram Kingston Hyperx Fury 4GB DDR4 bus 2666 có tản nhiệt đen', '', 0.00, 0, 0, '', '2024-03-01 01:19:28', '2024-03-01 01:19:28', 5, 5),
	('SSD001', 'vi', 'Ổ cứng SSD ADATA 480GB', NULL, 0.00, 0, 0, NULL, '2023-12-18 14:56:33', '2023-12-18 14:56:34', 6, 6),
	('SSD002', 'vi', 'Ổ cứng SSD Kingspec Sata II 240G', NULL, 0.00, 0, 0, NULL, '2023-12-18 14:56:33', '2023-12-18 14:56:34', 6, 6);

-- Dumping structure for table nanp.product_categories
CREATE TABLE IF NOT EXISTS `product_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `lang` varchar(3) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `fatherId` int DEFAULT NULL,
  `catid` varchar(3) DEFAULT NULL,
  PRIMARY KEY (`id`,`lang`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table nanp.product_categories: ~16 rows (approximately)
INSERT INTO `product_categories` (`id`, `lang`, `name`, `description`, `createdAt`, `updatedAt`, `fatherId`, `catid`) VALUES
	(1, 'vi', 'Bàn phím', NULL, '2024-01-14 14:56:31', '2024-01-14 14:56:31', 0, 'KB'),
	(2, 'vi', 'Chuột', NULL, '2024-01-14 14:56:31', '2024-01-14 14:56:31', 0, 'MO'),
	(3, 'vi', 'CPU', NULL, '2024-01-14 14:56:31', '2024-01-14 14:56:31', 0, 'CPU'),
	(4, 'vi', 'Màn hình', NULL, '2024-01-14 14:56:31', '2024-01-14 14:56:31', 0, 'MT'),
	(5, 'vi', 'RAM', NULL, '2024-01-14 14:56:31', '2024-01-14 14:56:31', 0, 'RAM'),
	(6, 'vi', 'SSD', NULL, '2024-01-14 14:56:31', '2024-01-14 14:56:31', 0, 'SSD'),
	(7, 'vi', 'HDD', NULL, '2024-01-14 14:56:31', '2024-01-14 14:56:31', 0, 'HDD'),
	(8, 'vi', 'VGA', NULL, '2024-01-14 14:56:31', '2024-01-14 14:56:31', 0, 'AVG'),
	(9, 'vi', 'Camera', NULL, '2024-01-14 14:56:31', '2024-01-14 14:56:31', 0, 'CAM'),
	(10, 'vi', 'Nguồn', NULL, '2024-01-14 14:56:31', '2024-01-14 14:56:31', 0, 'SO'),
	(11, 'vi', 'Loa và tai nghe', NULL, '2024-01-14 14:56:31', '2024-01-14 14:56:31', 0, 'EP'),
	(12, 'vi', 'Phụ kiện', NULL, '2024-01-14 14:56:31', '2024-01-14 14:56:31', 0, 'AS'),
	(13, 'vi', 'MAIN', NULL, '2024-01-14 14:56:31', '2024-01-14 14:56:31', 0, 'MA'),
	(15, 'vi', 'Bàn ghế', NULL, '2024-01-14 14:56:31', '2024-01-14 14:56:31', 0, 'FT'),
	(16, 'vi', 'Tản nhiệt', NULL, '2024-01-14 14:56:31', '2024-01-14 14:56:31', 0, 'FAN'),
	(17, 'vi', 'Case', NULL, '2024-01-14 14:56:31', '2024-01-14 14:56:31', 0, 'CA');

-- Dumping structure for table nanp.product_colors
CREATE TABLE IF NOT EXISTS `product_colors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `lang` varchar(3) NOT NULL,
  `color_name` varchar(100) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`,`lang`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table nanp.product_colors: ~2 rows (approximately)
INSERT INTO `product_colors` (`id`, `lang`, `color_name`, `createdAt`, `updatedAt`) VALUES
	(1, 'vi', 'Trắng', '2023-12-18 14:31:39', '2023-12-18 14:31:40'),
	(2, 'vi', 'Đen', '2023-12-18 14:31:59', '2023-12-18 14:32:00');

-- Dumping structure for table nanp.product_sizes
CREATE TABLE IF NOT EXISTS `product_sizes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `size_name` varchar(100) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table nanp.product_sizes: ~0 rows (approximately)

-- Dumping structure for table nanp.product_variations
CREATE TABLE IF NOT EXISTS `product_variations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `lang` varchar(3) NOT NULL,
  `variation_name` varchar(100) DEFAULT NULL,
  `variation_price` decimal(10,2) DEFAULT NULL,
  `variation_stock` int DEFAULT NULL,
  `variation_image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `product_id` varchar(10) DEFAULT NULL,
  `productId` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`,`lang`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table nanp.product_variations: ~0 rows (approximately)

-- Dumping structure for table nanp.role_menu
CREATE TABLE IF NOT EXISTS `role_menu` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `sysMenuId` varchar(36) NOT NULL,
  `sysRoleId` int NOT NULL,
  PRIMARY KEY (`sysMenuId`,`sysRoleId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table nanp.role_menu: ~162 rows (approximately)
INSERT INTO `role_menu` (`createdAt`, `updatedAt`, `sysMenuId`, `sysRoleId`) VALUES
	('2023-10-24 06:30:11', '2023-10-24 06:30:11', '632aaa31c8093b9a2007d144', 1),
	('2023-10-24 06:30:27', '2023-10-24 06:30:27', '632aaa31c8093b9a2007d144', 3),
	('2023-10-24 06:30:11', '2023-10-24 06:30:11', '632aaa31c8093b9a2007d145', 1),
	('2023-10-24 06:30:27', '2023-10-24 06:30:27', '632aaa31c8093b9a2007d145', 3),
	('2023-10-24 06:30:29', '2023-10-24 06:30:29', '632aaa31c8093b9a2007d145', 4),
	('2023-10-24 06:30:11', '2023-10-24 06:30:11', '632aaa31c8093b9a2007d148', 1),
	('2023-10-24 06:30:27', '2023-10-24 06:30:27', '632aaa31c8093b9a2007d148', 3),
	('2023-10-24 06:30:29', '2023-10-24 06:30:29', '632aaa31c8093b9a2007d148', 4),
	('2023-10-24 06:30:11', '2023-10-24 06:30:11', '632aaa31c8093b9a2007d14a', 1),
	('2023-10-24 06:30:27', '2023-10-24 06:30:27', '632aaa31c8093b9a2007d14a', 3),
	('2023-10-24 06:30:29', '2023-10-24 06:30:29', '632aaa31c8093b9a2007d14a', 4),
	('2023-10-24 06:30:11', '2023-10-24 06:30:11', '632aaa31c8093b9a2007d14b', 1),
	('2023-10-24 06:30:25', '2023-10-24 06:30:25', '632aaa31c8093b9a2007d14b', 2),
	('2023-10-24 06:30:27', '2023-10-24 06:30:27', '632aaa31c8093b9a2007d14b', 3),
	('2023-10-24 06:30:29', '2023-10-24 06:30:29', '632aaa31c8093b9a2007d14b', 4),
	('2023-10-24 06:30:11', '2023-10-24 06:30:11', '632aaa31c8093b9a2007d14c', 1),
	('2023-10-24 06:30:27', '2023-10-24 06:30:27', '632aaa31c8093b9a2007d14c', 3),
	('2023-10-24 06:30:29', '2023-10-24 06:30:29', '632aaa31c8093b9a2007d14c', 4),
	('2023-10-24 06:30:11', '2023-10-24 06:30:11', '632aaa31c8093b9a2007d154', 1),
	('2023-10-24 06:30:27', '2023-10-24 06:30:27', '632aaa31c8093b9a2007d154', 3),
	('2023-10-24 06:30:11', '2023-10-24 06:30:11', '632aaa31c8093b9a2007d155', 1),
	('2023-10-24 06:30:25', '2023-10-24 06:30:25', '632aaa31c8093b9a2007d155', 2),
	('2023-10-24 06:30:27', '2023-10-24 06:30:27', '632aaa31c8093b9a2007d155', 3),
	('2023-10-24 06:30:29', '2023-10-24 06:30:29', '632aaa31c8093b9a2007d155', 4),
	('2023-10-24 06:30:11', '2023-10-24 06:30:11', '632aaa31c8093b9a2007d158', 1),
	('2023-10-24 06:30:27', '2023-10-24 06:30:27', '632aaa31c8093b9a2007d158', 3),
	('2023-10-24 06:30:29', '2023-10-24 06:30:29', '632aaa31c8093b9a2007d158', 4),
	('2023-10-24 06:30:11', '2023-10-24 06:30:11', '632aaa31c8093b9a2007d15b', 1),
	('2023-10-24 06:30:27', '2023-10-24 06:30:27', '632aaa31c8093b9a2007d15b', 3),
	('2023-10-24 06:30:11', '2023-10-24 06:30:11', '632aaa31c8093b9a2007d15f', 1),
	('2023-10-24 06:30:25', '2023-10-24 06:30:25', '632aaa31c8093b9a2007d15f', 2),
	('2023-10-24 06:30:27', '2023-10-24 06:30:27', '632aaa31c8093b9a2007d15f', 3),
	('2023-10-24 06:30:29', '2023-10-24 06:30:29', '632aaa31c8093b9a2007d15f', 4),
	('2023-10-24 06:30:11', '2023-10-24 06:30:11', '632aaa31c8093b9a2007d161', 1),
	('2023-10-24 06:30:27', '2023-10-24 06:30:27', '632aaa31c8093b9a2007d161', 3),
	('2023-10-24 06:30:11', '2023-10-24 06:30:11', '632aaa31c8093b9a2007d164', 1),
	('2023-10-24 06:30:27', '2023-10-24 06:30:27', '632aaa31c8093b9a2007d164', 3),
	('2023-10-24 06:30:29', '2023-10-24 06:30:29', '632aaa31c8093b9a2007d164', 4),
	('2023-10-24 06:30:11', '2023-10-24 06:30:11', '632aaa31c8093b9a2007d167', 1),
	('2023-10-24 06:30:27', '2023-10-24 06:30:27', '632aaa31c8093b9a2007d167', 3),
	('2023-10-24 06:30:11', '2023-10-24 06:30:11', '632aaa31c8093b9a2007d169', 1),
	('2023-10-24 06:30:27', '2023-10-24 06:30:27', '632aaa31c8093b9a2007d169', 3),
	('2023-10-24 06:30:29', '2023-10-24 06:30:29', '632aaa31c8093b9a2007d169', 4),
	('2023-10-24 06:30:11', '2023-10-24 06:30:11', '632aaa31c8093b9a2007d16a', 1),
	('2023-10-24 06:30:27', '2023-10-24 06:30:27', '632aaa31c8093b9a2007d16a', 3),
	('2023-10-24 06:30:11', '2023-10-24 06:30:11', '632aaa31c8093b9a2007d16d', 1),
	('2023-10-24 06:30:27', '2023-10-24 06:30:27', '632aaa31c8093b9a2007d16d', 3),
	('2023-10-24 06:30:29', '2023-10-24 06:30:29', '632aaa31c8093b9a2007d16d', 4),
	('2023-10-24 06:30:11', '2023-10-24 06:30:11', '632aaa31c8093b9a2007d16f', 1),
	('2023-10-24 06:30:27', '2023-10-24 06:30:27', '632aaa31c8093b9a2007d16f', 3),
	('2023-10-24 06:30:29', '2023-10-24 06:30:29', '632aaa31c8093b9a2007d16f', 4),
	('2023-10-24 06:30:25', '2023-10-24 06:30:25', '632aaa31c8093b9a2007d170', 2),
	('2023-10-24 06:30:27', '2023-10-24 06:30:27', '632aaa31c8093b9a2007d170', 3),
	('2023-10-24 06:30:11', '2023-10-24 06:30:11', '632aaa31c8093b9a2007d171', 1),
	('2023-10-24 06:30:27', '2023-10-24 06:30:27', '632aaa31c8093b9a2007d171', 3),
	('2023-10-24 06:30:29', '2023-10-24 06:30:29', '632aaa31c8093b9a2007d171', 4),
	('2023-10-24 06:30:11', '2023-10-24 06:30:11', '632aaa31c8093b9a2007d176', 1),
	('2023-10-24 06:30:27', '2023-10-24 06:30:27', '632aaa31c8093b9a2007d176', 3),
	('2023-10-24 06:30:27', '2023-10-24 06:30:27', '632aaa31c8093b9a2007d177', 3),
	('2023-10-24 06:30:29', '2023-10-24 06:30:29', '632aaa31c8093b9a2007d177', 4),
	('2023-10-24 06:30:11', '2023-10-24 06:30:11', '632aaa31c8093b9a2007d179', 1),
	('2023-10-24 06:30:27', '2023-10-24 06:30:27', '632aaa31c8093b9a2007d179', 3),
	('2023-10-24 06:30:29', '2023-10-24 06:30:29', '632aaa31c8093b9a2007d179', 4),
	('2023-10-24 06:30:11', '2023-10-24 06:30:11', '632aaa31c8093b9a2007d17b', 1),
	('2023-10-24 06:30:27', '2023-10-24 06:30:27', '632aaa31c8093b9a2007d17b', 3),
	('2023-10-24 06:30:29', '2023-10-24 06:30:29', '632aaa31c8093b9a2007d17b', 4),
	('2023-10-24 06:30:25', '2023-10-24 06:30:25', '632aaa31c8093b9a2007d17c', 2),
	('2023-10-24 06:30:27', '2023-10-24 06:30:27', '632aaa31c8093b9a2007d17c', 3),
	('2023-10-24 06:30:11', '2023-10-24 06:30:11', '632aaa31c8093b9a2007d17d', 1),
	('2023-10-24 06:30:27', '2023-10-24 06:30:27', '632aaa31c8093b9a2007d17d', 3),
	('2023-10-24 06:30:29', '2023-10-24 06:30:29', '632aaa31c8093b9a2007d17d', 4),
	('2023-10-24 06:30:11', '2023-10-24 06:30:11', '632aaa31c8093b9a2007d17f', 1),
	('2023-10-24 06:30:27', '2023-10-24 06:30:27', '632aaa31c8093b9a2007d17f', 3),
	('2023-10-24 06:30:29', '2023-10-24 06:30:29', '632aaa31c8093b9a2007d17f', 4),
	('2023-10-24 06:30:11', '2023-10-24 06:30:11', '632aaa31c8093b9a2007d183', 1),
	('2023-10-24 06:30:27', '2023-10-24 06:30:27', '632aaa31c8093b9a2007d183', 3),
	('2023-10-24 06:30:29', '2023-10-24 06:30:29', '632aaa31c8093b9a2007d183', 4),
	('2023-10-24 06:30:11', '2023-10-24 06:30:11', '632aaa31c8093b9a2007d184', 1),
	('2023-10-24 06:30:27', '2023-10-24 06:30:27', '632aaa31c8093b9a2007d184', 3),
	('2023-10-24 06:30:29', '2023-10-24 06:30:29', '632aaa31c8093b9a2007d184', 4),
	('2023-10-24 06:30:11', '2023-10-24 06:30:11', '632aaa31c8093b9a2007d186', 1),
	('2023-10-24 06:30:27', '2023-10-24 06:30:27', '632aaa31c8093b9a2007d186', 3),
	('2023-10-24 06:30:29', '2023-10-24 06:30:29', '632aaa31c8093b9a2007d186', 4),
	('2023-10-24 06:30:11', '2023-10-24 06:30:11', '632aaa31c8093b9a2007d188', 1),
	('2023-10-24 06:30:25', '2023-10-24 06:30:25', '632aaa31c8093b9a2007d188', 2),
	('2023-10-24 06:30:27', '2023-10-24 06:30:27', '632aaa31c8093b9a2007d188', 3),
	('2023-10-24 06:30:11', '2023-10-24 06:30:11', '632aaa31c8093b9a2007d18a', 1),
	('2023-10-24 06:30:27', '2023-10-24 06:30:27', '632aaa31c8093b9a2007d18a', 3),
	('2023-10-24 06:30:29', '2023-10-24 06:30:29', '632aaa31c8093b9a2007d18a', 4),
	('2023-10-24 06:30:11', '2023-10-24 06:30:11', '632aaa31c8093b9a2007d18b', 1),
	('2023-10-24 06:30:27', '2023-10-24 06:30:27', '632aaa31c8093b9a2007d18b', 3),
	('2023-10-24 06:30:11', '2023-10-24 06:30:11', '632aaa31c8093b9a2007d190', 1),
	('2023-10-24 06:30:27', '2023-10-24 06:30:27', '632aaa31c8093b9a2007d190', 3),
	('2023-10-24 06:30:11', '2023-10-24 06:30:11', '632aaa31c8093b9a2007d191', 1),
	('2023-10-24 06:30:25', '2023-10-24 06:30:25', '632aaa31c8093b9a2007d191', 2),
	('2023-10-24 06:30:27', '2023-10-24 06:30:27', '632aaa31c8093b9a2007d191', 3),
	('2023-10-24 06:30:11', '2023-10-24 06:30:11', '632aaa31c8093b9a2007d193', 1),
	('2023-10-24 06:30:25', '2023-10-24 06:30:25', '632aaa31c8093b9a2007d193', 2),
	('2023-10-24 06:30:27', '2023-10-24 06:30:27', '632aaa31c8093b9a2007d193', 3),
	('2023-10-24 06:30:11', '2023-10-24 06:30:11', '632aaa31c8093b9a2007d194', 1),
	('2023-10-24 06:30:25', '2023-10-24 06:30:25', '632aaa31c8093b9a2007d194', 2),
	('2023-10-24 06:30:27', '2023-10-24 06:30:27', '632aaa31c8093b9a2007d194', 3),
	('2023-10-24 06:30:29', '2023-10-24 06:30:29', '632aaa31c8093b9a2007d194', 4),
	('2023-10-24 06:30:11', '2023-10-24 06:30:11', '632aaa31c8093b9a2007d199', 1),
	('2023-10-24 06:30:25', '2023-10-24 06:30:25', '632aaa31c8093b9a2007d199', 2),
	('2023-10-24 06:30:27', '2023-10-24 06:30:27', '632aaa31c8093b9a2007d199', 3),
	('2023-10-24 06:30:29', '2023-10-24 06:30:29', '632aaa31c8093b9a2007d199', 4),
	('2023-10-24 06:30:11', '2023-10-24 06:30:11', '6333e539021398275a67d83d', 1),
	('2023-10-24 06:30:25', '2023-10-24 06:30:25', '6333e539021398275a67d83d', 2),
	('2023-10-24 06:30:27', '2023-10-24 06:30:27', '6333e539021398275a67d83d', 3),
	('2023-10-24 06:30:25', '2023-10-24 06:30:25', '63340827858087818680f103', 2),
	('2023-10-24 06:30:11', '2023-10-24 06:30:11', '63343f59a5ada435bef9f4d6', 1),
	('2023-10-24 06:30:27', '2023-10-24 06:30:27', '63343f59a5ada435bef9f4d6', 3),
	('2023-10-24 06:30:29', '2023-10-24 06:30:29', '63343f59a5ada435bef9f4d6', 4),
	('2023-10-24 06:30:11', '2023-10-24 06:30:11', '63344034a5ada435bef9f4dc', 1),
	('2023-10-24 06:30:27', '2023-10-24 06:30:27', '63344034a5ada435bef9f4dc', 3),
	('2023-10-24 06:30:29', '2023-10-24 06:30:29', '63344034a5ada435bef9f4dc', 4),
	('2023-10-24 06:30:11', '2023-10-24 06:30:11', '63344067a5ada435bef9f4df', 1),
	('2023-10-24 06:30:27', '2023-10-24 06:30:27', '63344067a5ada435bef9f4df', 3),
	('2023-10-24 06:30:29', '2023-10-24 06:30:29', '63344067a5ada435bef9f4df', 4),
	('2023-10-24 06:30:11', '2023-10-24 06:30:11', '63344084a5ada435bef9f4e2', 1),
	('2023-10-24 06:30:27', '2023-10-24 06:30:27', '63344084a5ada435bef9f4e2', 3),
	('2023-10-24 06:30:29', '2023-10-24 06:30:29', '63344084a5ada435bef9f4e2', 4),
	('2023-10-24 06:30:27', '2023-10-24 06:30:27', '6423a489bab829e7784d6047', 3),
	('2023-10-24 06:30:29', '2023-10-24 06:30:29', '6423a489bab829e7784d6047', 4),
	('2023-10-24 06:30:11', '2023-10-24 06:30:11', '6423d78c2959d50e73fb6767', 1),
	('2023-10-24 06:30:27', '2023-10-24 06:30:27', '6423d78c2959d50e73fb6767', 3),
	('2023-10-24 06:30:29', '2023-10-24 06:30:29', '6423d78c2959d50e73fb6767', 4),
	('2023-10-24 06:30:11', '2023-10-24 06:30:11', '6423d7b62959d50e73fb676a', 1),
	('2023-10-24 06:30:27', '2023-10-24 06:30:27', '6423d7b62959d50e73fb676a', 3),
	('2023-10-24 06:30:29', '2023-10-24 06:30:29', '6423d7b62959d50e73fb676a', 4),
	('2023-10-24 06:30:11', '2023-10-24 06:30:11', '6423d7d52959d50e73fb676d', 1),
	('2023-10-24 06:30:27', '2023-10-24 06:30:27', '6423d7d52959d50e73fb676d', 3),
	('2023-10-24 06:30:29', '2023-10-24 06:30:29', '6423d7d52959d50e73fb676d', 4),
	('2024-03-01 02:39:19', '2024-03-01 02:39:19', '64867f1def5220e488de1d77', 1),
	('2023-10-24 06:30:25', '2023-10-24 06:30:25', '64867f1def5220e488de1d77', 2),
	('2023-10-24 06:30:27', '2023-10-24 06:30:27', '64867f1def5220e488de1d77', 3),
	('2023-10-24 06:30:29', '2023-10-24 06:30:29', '64867f1def5220e488de1d77', 4),
	('2024-03-01 02:39:19', '2024-03-01 02:39:19', '64867ffcef5220e488de1d7b', 1),
	('2023-10-24 06:30:27', '2023-10-24 06:30:27', '64867ffcef5220e488de1d7b', 3),
	('2023-10-24 06:30:11', '2023-10-24 06:30:11', '64f7fb2e4ab1e8cfb054a14f', 1),
	('2023-10-24 06:30:11', '2023-10-24 06:30:11', '64f7fbe14ab1e8cfb054a152', 1),
	('2023-10-24 06:30:11', '2023-10-24 06:30:11', '64f7fc234ab1e8cfb054a155', 1),
	('2023-10-24 06:30:11', '2023-10-24 06:30:11', '64f7fc514ab1e8cfb054a158', 1),
	('2023-10-24 06:30:11', '2023-10-24 06:30:11', '64f7fd0d4ab1e8cfb054a15b', 1),
	('2023-10-24 06:30:11', '2023-10-24 06:30:11', '64f7fd444ab1e8cfb054a15e', 1),
	('2024-01-11 00:42:01', '2024-01-11 00:42:01', '659f38dfc107355a45774638', 1),
	('2024-01-11 00:42:01', '2024-01-11 00:42:01', '659f392fc107355a45774639', 1),
	('2024-01-29 09:31:48', '2024-01-29 09:31:48', '65b76fdcc12bcd1ba29ec443', 1),
	('2024-02-22 04:17:03', '2024-02-22 04:17:03', '65d6caa18d56faaa0686f3e4', 1),
	('2024-02-29 06:33:07', '2024-02-29 06:33:07', '65e022741b9114ef04cf44c8', 1),
	('2024-03-01 02:30:18', '2024-03-01 02:30:18', '65e13bf5dc2c733cc836158b', 1),
	('2024-03-01 02:30:18', '2024-03-01 02:30:18', '65e13c49dc2c733cc836158c', 1),
	('2024-03-01 02:30:18', '2024-03-01 02:30:18', '65e13cbedc2c733cc836158d', 1),
	('2024-03-01 02:30:18', '2024-03-01 02:30:18', '65e13d55dc2c733cc836158f', 1),
	('2024-03-01 02:30:18', '2024-03-01 02:30:18', '65e13d78dc2c733cc8361590', 1),
	('2024-03-01 02:39:19', '2024-03-01 02:39:19', '65e13dabdc2c733cc8361591', 1);

-- Dumping structure for table nanp.sys_departments
CREATE TABLE IF NOT EXISTS `sys_departments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `lang` varchar(3) NOT NULL,
  `tenphongban` varchar(255) DEFAULT NULL,
  `state` tinyint(1) DEFAULT NULL,
  `fatherId` int DEFAULT NULL,
  `orderNum` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`,`lang`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table nanp.sys_departments: ~7 rows (approximately)
INSERT INTO `sys_departments` (`id`, `lang`, `tenphongban`, `state`, `fatherId`, `orderNum`, `createdAt`, `updatedAt`) VALUES
	(1, 'vi', 'Quản lý', 1, 0, 1, '2023-10-24 04:12:02', '2023-10-24 04:12:02'),
	(2, 'vi', 'Nhân viên kỷ thuật', 1, 0, 1, '2023-10-24 04:12:02', '2024-01-17 07:32:23'),
	(3, 'vi', 'Khách Hàng ', 1, 0, 1, '2023-10-24 04:12:02', '2023-10-24 04:12:02'),
	(4, 'vi', 'Kỷ thuật', 1, 3, 2, '2023-10-24 04:12:02', '2024-01-17 07:06:42'),
	(5, 'vi', 'Khách lẻ', 1, 3, 2, '2023-10-24 04:12:02', '2024-01-17 02:21:44'),
	(7, 'vi', 'Thu ngân', 1, 0, 0, '2023-10-24 04:12:02', '2024-01-17 02:22:51'),
	(8, 'vi', 'Doanh nghiệp', 1, 3, 0, '2023-10-24 04:12:02', '2024-01-17 02:21:13'),
	(11, 'vi', 'Nhân Viên Bán Hàng', 1, 0, 5, '2024-01-17 02:23:13', '2024-01-17 02:23:13'),
	(12, 'vi', 'Nhà cung cấp', 1, 0, 6, '2024-02-23 06:26:09', '2024-02-23 06:26:09');

-- Dumping structure for table nanp.sys_menus
CREATE TABLE IF NOT EXISTS `sys_menus` (
  `id` varchar(36) NOT NULL,
  `lang` varchar(3) NOT NULL,
  `menuName` varchar(50) NOT NULL,
  `code` varchar(50) NOT NULL,
  `fatherId` varchar(24) NOT NULL,
  `orderNum` int NOT NULL,
  `path` varchar(100) DEFAULT NULL,
  `menuType` char(1) NOT NULL,
  `visible` tinyint(1) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `icon` varchar(50) DEFAULT NULL,
  `alIcon` varchar(50) DEFAULT NULL,
  `newLinkFlag` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`,`lang`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table nanp.sys_menus: ~73 rows (approximately)
INSERT INTO `sys_menus` (`id`, `lang`, `menuName`, `code`, `fatherId`, `orderNum`, `path`, `menuType`, `visible`, `status`, `icon`, `alIcon`, `newLinkFlag`, `createdAt`, `updatedAt`) VALUES
	('632aaa31c8093b9a2007d142', 'vi', 'Người đầu tiên', 'blank:other-login:login1', '632aaa31c8093b9a2007d1a1', 1, '/blank/other-login/login1', 'C', 1, 1, 'highlight', NULL, 0, '2023-10-23 07:11:47', '2023-10-23 07:11:47'),
	('632aaa31c8093b9a2007d144', 'vi', 'Trang thành công', 'default:page-demo:result:success', '632aaa31c8093b9a2007d188', 1, '/default/page-demo/result/success', 'C', 1, 1, 'check-circle', NULL, 0, '2023-10-23 07:11:47', '2024-01-08 06:55:37'),
	('632aaa31c8093b9a2007d145', 'vi', 'Quản lý tài khoản', 'default:system:account', '632aaa31c8093b9a2007d194', 1, '/default/system/account', 'C', 1, 1, 'user', '', 0, '2023-10-23 07:11:47', '2023-10-23 07:11:47'),
	('632aaa31c8093b9a2007d147', 'vi', 'Danh sách tìm kiếm (Các bài báo)', 'default:page-demo:list:search-list:article', '632aaa31c8093b9a2007d151', 1, '/default/page-demo/list/search-list/article', 'C', 1, 1, 'table', NULL, 0, '2023-10-23 07:11:47', '2023-10-23 07:11:47'),
	('632aaa31c8093b9a2007d148', 'vi', 'Quản lý bộ phận đã thêm', 'default:system:dept:add', '632aaa31c8093b9a2007d18a', 1, '', 'F', 0, 1, NULL, NULL, 0, '2023-10-23 07:11:47', '2023-10-23 07:11:47'),
	('632aaa31c8093b9a2007d14a', 'vi', 'Quản lý menu đã được thêm vào', 'default:system:menu:add', '632aaa31c8093b9a2007d17f', 1, NULL, 'F', 1, 1, NULL, NULL, 0, '2023-10-23 07:11:47', '2023-10-23 07:11:47'),
	('632aaa31c8093b9a2007d14b', 'vi', 'Trang phân tích', 'default:dashboard:analysis', '632aaa31c8093b9a2007d155', 1, '/default/dashboard/analysis', 'C', 1, 1, 'fund', '', 0, '2023-10-23 07:11:47', '2023-10-23 07:11:47'),
	('632aaa31c8093b9a2007d14c', 'vi', 'Quản lý vai trò mới', 'default:system:role-manager:add', '632aaa31c8093b9a2007d169', 1, '', 'F', 0, 1, NULL, NULL, 0, '2023-10-23 07:11:47', '2023-10-23 07:11:47'),
	('632aaa31c8093b9a2007d154', 'vi', 'Trung tâm cá nhân', 'default:page-demo:personal:personal-center', '632aaa31c8093b9a2007d193', 1, '/default/page-demo/personal/personal-center', 'C', 1, 1, 'user', NULL, 0, '2023-10-23 07:11:47', '2024-01-08 06:56:46'),
	('632aaa31c8093b9a2007d155', 'vi', 'Dashboard', 'default:dashboard', '0', 1, '/default/dashboard', 'C', 1, 1, 'dashboard', '', 0, '2023-10-23 07:11:47', '2023-10-23 07:11:47'),
	('632aaa31c8093b9a2007d158', 'vi', 'Đã thêm quản lý tài khoản', 'default:system:account:add', '632aaa31c8093b9a2007d145', 1, '', 'F', 0, 1, NULL, NULL, 0, '2023-10-23 07:11:47', '2023-10-23 07:11:47'),
	('632aaa31c8093b9a2007d15b', 'vi', '403', 'default:page-demo:except:except403', '632aaa31c8093b9a2007d191', 1, '/default/page-demo/except/except403', 'C', 1, 1, 'warning', NULL, 0, '2023-10-23 07:11:47', '2024-01-08 06:56:38'),
	('632aaa31c8093b9a2007d15f', 'vi', 'Trang', 'default:page-demo', '0', 2, '/default/page-demo', 'C', 0, 0, 'appstore', NULL, 0, '2023-10-23 07:11:47', '2024-03-01 06:50:35'),
	('632aaa31c8093b9a2007d161', 'vi', 'Thiết lập cá nhân', 'default:page-demo:personal:personal-setting', '632aaa31c8093b9a2007d193', 2, '/default/page-demo/personal/personal-setting', 'C', 1, 1, 'user', '', 0, '2023-10-23 07:11:47', '2024-01-08 06:56:50'),
	('632aaa31c8093b9a2007d164', 'vi', 'Quản lý tài khoản Edit', 'default:system:account:edit', '632aaa31c8093b9a2007d145', 2, '', 'F', 0, 1, NULL, NULL, 0, '2023-10-23 07:11:47', '2023-10-23 07:11:47'),
	('632aaa31c8093b9a2007d167', 'vi', '404', 'default:page-demo:except:except404', '632aaa31c8093b9a2007d191', 2, '/default/page-demo/except/except404', 'C', 1, 1, 'warning', NULL, 0, '2023-10-23 07:11:47', '2023-10-23 07:11:47'),
	('632aaa31c8093b9a2007d169', 'vi', 'Quản lý vai trò', 'default:system:role-manager', '632aaa31c8093b9a2007d194', 2, '/default/system/role-manager', 'C', 1, 1, 'up-circle', '', 0, '2023-10-23 07:11:47', '2023-10-23 07:11:47'),
	('632aaa31c8093b9a2007d16a', 'vi', 'Trang thất bại', 'default:page-demo:result:fail', '632aaa31c8093b9a2007d188', 2, '/default/page-demo/result/fail', 'C', 1, 1, 'check-circle', NULL, 0, '2023-10-23 07:11:47', '2024-01-08 06:55:41'),
	('632aaa31c8093b9a2007d16c', 'vi', 'Danh sách tìm kiếm (mục)', 'default:page-demo:list:search-list:project', '632aaa31c8093b9a2007d151', 2, '/default/page-demo/list/search-list/project', 'C', 1, 1, 'table', NULL, 0, '2023-10-23 07:11:47', '2023-10-23 07:11:47'),
	('632aaa31c8093b9a2007d16d', 'vi', 'Biên tập viên quản lý bộ phận', 'default:system:dept:edit', '632aaa31c8093b9a2007d18a', 2, '', 'F', 0, 1, NULL, NULL, 0, '2023-10-23 07:11:47', '2023-10-23 07:11:47'),
	('632aaa31c8093b9a2007d16f', 'vi', 'Trình chỉnh sửa quản lý menu', 'default:system:menu:edit', '632aaa31c8093b9a2007d17f', 2, NULL, 'F', 0, 1, NULL, NULL, 0, '2023-10-23 07:11:47', '2023-10-23 07:11:47'),
	('632aaa31c8093b9a2007d170', 'vi', 'Trang giám sát', 'default:dashboard:monitor', '632aaa31c8093b9a2007d155', 2, '/default/dashboard/monitor', 'C', 0, 0, 'fund', NULL, 0, '2023-10-23 07:11:47', '2024-01-08 06:57:30'),
	('632aaa31c8093b9a2007d171', 'vi', 'Biên tập viên quản lý vai trò', 'default:system:role-manager:edit', '632aaa31c8093b9a2007d169', 2, '', 'F', 0, 1, NULL, NULL, 0, '2023-10-23 07:11:47', '2023-10-23 07:11:47'),
	('632aaa31c8093b9a2007d176', 'vi', '500', 'default:page-demo:except:except500', '632aaa31c8093b9a2007d191', 3, '/default/page-demo/except/except500', 'C', 1, 1, 'warning', NULL, 0, '2023-10-23 07:11:47', '2024-01-08 06:56:32'),
	('632aaa31c8093b9a2007d177', 'vi', 'Quản lý tài khoản xóa', 'default:system:account:del', '632aaa31c8093b9a2007d145', 3, '', 'F', 0, 1, NULL, NULL, 0, '2023-10-23 07:11:47', '2023-10-23 07:11:47'),
	('632aaa31c8093b9a2007d178', 'vi', 'Danh sách tìm kiếm (Ứng dụng)', 'default:page-demo:list:search-list:application', '632aaa31c8093b9a2007d151', 3, '/default/page-demo/list/search-list/application', 'C', 1, 1, 'table', NULL, 0, '2023-10-23 07:11:47', '2023-10-23 07:11:47'),
	('632aaa31c8093b9a2007d179', 'vi', 'Quản lý bộ phận xóa', 'default:system:dept:del', '632aaa31c8093b9a2007d18a', 3, '', 'F', 0, 1, NULL, NULL, 0, '2023-10-23 07:11:47', '2023-10-23 07:11:47'),
	('632aaa31c8093b9a2007d17b', 'vi', 'Quản lý menu xóa', 'default:system:menu:del', '632aaa31c8093b9a2007d17f', 3, NULL, 'F', 0, 1, NULL, NULL, 0, '2023-10-23 07:11:47', '2023-10-23 07:11:47'),
	('632aaa31c8093b9a2007d17c', 'vi', 'Bàn làm việc', 'default:dashboard:workbench', '632aaa31c8093b9a2007d155', 3, '/default/dashboard/workbench', 'C', 1, 1, 'appstore', NULL, 0, '2023-10-23 07:11:47', '2024-01-08 08:27:21'),
	('632aaa31c8093b9a2007d17d', 'vi', 'Quản lý vai trò xóa', 'default:system:role-manager:del', '632aaa31c8093b9a2007d169', 3, '', 'F', 0, 1, NULL, NULL, 0, '2023-10-23 07:11:47', '2023-10-23 07:11:47'),
	('632aaa31c8093b9a2007d17f', 'vi', 'Quản lý menu', 'default:system:menu', '632aaa31c8093b9a2007d194', 3, '/default/system/menu', 'C', 1, 1, 'menu', '', 0, '2023-10-23 07:11:47', '2023-10-23 07:11:47'),
	('632aaa31c8093b9a2007d183', 'vi', 'Quản lý menu thêm cấp dưới', 'default:system:menu:addlowlevel', '632aaa31c8093b9a2007d17f', 4, '', 'F', 0, 1, NULL, NULL, 0, '2023-10-23 07:11:47', '2023-10-23 07:11:47'),
	('632aaa31c8093b9a2007d184', 'vi', 'Quản lý vai trò thiết lập các vai trò', 'default:system:role-manager:set-role', '632aaa31c8093b9a2007d169', 4, '', 'F', 0, 1, NULL, NULL, 0, '2023-10-23 07:11:47', '2023-10-23 07:11:47'),
	('632aaa31c8093b9a2007d186', 'vi', 'Thêm cấp dưới vào quản lý bộ phận', 'default:system:dept:addlowlevel', '632aaa31c8093b9a2007d18a', 4, '', 'F', 0, 1, NULL, NULL, 0, '2023-10-23 07:11:47', '2023-10-23 07:11:47'),
	('632aaa31c8093b9a2007d188', 'vi', 'Trang kết quả', 'default:page-demo:result', '632aaa31c8093b9a2007d15f', 4, '/default/page-demo/result', 'C', 1, 1, 'check-circle', NULL, 0, '2023-10-23 07:11:47', '2024-01-08 06:55:32'),
	('632aaa31c8093b9a2007d18a', 'vi', 'Quản lý bộ phận', 'default:system:dept', '632aaa31c8093b9a2007d194', 4, '/default/system/dept', 'C', 1, 1, 'border-outer', '', 0, '2023-10-23 07:11:47', '2023-10-23 07:11:47'),
	('632aaa31c8093b9a2007d18b', 'vi', 'Lỗi mạng', 'default:page-demo:except:network-error', '632aaa31c8093b9a2007d191', 4, '/default/page-demo/except/network-error', 'C', 1, 1, 'warning', '', 0, '2023-10-23 07:11:47', '2024-01-08 06:56:22'),
	('632aaa31c8093b9a2007d190', 'vi', 'không có dữ liệu', 'default:page-demo:except:no-data', '632aaa31c8093b9a2007d191', 5, '/default/page-demo/except/no-data', 'C', 1, 1, 'warning', NULL, 0, '2023-10-23 07:11:47', '2024-01-08 06:56:01'),
	('632aaa31c8093b9a2007d191', 'vi', 'trang ngoại lệ', 'default:page-demo:except', '632aaa31c8093b9a2007d15f', 5, '/default/page-demo/except', 'C', 1, 1, 'warning', NULL, 0, '2023-10-23 07:11:47', '2024-01-08 06:52:17'),
	('632aaa31c8093b9a2007d193', 'vi', 'Trang cá nhân', 'default:page-demo:personal', '632aaa31c8093b9a2007d15f', 6, '/default/page-demo/personal', 'C', 1, 1, 'user', NULL, 0, '2023-10-23 07:11:47', '2024-01-08 07:02:15'),
	('632aaa31c8093b9a2007d194', 'vi', 'Hệ thống', 'default:system', '0', 6, '/default/system', 'C', 1, 1, 'setting', '', 0, '2023-10-23 07:11:47', '2023-10-23 07:11:47'),
	('632aaa31c8093b9a2007d199', 'vi', 'About', 'default:about', '0', 7, '/default/about', 'C', 1, 1, '', 'icon-medium', 0, '2023-10-23 07:11:47', '2023-10-23 07:11:47'),
	('6333e539021398275a67d83d', 'vi', 'Demo Socket.IO', 'default:dashboard:demo', '632aaa31c8093b9a2007d155', 4, '/default/dashboard/demo', 'C', 0, 0, 'up-circle', NULL, 0, '2023-10-23 07:11:47', '2023-12-29 00:42:53'),
	('6334016f73116adbaf79bd3c', 'vi', 'Demo1', 'default:dashboard:demo1', 'undefined', 5, 'default/dashboard/demo1', 'C', 1, 1, 'up-circle', NULL, 0, '2023-10-23 07:11:47', '2023-10-23 07:11:47'),
	('63343f59a5ada435bef9f4d6', 'vi', 'Quản lý dữ liệu SC', 'default:system:datasc', '632aaa31c8093b9a2007d194', 5, '/default/system/datasc', 'C', 1, 1, 'diff', NULL, 0, '2023-10-23 07:11:47', '2023-10-23 07:11:47'),
	('63344034a5ada435bef9f4dc', 'vi', 'Quản lý dữ liệu SC Add', 'default:system:datasc:add', '63343f59a5ada435bef9f4d6', 1, NULL, 'F', NULL, 1, NULL, NULL, NULL, '2023-10-23 07:11:47', '2023-10-23 07:11:47'),
	('63344067a5ada435bef9f4df', 'vi', 'Quản lý dữ liệu SC Edit', 'default:system:datasc:edit', '63343f59a5ada435bef9f4d6', 2, NULL, 'F', NULL, 1, NULL, NULL, NULL, '2023-10-23 07:11:47', '2023-10-23 07:11:47'),
	('63344084a5ada435bef9f4e2', 'vi', 'Quản lý dữ liệu SC Del', 'default:system:datasc:del', '63343f59a5ada435bef9f4d6', 3, NULL, 'F', NULL, 1, NULL, NULL, NULL, '2023-10-23 07:11:47', '2023-10-23 07:11:47'),
	('6423a489bab829e7784d6047', 'vi', 'Hướng dẫn', 'default:system:huongdan', '632aaa31c8093b9a2007d194', 8, '/default/system/huongdan', 'C', 1, 1, 'youtube', NULL, 0, '2023-10-23 07:11:47', '2023-10-23 07:11:47'),
	('6423d78c2959d50e73fb6767', 'vi', 'Thêm mới', 'default:system:huongdan:add', '6423a489bab829e7784d6047', 1, NULL, 'F', NULL, 1, NULL, NULL, NULL, '2023-10-23 07:11:47', '2023-10-23 07:11:47'),
	('6423d7b62959d50e73fb676a', 'vi', 'Xóa tất cả', 'default:system:huongdan:allDel', '6423a489bab829e7784d6047', 2, NULL, 'F', NULL, 1, NULL, NULL, NULL, '2023-10-23 07:11:47', '2023-10-23 07:11:47'),
	('6423d7d52959d50e73fb676d', 'vi', 'Cập nhật', 'default:system:huongdan:update', '6423a489bab829e7784d6047', 3, NULL, 'F', NULL, 1, NULL, NULL, NULL, '2023-10-23 07:11:47', '2023-10-23 07:11:47'),
	('64867f1def5220e488de1d77', 'vi', 'Sản Phẩm', 'default:product', '0', 4, '/default/product', 'C', 1, 1, 'sketch', NULL, 0, '2023-10-23 07:11:47', '2024-03-01 06:51:03'),
	('64867ffcef5220e488de1d7b', 'vi', 'Quản lý sản phẩm', 'default:product:spmt00101', '64867f1def5220e488de1d77', 1, '/default/product/spmt00101', 'C', 1, 1, 'form', NULL, 0, '2023-10-23 07:11:47', '2024-02-29 01:55:04'),
	('648680f5ef5220e488de1d7f', 'vi', 'Thêm mới', 'default:product:spmt00201', '64867f1def5220e488de1d77', 2, '/default/product/spmt00201', 'C', 1, 1, 'edit', NULL, 0, '2023-10-23 07:11:47', '2024-02-29 00:55:53'),
	('64868282ef5220e488de1d82', 'vi', 'Chi Tiết Sản Phẩm', 'default:product:spmt00501', '64867f1def5220e488de1d77', 3, '/default/product/spmt00501', 'C', 1, 1, 'border-outer', NULL, 0, '2023-10-23 07:11:47', '2023-12-11 09:41:49'),
	('64f7fb2e4ab1e8cfb054a14f', 'vi', 'Danh Sách', 'default:page-demo:list', '632aaa31c8093b9a2007d15f', 4, '/default/page-demo/list', 'C', 1, 1, 'unordered-list', NULL, 0, '2023-10-23 07:11:47', '2023-10-23 07:11:47'),
	('64f7fbe14ab1e8cfb054a152', 'vi', 'Mẫu', 'default:page-demo:list:standard-table', '64f7fb2e4ab1e8cfb054a14f', 1, '/default/page-demo/list/standard-table', 'C', 1, 1, 'caret-right', NULL, 0, '2023-10-23 07:11:47', '2023-10-23 07:11:47'),
	('64f7fc234ab1e8cfb054a155', 'vi', 'Dạng Cây', 'default:page-demo:list:tree-list', '64f7fb2e4ab1e8cfb054a14f', 2, '/default/page-demo/list/tree-list', 'C', 1, 1, 'caret-right', '', 0, '2023-10-23 07:11:47', '2023-10-23 07:11:47'),
	('64f7fc514ab1e8cfb054a158', 'vi', 'Danh Sách Thẻ', 'default:page-demo:list:card-table', '64f7fb2e4ab1e8cfb054a14f', 3, '/default/page-demo/list/card-table', 'C', 1, 1, 'caret-right', NULL, 0, '2023-10-23 07:11:47', '2023-10-23 07:11:47'),
	('64f7fd0d4ab1e8cfb054a15b', 'vi', 'Tìm kiếm bảng', 'default:page-demo:list:search-table', '64f7fb2e4ab1e8cfb054a14f', 4, ' /default/page-demo/list/search-table', 'C', 1, 1, 'caret-right', NULL, 0, '2023-10-23 07:11:47', '2023-10-23 07:11:47'),
	('64f7fd444ab1e8cfb054a15e', 'vi', 'Tìm kiếm danh sách', 'default:page-demo:list:search-list', '64f7fb2e4ab1e8cfb054a14f', 5, '/default/page-demo/list/search-list', 'C', 1, 1, 'caret-right', NULL, 0, '2023-10-23 07:11:47', '2023-10-23 07:11:47'),
	('659f38dfc107355a45774638', 'vi', 'Xuất hàng', 'default:out', '0', 3, '/default/out', 'C', 1, 1, 'logout', NULL, 0, '2024-01-11 00:39:59', '2024-03-01 06:50:55'),
	('659f392fc107355a45774639', 'vi', 'Đơn hàng', 'default:out:spot00101', '659f38dfc107355a45774638', 1, '/default/out/spot00101', 'C', 0, 0, 'diff', NULL, 0, '2024-01-11 00:41:19', '2024-03-01 06:49:47'),
	('65b76fdcc12bcd1ba29ec443', 'vi', 'Thêm mới', 'default:out:spot00101:addListProduct', '659f392fc107355a45774639', 1, NULL, 'F', NULL, NULL, NULL, NULL, NULL, '2024-01-29 09:29:00', '2024-01-29 09:29:00'),
	('65d6caa18d56faaa0686f3e4', 'vi', 'In báo giá', 'default:out:spot00101:inbaogia', '659f392fc107355a45774639', 2, NULL, 'F', NULL, NULL, NULL, NULL, NULL, '2024-02-22 04:16:33', '2024-02-22 04:16:33'),
	('65e022741b9114ef04cf44c8', 'vi', 'Thêm mới', 'default:product:spmt00101:add', '64867ffcef5220e488de1d7b', 1, NULL, 'F', NULL, NULL, NULL, NULL, NULL, '2024-02-29 06:21:40', '2024-02-29 06:21:40'),
	('65e13bf5dc2c733cc836158b', 'vi', 'Nhập hàng', 'default:in', '0', 2, '/default/in', 'C', 1, 1, 'caret-right', NULL, 0, '2024-03-01 02:22:45', '2024-03-01 06:49:15'),
	('65e13c49dc2c733cc836158c', 'vi', 'Đăng ký nhập hàng', 'default:in:spin00101', '65e13bf5dc2c733cc836158b', 1, '/default/in/spin00101', 'C', 1, 1, 'caret-right', NULL, 0, '2024-03-01 02:24:09', '2024-03-01 02:24:09'),
	('65e13cbedc2c733cc836158d', 'vi', 'Lịch trình hàng đến', 'default:in:spin00201', '65e13bf5dc2c733cc836158b', 2, '/default/in/spin00201', 'C', 1, 1, 'caret-right', NULL, 0, '2024-03-01 02:26:06', '2024-03-01 02:51:09'),
	('65e13d55dc2c733cc836158f', 'vi', 'Nhận hàng kiểm định', 'default:in:spin00501', '65e13bf5dc2c733cc836158b', 3, '/default/in/spin00501', 'C', 1, 1, 'caret-right', NULL, 0, '2024-03-01 02:28:37', '2024-03-01 02:51:24'),
	('65e13d78dc2c733cc8361590', 'vi', 'Hủy nhận hàng', 'default:in:spin00801', '65e13bf5dc2c733cc836158b', 4, '/default/in/spin00801', 'C', 1, 1, 'caret-right', NULL, 0, '2024-03-01 02:29:12', '2024-03-01 02:49:58'),
	('65e13dabdc2c733cc8361591', 'vi', 'Thông tin tồn kho', 'default:in:spin00601', '65e13bf5dc2c733cc836158b', 5, '/default/in/spin00601', 'C', 1, 1, 'caret-right', NULL, 0, '2024-03-01 02:30:03', '2024-03-01 02:50:06');

-- Dumping structure for table nanp.sys_roles
CREATE TABLE IF NOT EXISTS `sys_roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `lang` varchar(3) NOT NULL,
  `rolename` varchar(50) DEFAULT NULL,
  `mota` varchar(100) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`,`lang`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table nanp.sys_roles: ~5 rows (approximately)
INSERT INTO `sys_roles` (`id`, `lang`, `rolename`, `mota`, `createdAt`, `updatedAt`) VALUES
	(1, 'vi', 'Admin', 'Role Admin', '2023-10-24 04:13:53', '2023-10-24 04:13:53'),
	(2, 'vi', 'User', 'Role User', '2023-10-24 04:13:53', '2023-10-24 04:13:53'),
	(3, 'vi', 'Dev', 'Role Dev', '2023-10-24 04:13:53', '2023-10-24 04:13:53'),
	(4, 'vi', 'AdminTest', 'role Admin', '2023-10-24 04:13:53', '2023-10-24 04:13:53'),
	(5, 'vi', 'Namtest01  updsate', 'role test: update ', '2023-10-30 02:31:29', '2023-10-30 04:08:47');

-- Dumping structure for table nanp.sys_users
CREATE TABLE IF NOT EXISTS `sys_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `available` tinyint(1) DEFAULT NULL,
  `sex` int DEFAULT NULL,
  `dienthoai` varchar(256) DEFAULT NULL,
  `email` varchar(256) DEFAULT NULL,
  `lastLoginTime` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `phongban_id` int DEFAULT NULL,
  `sysDepartmentId` int DEFAULT NULL,
  `avatar` int DEFAULT NULL,
  `BUYERNMENC` varchar(256) DEFAULT NULL,
  `BUYERADRS1ENC` varchar(256) DEFAULT NULL,
  `BUYERADRS2ENC` varchar(256) DEFAULT NULL,
  `BUYERADRS3ENC` varchar(256) DEFAULT NULL,
  `sinhnhat` datetime DEFAULT NULL,
  `taxcd` varchar(256) DEFAULT NULL,
  `desc` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `avatar` (`avatar`),
  CONSTRAINT `sys_users_ibfk_1` FOREIGN KEY (`avatar`) REFERENCES `tmt341_files` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table nanp.sys_users: ~11 rows (approximately)
INSERT INTO `sys_users` (`id`, `name`, `password`, `available`, `sex`, `dienthoai`, `email`, `lastLoginTime`, `createdAt`, `updatedAt`, `phongban_id`, `sysDepartmentId`, `avatar`, `BUYERNMENC`, `BUYERADRS1ENC`, `BUYERADRS2ENC`, `BUYERADRS3ENC`, `sinhnhat`, `taxcd`, `desc`) VALUES
	(1, 'Nam Phạm', '$2a$10$867XxJjKv4rzYBMuik7ch.ss4AyjUNCk9vmhzHwLO40/KRRCNyJ9W', 1, 1, '901948321', 'namandroid.it@gmail.com', '2024-03-01 10:13:22', '2023-10-24 06:51:10', '2024-03-01 10:13:22', 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(2, 'Admin', '$2a$10$GcfxVajehGlEmVeDA0o57O26RnoEOQJnJqhMCIqRaucw6Zu051d7C', 1, 1, '901140465', 'devadmin@gmail.com', NULL, '2023-10-24 06:51:10', '2023-10-24 06:51:10', 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(3, 'Dev_NamPham', '$2a$10$Y42suBml9Ohaauwh.W72kOrufxxylYC3eLc6X0JpOrj6gYZRHd5R.', 1, 1, '901140941', 'devnampham@gmail.com', '2023-02-06 13:41:00', '2023-10-24 06:51:10', '2023-10-24 06:51:10', 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(4, 'nam123', '$2a$10$M5pRjgm8Vu18Ldxk3hwhkuYXQXsohu4N8v9ZCcCoFUYeM1YQ5Zpum', 1, 0, '901140345', 'ntk@gmail.com', '2023-04-07 01:50:33', '2023-10-24 06:51:10', '2023-10-24 06:51:10', 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(5, 'Nam Pham kt', '$2a$10$mSDBj1N./pbanwu4ulhareCA1f81CmX6Iq0NsO7O/GxSYCAxFR6bS', 1, 1, '901140464', 'namphm123@gmail.com', NULL, '2023-10-24 06:51:10', '2023-10-24 06:51:10', 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(6, 'Nam Pham123123', '$2a$10$0Ql0pWMx/cKurJzu7Q36.OTnae9DAUU5eXh1oCSzq3pieiDWW1IVG', 1, 1, '901140464', 'namtk90@gmail.jcom', NULL, '2023-10-24 06:51:10', '2023-10-24 06:51:10', 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(7, 'Nam Pham', '$2a$10$S61NWS55HZlsiYmdEg6fL.kX8U2PT8wxva3aYFAQZ62Px1NoovIzO', 1, 1, '901140464', 'namphammrk@gmail.com', '2023-09-21 09:44:37', '2023-10-24 06:51:10', '2023-10-24 06:51:10', 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(8, 'test01', '$2a$10$ej6nr9uqdK8vgpyQ1w7mF.6BdTnvdZqwzhw5ZlP8IggOBRo48sLYm', 1, 1, '0901123345', 'test01@gmail.com', NULL, '2023-10-26 02:13:10', '2024-02-26 02:49:04', 4, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(9, 'test02', '$2a$10$plK9QKytXfsrI8/WRFgDv.RkfATg8lebOXhrtbn.UJo5R790Htt0i', 1, 1, '0901123345', 'test02@gmail.com', NULL, '2023-10-26 02:17:52', '2024-02-26 02:49:21', 5, 5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(17, 'test04', '$2a$10$/SwoeaXh2.PFsHCvXhxik.VsA5NQiIsyHKbbpWY/N4hF1MapnBpMK', 1, 1, '0901140464', 'test04@gmail.com', NULL, '2023-10-27 07:42:30', '2024-02-26 02:49:36', 8, 8, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(18, 'NAM test', '$2a$10$G/k.Bhnzm99JJWEugsCE2embFmCiyPO3F.LALBPsbB0YzMCcN4UUq', 1, 1, '0901999999', 'namtest01@gmail.com', NULL, '2023-10-27 10:29:56', '2024-02-23 08:36:05', 12, 12, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- Dumping structure for table nanp.tcc030_seqnos
CREATE TABLE IF NOT EXISTS `tcc030_seqnos` (
  `prefix` varchar(3) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `seqno` int DEFAULT NULL,
  `nokbnname` varchar(40) DEFAULT NULL,
  `maxdigit` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`prefix`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table nanp.tcc030_seqnos: ~4 rows (approximately)
INSERT INTO `tcc030_seqnos` (`prefix`, `seqno`, `nokbnname`, `maxdigit`, `createdAt`, `updatedAt`) VALUES
	('IS', 3, 'Mã sản phẩm của cửa hàng', 6, '2024-01-09 16:19:07', '2024-01-10 02:03:10'),
	('KB', 12, '', 3, '2024-03-01 01:31:15', '2024-03-01 01:39:14'),
	('OD', 30, 'Mã đơn hàng', 6, '2024-01-10 02:01:37', '2024-03-01 09:26:05'),
	('RAM', 3, '', 3, '2024-03-01 01:12:50', '2024-03-01 01:19:28');

-- Dumping structure for table nanp.tin010_sts
CREATE TABLE IF NOT EXISTS `tin010_sts` (
  `SIPLNNO` varchar(16) NOT NULL,
  `ARVLCOMPFLG` varchar(1) DEFAULT '0',
  `SICOMPFLG` varchar(1) DEFAULT '0',
  `RSLTSENDFLG` varchar(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`SIPLNNO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table nanp.tin010_sts: ~0 rows (approximately)

-- Dumping structure for table nanp.tin020_planheds
CREATE TABLE IF NOT EXISTS `tin020_planheds` (
  `SIPLNNO` varchar(16) NOT NULL,
  `ARVLPLNDATE` datetime DEFAULT NULL,
  `SIREMARK` varchar(256) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `tin010StSIPLNNO` varchar(16) DEFAULT NULL,
  `SPPLYCD` int DEFAULT NULL,
  `USERCD` int DEFAULT NULL,
  PRIMARY KEY (`SIPLNNO`),
  KEY `tin010StSIPLNNO` (`tin010StSIPLNNO`),
  KEY `SPPLYCD` (`SPPLYCD`),
  KEY `USERCD` (`USERCD`),
  CONSTRAINT `tin020_planheds_ibfk_11` FOREIGN KEY (`tin010StSIPLNNO`) REFERENCES `tin010_sts` (`SIPLNNO`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tin020_planheds_ibfk_12` FOREIGN KEY (`SPPLYCD`) REFERENCES `sys_users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tin020_planheds_ibfk_13` FOREIGN KEY (`USERCD`) REFERENCES `sys_users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table nanp.tin020_planheds: ~0 rows (approximately)

-- Dumping structure for table nanp.tin040_plantdls
CREATE TABLE IF NOT EXISTS `tin040_plantdls` (
  `SIPLNNO` varchar(16) NOT NULL,
  `SODTLNO` int NOT NULL,
  `ARVLPLNQTY` int DEFAULT NULL,
  `ARVLPLNREMAINQTY` int DEFAULT NULL,
  `LIMITDATE` datetime DEFAULT NULL,
  `GUARANTEQTY` int DEFAULT NULL,
  `SIPRICE` double DEFAULT NULL,
  `SIDTLREMARK` varchar(256) DEFAULT NULL,
  `PRODUCTGRPCD` varchar(20) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `tin020PlanhedSIPLNNO` varchar(16) DEFAULT NULL,
  `PRODUCTCD` varchar(10) DEFAULT NULL,
  `productId` varchar(10) DEFAULT NULL,
  `QTYCD` varchar(2) DEFAULT NULL,
  `tmt140QualityQTYCD` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`SIPLNNO`,`SODTLNO`),
  KEY `tin020PlanhedSIPLNNO` (`tin020PlanhedSIPLNNO`),
  KEY `QTYCD` (`QTYCD`),
  KEY `tmt140QualityQTYCD` (`tmt140QualityQTYCD`),
  CONSTRAINT `tin040_plantdls_ibfk_10` FOREIGN KEY (`tin020PlanhedSIPLNNO`) REFERENCES `tin020_planheds` (`SIPLNNO`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tin040_plantdls_ibfk_11` FOREIGN KEY (`QTYCD`) REFERENCES `tmt140_qualities` (`QTYCD`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tin040_plantdls_ibfk_12` FOREIGN KEY (`tmt140QualityQTYCD`) REFERENCES `tmt140_qualities` (`QTYCD`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table nanp.tin040_plantdls: ~0 rows (approximately)

-- Dumping structure for table nanp.tmt050_names
CREATE TABLE IF NOT EXISTS `tmt050_names` (
  `RCDKBN` varchar(4) NOT NULL,
  `DATACD` varchar(40) NOT NULL,
  `DATANM` varchar(40) DEFAULT NULL,
  `STRRSRV1` varchar(256) DEFAULT NULL,
  `STRRSRV2` varchar(256) DEFAULT NULL,
  `STRRSRV3` varchar(256) DEFAULT NULL,
  `STRRSRV4` varchar(256) DEFAULT NULL,
  `STRRSRV5` varchar(256) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`RCDKBN`,`DATACD`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table nanp.tmt050_names: ~6 rows (approximately)
INSERT INTO `tmt050_names` (`RCDKBN`, `DATACD`, `DATANM`, `STRRSRV1`, `STRRSRV2`, `STRRSRV3`, `STRRSRV4`, `STRRSRV5`, `createdAt`, `updatedAt`) VALUES
	('0001', '001', 'Nhân viên công ty', NULL, NULL, NULL, NULL, NULL, '2024-01-11 08:09:31', '2024-01-11 08:09:32'),
	('0001', '002', 'Giao hàng nhanh', NULL, NULL, NULL, NULL, NULL, '2024-01-11 08:09:31', '2024-01-11 08:09:32'),
	('0001', '003', 'Giao hang tiết kiệm', NULL, NULL, NULL, NULL, NULL, '2024-01-11 08:09:31', '2024-01-11 08:09:32'),
	('0002', '001', 'Qua thẻ', NULL, NULL, NULL, NULL, NULL, '2024-01-11 08:11:17', '2024-01-11 08:11:18'),
	('0002', '002', 'Tiền mặt', NULL, NULL, NULL, NULL, NULL, '2024-01-11 08:11:17', '2024-01-11 08:11:18'),
	('0002', '003', 'Khi nhận hàng', NULL, NULL, NULL, NULL, NULL, '2024-01-11 08:11:17', '2024-01-11 08:11:18');

-- Dumping structure for table nanp.tmt120_branches
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table nanp.tmt120_branches: ~2 rows (approximately)
INSERT INTO `tmt120_branches` (`brnchcd`, `branch_name`, `branch_description`, `branch_zip`, `branch_address1`, `branch_address2`, `brnch_address3`, `brnch_tel`, `createdAt`, `updatedAt`) VALUES
	('001', 'HIPC', NULL, '530000', '05 Lâm hoàn', NULL, NULL, '0901948123', '2024-01-14 14:44:32', '2024-01-14 14:44:32'),
	('002', 'NANP', NULL, '530000', '112 Lê Đại Hành', NULL, NULL, '0901948124', '2024-01-14 14:44:32', '2024-01-14 14:44:32');

-- Dumping structure for table nanp.tmt130_lcnts
CREATE TABLE IF NOT EXISTS `tmt130_lcnts` (
  `LCTNCD` varchar(20) NOT NULL,
  `DESCRIPTION` varchar(255) DEFAULT NULL,
  `AREA` varchar(10) DEFAULT NULL,
  `FLOOR` varchar(10) DEFAULT NULL,
  `ROW` int DEFAULT NULL,
  `COLUNM` int DEFAULT NULL,
  `STATUS` varchar(1) DEFAULT NULL,
  `CAPACITY` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `BRNCHCD` varchar(10) DEFAULT NULL,
  `tmt120BranchBrnchcd` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`LCTNCD`),
  KEY `BRNCHCD` (`BRNCHCD`),
  KEY `tmt120BranchBrnchcd` (`tmt120BranchBrnchcd`),
  CONSTRAINT `tmt130_lcnts_ibfk_1` FOREIGN KEY (`BRNCHCD`) REFERENCES `tmt120_branches` (`brnchcd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tmt130_lcnts_ibfk_2` FOREIGN KEY (`tmt120BranchBrnchcd`) REFERENCES `tmt120_branches` (`brnchcd`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table nanp.tmt130_lcnts: ~2 rows (approximately)
INSERT INTO `tmt130_lcnts` (`LCTNCD`, `DESCRIPTION`, `AREA`, `FLOOR`, `ROW`, `COLUNM`, `STATUS`, `CAPACITY`, `createdAt`, `updatedAt`, `BRNCHCD`, `tmt120BranchBrnchcd`) VALUES
	('AAA-BBB-CCC', NULL, 'Khu A', 'Tầng 1', 2, 3, '0', 10, '2024-01-14 14:46:54', '2024-01-14 14:46:55', '001', '001'),
	('AAA-BBB-DDD', NULL, 'Khu A', 'Tầng 1', 2, 3, '0', 10, '2024-01-14 14:46:54', '2024-01-14 14:46:55', '001', '001');

-- Dumping structure for table nanp.tmt140_qualities
CREATE TABLE IF NOT EXISTS `tmt140_qualities` (
  `QTYCD` varchar(2) NOT NULL,
  `QTYNM` varchar(50) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`QTYCD`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table nanp.tmt140_qualities: ~3 rows (approximately)
INSERT INTO `tmt140_qualities` (`QTYCD`, `QTYNM`, `createdAt`, `updatedAt`) VALUES
	('01', 'Sản phẩm mới', '2024-01-14 15:59:59', '2024-01-14 16:00:00'),
	('02', 'Sản phẩm củ', '2024-01-14 16:00:19', '2024-01-14 16:00:20'),
	('03', 'Qua sử dụng', '2024-01-14 16:00:19', '2024-01-14 16:00:20');

-- Dumping structure for table nanp.tmt170_delimthds
CREATE TABLE IF NOT EXISTS `tmt170_delimthds` (
  `DELIMTHCD` varchar(4) NOT NULL,
  `DELIMTHNM` varchar(80) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`DELIMTHCD`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table nanp.tmt170_delimthds: ~3 rows (approximately)
INSERT INTO `tmt170_delimthds` (`DELIMTHCD`, `DELIMTHNM`, `createdAt`, `updatedAt`) VALUES
	('0001', 'Nhân viên giao hàng', '2024-01-14 14:48:31', '2024-01-14 14:48:32'),
	('0002', 'Giao hàng tiết kiệm', '2024-01-14 14:49:11', '2024-01-14 14:49:12'),
	('0003', 'Giao hàng nhanh', '2024-01-14 14:49:30', '2024-01-14 14:49:30');

-- Dumping structure for table nanp.tmt171_paymethds
CREATE TABLE IF NOT EXISTS `tmt171_paymethds` (
  `PAYMETHDCD` varchar(4) NOT NULL,
  `PAYMETHDNM` varchar(80) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`PAYMETHDCD`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table nanp.tmt171_paymethds: ~3 rows (approximately)
INSERT INTO `tmt171_paymethds` (`PAYMETHDCD`, `PAYMETHDNM`, `createdAt`, `updatedAt`) VALUES
	('01', 'Qua thẻ', '2024-01-14 14:49:47', '2024-01-14 14:49:48'),
	('02', 'Tiền mặt', '2024-01-14 14:49:47', '2024-01-14 14:49:48'),
	('03', 'Khi nhận hàng', '2024-01-14 14:50:13', '2024-01-14 14:50:13');

-- Dumping structure for table nanp.tmt340_formitemnms
CREATE TABLE IF NOT EXISTS `tmt340_formitemnms` (
  `id` int NOT NULL AUTO_INCREMENT,
  `lang` varchar(3) DEFAULT NULL,
  `title1` varchar(100) DEFAULT NULL,
  `title2` varchar(100) DEFAULT NULL,
  `vitri` int DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `menu_id` varchar(36) DEFAULT NULL,
  `sysMenuId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=556 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table nanp.tmt340_formitemnms: ~110 rows (approximately)
INSERT INTO `tmt340_formitemnms` (`id`, `lang`, `title1`, `title2`, `vitri`, `status`, `createdAt`, `updatedAt`, `menu_id`, `sysMenuId`) VALUES
	(111, 'vi', 'Trang chủ', 'Trang chủ', 1, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '6333e539021398275a67d83d', '6333e539021398275a67d83d'),
	(112, 'vi', 'Dashboard', 'Dashboard', 2, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '6333e539021398275a67d83d', '6333e539021398275a67d83d'),
	(113, 'vi', 'Demo Socket', 'Demo Socket', 3, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '6333e539021398275a67d83d', '6333e539021398275a67d83d'),
	(114, 'vi', 'tiêu đề 4', '', NULL, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '6333e539021398275a67d83d', '6333e539021398275a67d83d'),
	(115, 'vi', 'tiêu đề 5', '', NULL, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '6333e539021398275a67d83d', '6333e539021398275a67d83d'),
	(116, 'vi', 'tiêu đề 6', '', NULL, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '6333e539021398275a67d83d', '6333e539021398275a67d83d'),
	(117, 'vi', 'tiêu đề 7', '', NULL, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '6333e539021398275a67d83d', '6333e539021398275a67d83d'),
	(118, 'vi', 'tiêu đề 8', '', NULL, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '6333e539021398275a67d83d', '6333e539021398275a67d83d'),
	(119, 'vi', 'tiêu đề 9', '', NULL, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '6333e539021398275a67d83d', '6333e539021398275a67d83d'),
	(120, 'vi', 'tiêu đề 10', '', NULL, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '6333e539021398275a67d83d', '6333e539021398275a67d83d'),
	(121, 'vi', 'tiêu đề 12', '', NULL, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '6333e539021398275a67d83d', '6333e539021398275a67d83d'),
	(122, 'vi', 'tiêu đề 15', '', NULL, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '6333e539021398275a67d83d', '6333e539021398275a67d83d'),
	(123, 'vi', 'Home', '', NULL, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '632aaa31c8093b9a2007d170', '632aaa31c8093b9a2007d170'),
	(124, 'vi', 'Dashboard', '', NULL, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '632aaa31c8093b9a2007d170', '632aaa31c8093b9a2007d170'),
	(125, 'vi', 'Trang giám sát', '', NULL, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '632aaa31c8093b9a2007d170', '632aaa31c8093b9a2007d170'),
	(126, 'vi', 'tieu de 1', '', NULL, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '632aaa31c8093b9a2007d170', '632aaa31c8093b9a2007d170'),
	(127, 'vi', 'Home', '', NULL, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '6342463f334471db6e1b9a03', '6342463f334471db6e1b9a03'),
	(128, 'vi', 'Quản lý hệ thống', '', NULL, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '6342463f334471db6e1b9a03', '6342463f334471db6e1b9a03'),
	(129, 'vi', 'Quản lý xe', '', NULL, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '6342463f334471db6e1b9a03', '6342463f334471db6e1b9a03'),
	(130, 'vi', 'Tìm kiếm', '', NULL, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '6342463f334471db6e1b9a03', '6342463f334471db6e1b9a03'),
	(131, 'vi', 'Cài lại', '', NULL, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '6342463f334471db6e1b9a03', '6342463f334471db6e1b9a03'),
	(132, 'vi', 'Kết quả tìm kiếm', '', NULL, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '6342463f334471db6e1b9a03', '6342463f334471db6e1b9a03'),
	(133, 'vi', 'Biển số xe', '', NULL, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '6342463f334471db6e1b9a03', '6342463f334471db6e1b9a03'),
	(134, 'vi', 'Tên gợi nhợ', '', NULL, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '6342463f334471db6e1b9a03', '6342463f334471db6e1b9a03'),
	(135, 'vi', 'Trọng tải', '', NULL, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '6342463f334471db6e1b9a03', '6342463f334471db6e1b9a03'),
	(136, 'vi', 'Tên gợi nhớ', '', NULL, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '6342463f334471db6e1b9a03', '6342463f334471db6e1b9a03'),
	(137, 'vi', 'Trạng thái', '', NULL, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '6342463f334471db6e1b9a03', '6342463f334471db6e1b9a03'),
	(138, 'vi', 'Biển số xe', '', NULL, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '6342463f334471db6e1b9a03', '6342463f334471db6e1b9a03'),
	(139, 'vi', 'Cập nhật', '', NULL, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '6342463f334471db6e1b9a03', '6342463f334471db6e1b9a03'),
	(140, 'vi', 'Xóa', '', NULL, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '6342463f334471db6e1b9a03', '6342463f334471db6e1b9a03'),
	(141, 'vi', 'Thêm mới', '', NULL, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '6342463f334471db6e1b9a03', '6342463f334471db6e1b9a03'),
	(142, 'vi', 'Tìm kiếm số ODC', 'Tìm kiếm số ODC', NULL, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '6423986fbab829e7784d5f13', '6423986fbab829e7784d5f13'),
	(143, 'vi', 'Home', 'Home', NULL, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '6423986fbab829e7784d5f13', '6423986fbab829e7784d5f13'),
	(144, 'vi', 'Khách hàng', 'Khách hàng', NULL, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '6423986fbab829e7784d5f13', '6423986fbab829e7784d5f13'),
	(145, 'vi', 'Home', 'Home', 1, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '6423a489bab829e7784d6047', '6423a489bab829e7784d6047'),
	(146, 'vi', 'Quản ly hệ thống', 'Quản ly hệ thống', 2, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '6423a489bab829e7784d6047', '6423a489bab829e7784d6047'),
	(147, 'vi', 'Quản lý video hướng dẫn', 'Quản lý video hướng dẫn', 3, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '6423a489bab829e7784d6047', '6423a489bab829e7784d6047'),
	(148, 'vi', 'Id màn hình', 'Id màn hình', 4, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '6423a489bab829e7784d6047', '6423a489bab829e7784d6047'),
	(149, 'vi', 'Tìm kiếm', 'Tìm kiếm', 5, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '6423a489bab829e7784d6047', '6423a489bab829e7784d6047'),
	(150, 'vi', 'Làm mới', 'Làm mới', 6, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '6423a489bab829e7784d6047', '6423a489bab829e7784d6047'),
	(151, 'vi', 'Kết quả tìm kiếm', 'Kết quả tìm kiếm', 7, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '6423a489bab829e7784d6047', '6423a489bab829e7784d6047'),
	(152, 'vi', 'Thêm mới', 'Thêm mới', 8, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '6423a489bab829e7784d6047', '6423a489bab829e7784d6047'),
	(153, 'vi', 'Xóa tất cả', 'Xóa tất cả', 9, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '6423a489bab829e7784d6047', '6423a489bab829e7784d6047'),
	(154, 'vi', 'Cập nhật', 'Cập nhật', 10, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '6423a489bab829e7784d6047', '6423a489bab829e7784d6047'),
	(155, 'vi', 'Xóa', 'Xóa', 11, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '6423a489bab829e7784d6047', '6423a489bab829e7784d6047'),
	(156, 'vi', 'ID Youtube', 'ID Youtube', 12, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '6423a489bab829e7784d6047', '6423a489bab829e7784d6047'),
	(157, 'vi', 'Mã màn hình', 'Mã màn hình', 13, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '6423a489bab829e7784d6047', '6423a489bab829e7784d6047'),
	(158, 'vi', 'Tiêu đề', 'Tiêu đề', 14, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '6423a489bab829e7784d6047', '6423a489bab829e7784d6047'),
	(159, 'vi', 'Nội dung', 'Nội dung', 15, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '6423a489bab829e7784d6047', '6423a489bab829e7784d6047'),
	(160, 'vi', 'Hành động', 'Hành động', 16, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '6423a489bab829e7784d6047', '6423a489bab829e7784d6047'),
	(161, 'vi', 'Trang chủ', 'Trang chủ', 1, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '632aaa31c8093b9a2007d14b', '632aaa31c8093b9a2007d14b'),
	(162, 'vi', 'Bảng điều khiển', 'Bảng điều khiển', 2, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '632aaa31c8093b9a2007d14b', '632aaa31c8093b9a2007d14b'),
	(163, 'vi', 'Trang phân tích', 'Trang phân tích', 3, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '632aaa31c8093b9a2007d14b', '632aaa31c8093b9a2007d14b'),
	(164, 'ja', 'ホームページ', 'ホームページ', 1, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '632aaa31c8093b9a2007d14b', '632aaa31c8093b9a2007d14b'),
	(165, 'ja', 'ダッシュボード', 'ダッシュボード', 2, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '632aaa31c8093b9a2007d14b', '632aaa31c8093b9a2007d14b'),
	(166, 'ja', '分析ページ', '分析ページ', 3, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '632aaa31c8093b9a2007d14b', '632aaa31c8093b9a2007d14b'),
	(167, 'en', 'Dashboard', 'Dashboard', 2, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '632aaa31c8093b9a2007d14b', '632aaa31c8093b9a2007d14b'),
	(168, 'en', 'Analysis', 'Analysis', 3, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '632aaa31c8093b9a2007d14b', '632aaa31c8093b9a2007d14b'),
	(169, 'vi', 'Quản lý dử liệu SC', 'Quản lý dử liệu SC', 3, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '63343f59a5ada435bef9f4d6', '63343f59a5ada435bef9f4d6'),
	(170, 'vi', 'Cài lại', 'Cài lại', 6, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '63343f59a5ada435bef9f4d6', '63343f59a5ada435bef9f4d6'),
	(171, 'vi', 'Trang chủ', 'Trang chủ', 1, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '63343f59a5ada435bef9f4d6', '63343f59a5ada435bef9f4d6'),
	(172, 'vi', 'Hệ thống', 'Hệ thống', 2, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '63343f59a5ada435bef9f4d6', '63343f59a5ada435bef9f4d6'),
	(173, 'vi', 'Tiêu đề', 'Tiêu đề', 4, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '63343f59a5ada435bef9f4d6', '63343f59a5ada435bef9f4d6'),
	(174, 'vi', 'Tìm kiếm', 'Tìm kiếm', 5, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '63343f59a5ada435bef9f4d6', '63343f59a5ada435bef9f4d6'),
	(175, 'vi', 'Xóa tất cả', 'Xóa tất cả', 9, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '63343f59a5ada435bef9f4d6', '63343f59a5ada435bef9f4d6'),
	(176, 'vi', 'Tên trường 2', 'Tên trường 2', 11, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '63343f59a5ada435bef9f4d6', '63343f59a5ada435bef9f4d6'),
	(177, 'vi', 'Vị trí', 'Vị trí', 13, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '63343f59a5ada435bef9f4d6', '63343f59a5ada435bef9f4d6'),
	(178, 'vi', 'Ngôn ngữ', 'Ngôn ngữ', 12, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '63343f59a5ada435bef9f4d6', '63343f59a5ada435bef9f4d6'),
	(179, 'vi', 'Trang thái', 'Trang thái', 14, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '63343f59a5ada435bef9f4d6', '63343f59a5ada435bef9f4d6'),
	(180, 'vi', 'Hành động', 'Hành động', 15, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '63343f59a5ada435bef9f4d6', '63343f59a5ada435bef9f4d6'),
	(181, 'vi', 'Danh sách tiêu đề', 'Danh sách tiêu đề', 7, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '63343f59a5ada435bef9f4d6', '63343f59a5ada435bef9f4d6'),
	(182, 'vi', 'Thêm mới ', 'Thêm mới ', 8, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '63343f59a5ada435bef9f4d6', '63343f59a5ada435bef9f4d6'),
	(183, 'vi', 'Tên trường 1', 'Tên trường 1', 10, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '63343f59a5ada435bef9f4d6', '63343f59a5ada435bef9f4d6'),
	(184, 'ja', 'ヘッダーリスト', 'ヘッダーリスト', 7, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '63343f59a5ada435bef9f4d6', '63343f59a5ada435bef9f4d6'),
	(185, 'ja', 'ステータス', 'ステータス', 14, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '63343f59a5ada435bef9f4d6', '63343f59a5ada435bef9f4d6'),
	(186, 'ja', 'SCデータ管理', 'SCデータ管理', 3, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '63343f59a5ada435bef9f4d6', '63343f59a5ada435bef9f4d6'),
	(187, 'ja', 'ホームページ', 'ホームページ', 1, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '63343f59a5ada435bef9f4d6', '63343f59a5ada435bef9f4d6'),
	(188, 'ja', '新規追加', '新規追加', 8, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '63343f59a5ada435bef9f4d6', '63343f59a5ada435bef9f4d6'),
	(189, 'ja', 'アクション', 'アクション', 15, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '63343f59a5ada435bef9f4d6', '63343f59a5ada435bef9f4d6'),
	(190, 'ja', '検索', '検索', 5, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '63343f59a5ada435bef9f4d6', '63343f59a5ada435bef9f4d6'),
	(191, 'ja', 'すべて削除', 'すべて削除', 9, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '63343f59a5ada435bef9f4d6', '63343f59a5ada435bef9f4d6'),
	(192, 'ja', 'フィールド名2', 'フィールド名2', 11, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '63343f59a5ada435bef9f4d6', '63343f59a5ada435bef9f4d6'),
	(193, 'ja', 'システム', 'システム', 2, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '63343f59a5ada435bef9f4d6', '63343f59a5ada435bef9f4d6'),
	(194, 'ja', 'タイトル', 'タイトル', 4, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '63343f59a5ada435bef9f4d6', '63343f59a5ada435bef9f4d6'),
	(195, 'ja', 'リセット', 'リセット', 6, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '63343f59a5ada435bef9f4d6', '63343f59a5ada435bef9f4d6'),
	(196, 'ja', 'フィールド名1', 'フィールド名1', 10, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '63343f59a5ada435bef9f4d6', '63343f59a5ada435bef9f4d6'),
	(197, 'ja', '言語', '言語', 12, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '63343f59a5ada435bef9f4d6', '63343f59a5ada435bef9f4d6'),
	(198, 'ja', '位置', '位置', 13, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '63343f59a5ada435bef9f4d6', '63343f59a5ada435bef9f4d6'),
	(199, 'en', 'System', 'System', 2, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '63343f59a5ada435bef9f4d6', '63343f59a5ada435bef9f4d6'),
	(200, 'en', 'Search', 'Search', 5, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '63343f59a5ada435bef9f4d6', '63343f59a5ada435bef9f4d6'),
	(201, 'en', 'Delete all', 'Delete all', 9, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '63343f59a5ada435bef9f4d6', '63343f59a5ada435bef9f4d6'),
	(202, 'en', 'Location', 'Location', 13, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '63343f59a5ada435bef9f4d6', '63343f59a5ada435bef9f4d6'),
	(203, 'en', 'Action', 'Action', 15, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '63343f59a5ada435bef9f4d6', '63343f59a5ada435bef9f4d6'),
	(204, 'en', 'SC management', 'SC management', 3, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '63343f59a5ada435bef9f4d6', '63343f59a5ada435bef9f4d6'),
	(205, 'en', 'School name 1', 'School name 1', 10, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '63343f59a5ada435bef9f4d6', '63343f59a5ada435bef9f4d6'),
	(206, 'en', 'Status', 'Status', 14, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '63343f59a5ada435bef9f4d6', '63343f59a5ada435bef9f4d6'),
	(207, 'en', 'Home', 'Home', 1, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '63343f59a5ada435bef9f4d6', '63343f59a5ada435bef9f4d6'),
	(208, 'en', 'Title', 'Title', 4, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '63343f59a5ada435bef9f4d6', '63343f59a5ada435bef9f4d6'),
	(209, 'en', 'Reinstall', 'Reinstall', 6, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '63343f59a5ada435bef9f4d6', '63343f59a5ada435bef9f4d6'),
	(210, 'en', 'Title list', 'Title list', 7, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '63343f59a5ada435bef9f4d6', '63343f59a5ada435bef9f4d6'),
	(211, 'en', 'School name 2', 'School name 2', 11, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '63343f59a5ada435bef9f4d6', '63343f59a5ada435bef9f4d6'),
	(212, 'en', 'Add new', 'Add new', 8, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '63343f59a5ada435bef9f4d6', '63343f59a5ada435bef9f4d6'),
	(213, 'en', 'Language', 'Language', 12, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '63343f59a5ada435bef9f4d6', '63343f59a5ada435bef9f4d6'),
	(214, 'vi', 'Xóa', 'Xóa', 17, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '63343f59a5ada435bef9f4d6', '63343f59a5ada435bef9f4d6'),
	(215, 'vi', 'Cập nhật', 'Cập nhật', 16, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '63343f59a5ada435bef9f4d6', '63343f59a5ada435bef9f4d6'),
	(216, 'en', 'Delete', 'Delete', 17, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '63343f59a5ada435bef9f4d6', '63343f59a5ada435bef9f4d6'),
	(217, 'ja', '更新', '更新', 16, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '63343f59a5ada435bef9f4d6', '63343f59a5ada435bef9f4d6'),
	(218, 'ja', '消去', '消去', 17, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '63343f59a5ada435bef9f4d6', '63343f59a5ada435bef9f4d6'),
	(219, 'en', 'Update', 'Update', 16, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '63343f59a5ada435bef9f4d6', '63343f59a5ada435bef9f4d6'),
	(220, 'en', 'Home', 'Home', 1, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '632aaa31c8093b9a2007d14b', '632aaa31c8093b9a2007d14b'),
	(221, 'vi', 'Trang chủ', 'Trang chủ', 1, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '64867ffcef5220e488de1d7b', '64867ffcef5220e488de1d7b'),
	(222, 'vi', 'Sản phẩm', 'Sản phẩm', 2, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '64867ffcef5220e488de1d7b', '64867ffcef5220e488de1d7b'),
	(223, 'vi', 'Tìm kiếm sản phẩm', 'Tìm kiếm sản phẩm', 3, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '64867ffcef5220e488de1d7b', '64867ffcef5220e488de1d7b'),
	(224, 'vi', 'Trang chủ', 'Trang chủ', 1, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '659f392fc107355a45774639', '659f392fc107355a45774639'),
	(225, 'vi', 'Xuất hàng', 'Xuất hàng', 2, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '659f392fc107355a45774639', '659f392fc107355a45774639'),
	(226, 'vi', 'Đơn hàng', 'Đơn hàng', 3, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '659f392fc107355a45774639', '659f392fc107355a45774639'),
	(227, 'vi', 'Trang chủ', 'Trang chủ', 1, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '65e13c49dc2c733cc836158c', '65e13c49dc2c733cc836158c'),
	(228, 'vi', 'Nhập hàng', 'Nhập hàng', 2, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '65e13c49dc2c733cc836158c', '65e13c49dc2c733cc836158c'),
	(229, 'vi', 'Đăng ký nhập hàng', 'Đăng ký nhập hàng', 3, 1, '2023-10-24 07:17:05', '2023-10-24 07:17:05', '65e13c49dc2c733cc836158c', '65e13c49dc2c733cc836158c');

-- Dumping structure for table nanp.tmt341_files
CREATE TABLE IF NOT EXISTS `tmt341_files` (
  `id` int NOT NULL AUTO_INCREMENT,
  `filename` varchar(100) DEFAULT NULL,
  `path` varchar(100) DEFAULT NULL,
  `typefile` varchar(20) DEFAULT NULL,
  `sizefile` varchar(10) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `user_id` int DEFAULT NULL,
  `sysUserId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `sysUserId` (`sysUserId`),
  CONSTRAINT `tmt341_files_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `sys_users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tmt341_files_ibfk_2` FOREIGN KEY (`sysUserId`) REFERENCES `sys_users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table nanp.tmt341_files: ~0 rows (approximately)

-- Dumping structure for table nanp.tot010_sts
CREATE TABLE IF NOT EXISTS `tot010_sts` (
  `SOODNO` varchar(16) NOT NULL,
  `QTESTS` tinyint(1) DEFAULT '0',
  `ORDSTS` tinyint(1) DEFAULT '0',
  `ORDAPPSTS` tinyint(1) DEFAULT '0',
  `PAYSTS` tinyint(1) DEFAULT '0',
  `SHIPSTS` tinyint(1) DEFAULT '0',
  `RSLTSENDFLG` tinyint(1) DEFAULT '0',
  `SOCNCLORDFLG` tinyint(1) DEFAULT '0',
  `SOCNCLCOMPFLG` tinyint(1) DEFAULT '0',
  `EXCHANGEFLG` tinyint(1) DEFAULT '0',
  `EXCHANGECOMPFLG` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`SOODNO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table nanp.tot010_sts: ~0 rows (approximately)
INSERT INTO `tot010_sts` (`SOODNO`, `QTESTS`, `ORDSTS`, `ORDAPPSTS`, `PAYSTS`, `SHIPSTS`, `RSLTSENDFLG`, `SOCNCLORDFLG`, `SOCNCLCOMPFLG`, `EXCHANGEFLG`, `EXCHANGECOMPFLG`, `createdAt`, `updatedAt`) VALUES
	('OD010324000024', 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2024-03-01 08:44:04', '2024-03-01 09:03:08'),
	('OD010324000025', 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2024-03-01 08:48:59', '2024-03-01 08:51:46'),
	('OD010324000026', 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2024-03-01 08:59:43', '2024-03-01 09:00:09'),
	('OD010324000027', 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2024-03-01 09:16:18', '2024-03-01 09:17:12'),
	('OD010324000028', 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2024-03-01 09:23:12', '2024-03-01 09:23:45'),
	('OD010324000029', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2024-03-01 09:26:05', '2024-03-01 09:26:05');

-- Dumping structure for table nanp.tot020_ordheds
CREATE TABLE IF NOT EXISTS `tot020_ordheds` (
  `SOODNO` varchar(16) NOT NULL,
  `ORDERDATE` datetime DEFAULT NULL,
  `PAYOFDATE` datetime DEFAULT NULL,
  `SHIPDATE` datetime DEFAULT NULL,
  `SOPLNDATE` datetime DEFAULT NULL,
  `DELIPLNDATE` datetime DEFAULT NULL,
  `DEPOSIT` int DEFAULT NULL,
  `ODDISCONT` int DEFAULT NULL,
  `INSTALLFEE` int DEFAULT NULL,
  `TAX` int DEFAULT NULL,
  `POSTPAIDFLG` tinyint(1) DEFAULT NULL,
  `SOREMARK` varchar(256) DEFAULT NULL,
  `PACKQTY` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `tot010StSOODNO` varchar(16) DEFAULT NULL,
  `DELIMTHDCD` varchar(4) DEFAULT NULL,
  `tmt170DelimthdDELIMTHCD` varchar(4) DEFAULT NULL,
  `PAYMETHDCD` varchar(4) DEFAULT NULL,
  `tmt171PaymethdPAYMETHDCD` varchar(4) DEFAULT NULL,
  `USERCD` int DEFAULT NULL,
  `CSTMCD` int DEFAULT NULL,
  PRIMARY KEY (`SOODNO`),
  KEY `tot010StSOODNO` (`tot010StSOODNO`),
  KEY `DELIMTHDCD` (`DELIMTHDCD`),
  KEY `tmt170DelimthdDELIMTHCD` (`tmt170DelimthdDELIMTHCD`),
  KEY `PAYMETHDCD` (`PAYMETHDCD`),
  KEY `tmt171PaymethdPAYMETHDCD` (`tmt171PaymethdPAYMETHDCD`),
  KEY `USERCD` (`USERCD`),
  KEY `CSTMCD` (`CSTMCD`),
  CONSTRAINT `tot020_ordheds_ibfk_1717` FOREIGN KEY (`tot010StSOODNO`) REFERENCES `tot010_sts` (`SOODNO`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tot020_ordheds_ibfk_1718` FOREIGN KEY (`DELIMTHDCD`) REFERENCES `tmt170_delimthds` (`DELIMTHCD`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tot020_ordheds_ibfk_1719` FOREIGN KEY (`tmt170DelimthdDELIMTHCD`) REFERENCES `tmt170_delimthds` (`DELIMTHCD`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tot020_ordheds_ibfk_1720` FOREIGN KEY (`PAYMETHDCD`) REFERENCES `tmt171_paymethds` (`PAYMETHDCD`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tot020_ordheds_ibfk_1721` FOREIGN KEY (`tmt171PaymethdPAYMETHDCD`) REFERENCES `tmt171_paymethds` (`PAYMETHDCD`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tot020_ordheds_ibfk_1722` FOREIGN KEY (`USERCD`) REFERENCES `sys_users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tot020_ordheds_ibfk_1723` FOREIGN KEY (`CSTMCD`) REFERENCES `sys_users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table nanp.tot020_ordheds: ~0 rows (approximately)
INSERT INTO `tot020_ordheds` (`SOODNO`, `ORDERDATE`, `PAYOFDATE`, `SHIPDATE`, `SOPLNDATE`, `DELIPLNDATE`, `DEPOSIT`, `ODDISCONT`, `INSTALLFEE`, `TAX`, `POSTPAIDFLG`, `SOREMARK`, `PACKQTY`, `createdAt`, `updatedAt`, `tot010StSOODNO`, `DELIMTHDCD`, `tmt170DelimthdDELIMTHCD`, `PAYMETHDCD`, `tmt171PaymethdPAYMETHDCD`, `USERCD`, `CSTMCD`) VALUES
	('OD010324000024', '2024-03-01 08:44:26', NULL, '2024-03-01 08:44:29', NULL, NULL, 0, 0, 0, 0, 0, '', 0, '2024-03-01 08:44:04', '2024-03-01 09:03:08', 'OD010324000024', '0001', '0001', '01', '01', 1, 8),
	('OD010324000025', NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, '', 0, '2024-03-01 08:48:59', '2024-03-01 08:51:46', 'OD010324000025', NULL, NULL, NULL, NULL, 1, 8),
	('OD010324000026', NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, '', 0, '2024-03-01 08:59:43', '2024-03-01 09:00:09', 'OD010324000026', NULL, NULL, NULL, NULL, 1, 8),
	('OD010324000027', NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, '', 0, '2024-03-01 09:16:18', '2024-03-01 09:17:12', 'OD010324000027', NULL, NULL, NULL, NULL, 1, 8),
	('OD010324000028', NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, '', 0, '2024-03-01 09:23:12', '2024-03-01 09:23:45', 'OD010324000028', NULL, NULL, NULL, NULL, 1, 9),
	('OD010324000029', NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, '', 0, '2024-03-01 09:26:05', '2024-03-01 09:26:05', 'OD010324000029', NULL, NULL, NULL, NULL, 1, NULL);

-- Dumping structure for table nanp.tot040_orddtls
CREATE TABLE IF NOT EXISTS `tot040_orddtls` (
  `SOODNO` varchar(16) NOT NULL,
  `SODTLNO` int NOT NULL,
  `SOPRICE` double DEFAULT NULL,
  `SHIPMNTORDQTY` int DEFAULT NULL,
  `SHIPMNTORDREMAINQTY` int DEFAULT NULL,
  `SOREMARK` varchar(256) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `PRODUCTCD` varchar(10) DEFAULT NULL,
  `productId` varchar(10) DEFAULT NULL,
  `QTYCD` varchar(2) DEFAULT NULL,
  `tmt140QualityQTYCD` varchar(2) DEFAULT NULL,
  `PRODUCTGROUPCD` varchar(20) DEFAULT NULL,
  `tot020OrdhedSOODNO` varchar(16) DEFAULT NULL,
  PRIMARY KEY (`SOODNO`,`SODTLNO`),
  KEY `QTYCD` (`QTYCD`),
  KEY `tmt140QualityQTYCD` (`tmt140QualityQTYCD`),
  KEY `tot020OrdhedSOODNO` (`tot020OrdhedSOODNO`),
  CONSTRAINT `tot040_orddtls_ibfk_157` FOREIGN KEY (`QTYCD`) REFERENCES `tmt140_qualities` (`QTYCD`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tot040_orddtls_ibfk_158` FOREIGN KEY (`tmt140QualityQTYCD`) REFERENCES `tmt140_qualities` (`QTYCD`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tot040_orddtls_ibfk_159` FOREIGN KEY (`tot020OrdhedSOODNO`) REFERENCES `tot020_ordheds` (`SOODNO`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table nanp.tot040_orddtls: ~0 rows (approximately)
INSERT INTO `tot040_orddtls` (`SOODNO`, `SODTLNO`, `SOPRICE`, `SHIPMNTORDQTY`, `SHIPMNTORDREMAINQTY`, `SOREMARK`, `createdAt`, `updatedAt`, `PRODUCTCD`, `productId`, `QTYCD`, `tmt140QualityQTYCD`, `PRODUCTGROUPCD`, `tot020OrdhedSOODNO`) VALUES
	('OD010324000024', 1, 300000, 1, 3, '', '2024-03-01 09:03:08', '2024-03-01 09:03:08', 'KB001', 'KB001', '01', '01', 'KB001', 'OD010324000024'),
	('OD010324000024', 2, 2000000, 1, 2, '', '2024-03-01 09:03:08', '2024-03-01 09:03:08', 'CPU001', 'CPU001', '01', '01', 'CPU001', 'OD010324000024'),
	('OD010324000025', 1, 2000000, 1, 2, '', '2024-03-01 08:51:46', '2024-03-01 08:51:46', 'CPU001', 'CPU001', '01', '01', 'CPU001011000000', 'OD010324000025'),
	('OD010324000025', 2, 1000000, 1, 1, '', '2024-03-01 08:51:46', '2024-03-01 08:51:46', 'CPU001', 'CPU001', '02', '02', 'CPU00102600000', 'OD010324000025'),
	('OD010324000025', 3, 300000, 1, 3, '', '2024-03-01 08:51:46', '2024-03-01 08:51:46', 'KB001', 'KB001', '01', '01', 'KB00101120000', 'OD010324000025'),
	('OD010324000026', 1, 300000, 1, 3, '', '2024-03-01 09:00:09', '2024-03-01 09:00:09', 'KB001', 'KB001', '01', '01', 'KB00101120000', 'OD010324000026'),
	('OD010324000026', 2, 2000000, 1, 2, '', '2024-03-01 09:00:09', '2024-03-01 09:00:09', 'CPU001', 'CPU001', '01', '01', 'CPU001011000000', 'OD010324000026'),
	('OD010324000026', 3, 1000000, 1, 1, '', '2024-03-01 09:00:09', '2024-03-01 09:00:09', 'CPU001', 'CPU001', '02', '02', 'CPU00102600000', 'OD010324000026'),
	('OD010324000026', 4, 600000, 1, 1, '', '2024-03-01 09:00:09', '2024-03-01 09:00:09', 'CPU001', 'CPU001', '02', '02', 'CPU00102200000', 'OD010324000026'),
	('OD010324000027', 1, 300000, 2, 3, '', '2024-03-01 09:17:12', '2024-03-01 09:17:12', 'KB001', 'KB001', '01', '01', 'KB00101120000', 'OD010324000027'),
	('OD010324000027', 2, 2000000, 2, 2, '', '2024-03-01 09:17:12', '2024-03-01 09:17:12', 'CPU001', 'CPU001', '01', '01', 'CPU001011000000', 'OD010324000027'),
	('OD010324000027', 3, 1000000, 1, 1, '', '2024-03-01 09:17:12', '2024-03-01 09:17:12', 'CPU001', 'CPU001', '02', '02', 'CPU00102600000', 'OD010324000027'),
	('OD010324000028', 1, 300000, 1, 3, '', '2024-03-01 09:23:45', '2024-03-01 09:23:45', 'KB001', 'KB001', '01', '01', 'KB00101120000', 'OD010324000028'),
	('OD010324000028', 2, 2000000, 1, 2, '', '2024-03-01 09:23:45', '2024-03-01 09:23:45', 'CPU001', 'CPU001', '01', '01', 'CPU001011000000', 'OD010324000028'),
	('OD010324000028', 3, 1000000, 1, 1, '', '2024-03-01 09:23:45', '2024-03-01 09:23:45', 'CPU001', 'CPU001', '02', '02', 'CPU00102600000', 'OD010324000028');

-- Dumping structure for table nanp.tst010_stcks
CREATE TABLE IF NOT EXISTS `tst010_stcks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `SERIALNUM` varchar(16) DEFAULT NULL,
  `PURPIRCE` double DEFAULT NULL,
  `SELLPIRCE` double DEFAULT NULL,
  `ALLWQTY` int DEFAULT NULL,
  `STCKQTY` int DEFAULT NULL,
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
  `PRODUCTCD` varchar(10) DEFAULT NULL,
  `productId` varchar(10) DEFAULT NULL,
  `BRNCHCD` varchar(10) DEFAULT NULL,
  `tmt120BranchBrnchcd` varchar(10) DEFAULT NULL,
  `SUPPLYCD` int DEFAULT NULL,
  `sysUserId` int DEFAULT NULL,
  `MANUFACTTURECD` int DEFAULT NULL,
  `EMPLOYEECD` int DEFAULT NULL,
  `LCTNCD` varchar(20) DEFAULT NULL,
  `tmt130LcntLCTNCD` varchar(20) DEFAULT NULL,
  `QTYCD` varchar(2) DEFAULT NULL,
  `tmt140QualityQTYCD` varchar(2) DEFAULT NULL,
  `TECHNICALPRICE` double DEFAULT '0',
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
  CONSTRAINT `tst010_stcks_ibfk_2171` FOREIGN KEY (`BRNCHCD`) REFERENCES `tmt120_branches` (`brnchcd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_2172` FOREIGN KEY (`tmt120BranchBrnchcd`) REFERENCES `tmt120_branches` (`brnchcd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_2173` FOREIGN KEY (`SUPPLYCD`) REFERENCES `sys_users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_2174` FOREIGN KEY (`sysUserId`) REFERENCES `sys_users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_2175` FOREIGN KEY (`MANUFACTTURECD`) REFERENCES `sys_users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_2176` FOREIGN KEY (`EMPLOYEECD`) REFERENCES `sys_users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_2177` FOREIGN KEY (`LCTNCD`) REFERENCES `tmt130_lcnts` (`LCTNCD`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_2178` FOREIGN KEY (`tmt130LcntLCTNCD`) REFERENCES `tmt130_lcnts` (`LCTNCD`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_2179` FOREIGN KEY (`QTYCD`) REFERENCES `tmt140_qualities` (`QTYCD`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tst010_stcks_ibfk_2180` FOREIGN KEY (`tmt140QualityQTYCD`) REFERENCES `tmt140_qualities` (`QTYCD`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table nanp.tst010_stcks: ~7 rows (approximately)
INSERT INTO `tst010_stcks` (`id`, `SERIALNUM`, `PURPIRCE`, `SELLPIRCE`, `ALLWQTY`, `STCKQTY`, `RECEIVEDATE`, `LIMITDATE`, `IMAGE`, `DESCRIPTION`, `STATUS`, `STRRSRV1`, `STRRSRV2`, `STRRSRV3`, `STRRSRV4`, `STRRSRV5`, `createdAt`, `updatedAt`, `PRODUCTCD`, `productId`, `BRNCHCD`, `tmt120BranchBrnchcd`, `SUPPLYCD`, `sysUserId`, `MANUFACTTURECD`, `EMPLOYEECD`, `LCTNCD`, `tmt130LcntLCTNCD`, `QTYCD`, `tmt140QualityQTYCD`, `TECHNICALPRICE`) VALUES
	(1, 'SR140124000001', 120000, 300000, 1, 1, '2024-01-14 14:53:29', '2026-01-14 14:53:31', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, '2024-01-14 14:54:25', '2024-01-14 14:54:26', 'KB001', 'KB001', '001', '001', 18, 18, 8, 1, 'AAA-BBB-CCC', 'AAA-BBB-CCC', '01', '01', 150000),
	(2, 'SR140124000002', 120000, 300000, 1, 1, '2024-01-14 14:53:29', '2026-01-14 14:53:31', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, '2024-01-14 14:54:25', '2024-01-14 14:54:26', 'KB001', 'KB001', '001', '001', 18, 18, 8, 1, 'AAA-BBB-CCC', 'AAA-BBB-CCC', '01', '01', 150000),
	(3, 'SR140124000003', 120000, 300000, 1, 1, '2024-01-14 14:53:29', '2026-01-14 14:53:31', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, '2024-01-14 14:54:25', '2024-01-14 14:54:26', 'KB001', 'KB001', '001', '001', 18, 18, 8, 1, 'AAA-BBB-CCC', 'AAA-BBB-CCC', '01', '01', 150000),
	(4, 'SR140124000004', 1000000, 2000000, 1, 1, '2024-01-14 14:53:29', '2026-01-14 14:53:31', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, '2024-01-14 14:54:25', '2024-01-14 14:54:26', 'CPU001', 'CPU001', '001', '001', 18, 18, 8, 1, 'AAA-BBB-DDD', 'AAA-BBB-DDD', '01', '01', 1500000),
	(5, 'SR140124000005', 1000000, 2000000, 1, 1, '2024-01-14 14:53:29', '2026-01-14 14:53:31', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, '2024-01-14 14:54:25', '2024-01-14 14:54:26', 'CPU001', 'CPU001', '001', '001', 18, 18, 8, 1, 'AAA-BBB-DDD', 'AAA-BBB-DDD', '01', '01', 1500000),
	(6, 'SR140124000006', 600000, 1000000, 1, 1, '2024-01-14 14:53:29', '2026-01-14 14:53:31', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, '2024-01-14 14:54:25', '2024-01-14 14:54:26', 'CPU001', 'CPU001', '001', '001', 18, 18, 8, 1, 'AAA-BBB-DDD', 'AAA-BBB-DDD', '02', '02', 750000),
	(7, 'SR140124000007', 200000, 600000, 1, 1, '2024-01-14 14:53:29', '2026-01-14 14:53:31', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, '2024-01-14 14:54:25', '2024-01-14 14:54:26', 'CPU001', 'CPU001', '001', '001', 18, 18, 8, 1, 'AAA-BBB-DDD', 'AAA-BBB-DDD', '02', '02', 300000);

-- Dumping structure for table nanp.user_role
CREATE TABLE IF NOT EXISTS `user_role` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `sysUserId` int NOT NULL,
  `sysRoleId` int NOT NULL,
  PRIMARY KEY (`sysUserId`,`sysRoleId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table nanp.user_role: ~14 rows (approximately)
INSERT INTO `user_role` (`createdAt`, `updatedAt`, `sysUserId`, `sysRoleId`) VALUES
	('2023-10-24 07:02:29', '2023-10-24 07:02:29', 1, 1),
	('2023-10-24 07:02:29', '2023-10-24 07:02:29', 1, 2),
	('2023-10-24 07:02:29', '2023-10-24 07:02:29', 1, 3),
	('2023-10-24 07:02:29', '2023-10-24 07:02:29', 1, 4),
	('2023-10-24 07:03:37', '2023-10-24 07:03:37', 2, 2),
	('2023-10-24 07:03:38', '2023-10-24 07:03:38', 3, 2),
	('2023-10-24 07:03:40', '2023-10-24 07:03:40', 4, 2),
	('2023-10-24 07:03:41', '2023-10-24 07:03:41', 5, 2),
	('2023-10-24 07:03:42', '2023-10-24 07:03:42', 6, 2),
	('2023-10-24 07:03:44', '2023-10-24 07:03:44', 7, 2),
	('2023-10-26 02:13:10', '2023-10-26 02:13:10', 8, 2),
	('2023-10-26 02:17:53', '2023-10-26 02:17:53', 9, 2),
	('2023-10-27 07:44:39', '2023-10-27 07:44:39', 17, 2),
	('2023-10-27 10:29:56', '2023-10-27 10:29:56', 18, 2);

-- Dumping structure for table nanp.variation_color
CREATE TABLE IF NOT EXISTS `variation_color` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `productVariationId` int NOT NULL,
  `productColorId` int NOT NULL,
  PRIMARY KEY (`productVariationId`,`productColorId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table nanp.variation_color: ~0 rows (approximately)

-- Dumping structure for table nanp.variation_size
CREATE TABLE IF NOT EXISTS `variation_size` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `productVariationId` int NOT NULL,
  `productSizeId` int NOT NULL,
  PRIMARY KEY (`productVariationId`,`productSizeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table nanp.variation_size: ~0 rows (approximately)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
