-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.27-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for mariano_cms
DROP DATABASE IF EXISTS `mariano_cms`;
CREATE DATABASE IF NOT EXISTS `mariano_cms` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci */;
USE `mariano_cms`;

-- Dumping structure for table mariano_cms.categories
DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table mariano_cms.categories: ~4 rows (approximately)
REPLACE INTO `categories` (`id`, `category`) VALUES
	(1, 'hardware'),
	(2, 'software'),
	(4, 'electronicas'),
	(7, 'HELADERAS');

-- Dumping structure for table mariano_cms.rating_technicians
DROP TABLE IF EXISTS `rating_technicians`;
CREATE TABLE IF NOT EXISTS `rating_technicians` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `requirementId` int(11) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `ratedBy` int(11) NOT NULL,
  `technicianId` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table mariano_cms.rating_technicians: ~4 rows (approximately)
REPLACE INTO `rating_technicians` (`id`, `createdAt`, `updatedAt`, `requirementId`, `rating`, `ratedBy`, `technicianId`) VALUES
	(1, '2023-02-23 02:57:52', '2023-02-28 19:54:45', 10, 2, 1, 2),
	(2, '2023-02-24 21:36:34', '2023-02-28 19:54:52', 11, 5, 1, 3),
	(3, '2023-02-26 23:53:25', '2023-02-28 19:55:13', 12, 5, 1, 1),
	(4, '2023-02-27 23:56:17', '2023-02-28 19:55:23', 14, 4, 1, 1);

-- Dumping structure for table mariano_cms.requirements
DROP TABLE IF EXISTS `requirements`;
CREATE TABLE IF NOT EXISTS `requirements` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `priority` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `description` varchar(200) NOT NULL,
  `userId` int(11) NOT NULL,
  `typeId` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `status` varchar(50) DEFAULT 'pending',
  `anotation` varchar(300) DEFAULT NULL,
  `technicianId` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table mariano_cms.requirements: ~7 rows (approximately)
REPLACE INTO `requirements` (`id`, `priority`, `title`, `description`, `userId`, `typeId`, `createdAt`, `deletedAt`, `updatedAt`, `status`, `anotation`, `technicianId`) VALUES
	(9, 8, 'Problema monitor PROBLEMAS', 'no prende cuando apreto botones', 10, 3, '2023-03-07 23:30:38', NULL, '2023-02-28 22:32:02', 'resolved', NULL, 1),
	(10, 6, 'problema correo', 'no envia', 10, 8, '2023-01-28 22:08:12', NULL, '2023-02-17 02:28:38', 'resolved', 'reparado en llamada probando configuraciones distintas', 2),
	(11, 9, 'problema monitors', 'no se porque no prendes', 10, 10, '2023-01-31 16:18:54', NULL, '2023-02-14 23:37:12', 'tutorial_sent', NULL, 3),
	(12, 5, 'El teclado esta en lenguaje incorrecto', 'teclado en latino', 10, 8, '2023-01-31 19:01:50', NULL, '2023-02-26 23:49:24', 'resolved', NULL, 1),
	(13, 8, 'Problema de office', 'Instale el serial key pero sigue diciendo que esta free version', 10, 9, '2023-01-31 21:14:47', NULL, '2023-01-31 21:14:47', 'resolved', NULL, 2),
	(14, 4, 'problema con eco', 'tengo un mic genius , mucho eco', 1, 5, '2023-02-27 23:55:45', NULL, '2023-02-27 23:56:06', 'resolved', 'Problema resuelto , faltaba actualizacion de windows', 1),
	(16, 5, 'problema con mi office no carga', 'tengo windows 11', 1, 9, '2023-02-28 21:20:25', NULL, '2023-02-28 21:20:25', 'pending', NULL, 7);

-- Dumping structure for table mariano_cms.rols
DROP TABLE IF EXISTS `rols`;
CREATE TABLE IF NOT EXISTS `rols` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rol` varchar(50) NOT NULL,
  `description` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table mariano_cms.rols: ~3 rows (approximately)
REPLACE INTO `rols` (`id`, `rol`, `description`) VALUES
	(1, 'administrador', ''),
	(2, 'tecnico', ''),
	(3, 'usuario', '');

-- Dumping structure for table mariano_cms.rolusers
DROP TABLE IF EXISTS `rolusers`;
CREATE TABLE IF NOT EXISTS `rolusers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rolId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table mariano_cms.rolusers: ~14 rows (approximately)
REPLACE INTO `rolusers` (`id`, `rolId`, `userId`, `createdAt`, `updatedAt`) VALUES
	(1, 1, 1, NULL, NULL),
	(2, 2, 1, NULL, NULL),
	(10, 1, 7, '2023-01-19 03:47:10', '2023-01-19 03:47:10'),
	(11, 2, 7, '2023-01-19 03:47:10', '2023-01-19 03:47:10'),
	(14, 1, 9, '2023-01-24 22:10:58', '2023-01-24 22:10:58'),
	(15, 2, 9, '2023-01-24 22:10:58', '2023-01-24 22:10:58'),
	(16, 1, 10, '2023-01-24 22:13:30', '2023-01-24 22:13:30'),
	(17, 2, 10, '2023-01-24 22:13:30', '2023-01-24 22:13:30'),
	(21, 1, 8, '2023-01-27 00:17:28', '2023-01-27 00:17:28'),
	(22, 2, 2, '2023-02-14 23:43:23', '2023-02-14 23:43:23'),
	(23, 3, 2, '2023-02-14 23:43:23', '2023-02-14 23:43:23'),
	(24, 1, 11, '2023-02-27 23:57:15', '2023-02-27 23:57:15'),
	(25, 2, 11, '2023-02-27 23:57:15', '2023-02-27 23:57:15'),
	(28, 1, 12, '2023-02-28 21:21:35', '2023-02-28 21:21:35');

-- Dumping structure for table mariano_cms.tutorials
DROP TABLE IF EXISTS `tutorials`;
CREATE TABLE IF NOT EXISTS `tutorials` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `path` varchar(80) NOT NULL,
  `typeId` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table mariano_cms.tutorials: ~4 rows (approximately)
REPLACE INTO `tutorials` (`id`, `name`, `path`, `typeId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
	(1, 'Como instalar windows?', 'instalar-windows.pdf', 10, NULL, NULL, NULL),
	(2, 'Como bloquear Spam por correo?', 'spam-correo-bloquear.pdf', 8, NULL, NULL, NULL),
	(3, 'Camara Web instalacion', 'camara-web.pdf', 19, NULL, NULL, NULL),
	(4, 'Problema de Pantala VSYNC', 'Vsync-fix.pdf', 3, NULL, NULL, NULL);

-- Dumping structure for table mariano_cms.types
DROP TABLE IF EXISTS `types`;
CREATE TABLE IF NOT EXISTS `types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(50) NOT NULL,
  `categoryId` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table mariano_cms.types: ~25 rows (approximately)
REPLACE INTO `types` (`id`, `type`, `categoryId`) VALUES
	(1, 'teclado', 4),
	(2, 'disco rigido', 4),
	(3, 'monitor', 7),
	(4, 'impresora', 4),
	(5, 'microfono', 4),
	(6, 'disco externo', 4),
	(7, 'base de datos', 7),
	(8, 'correo', 1),
	(9, 'office', 2),
	(10, 'windows', 7),
	(11, 'corta fuego', 7),
	(12, 'chrome', 1),
	(13, 'php', 7),
	(14, 'cmd', 1),
	(15, 'phpmyadmin', 7),
	(16, 'firefox', 7),
	(17, 'gabinete', 4),
	(18, 'camara digital', 4),
	(19, 'camara web', 7),
	(20, 'ventilador', 1),
	(21, 'js', 1),
	(22, 'visual code', 2),
	(24, 'placa madre', 1),
	(25, 'memoria ram', 1),
	(26, 'bandeja frio', 2);

-- Dumping structure for table mariano_cms.users
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `fullName` varchar(50) DEFAULT NULL,
  `active` int(11) DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `deletedAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `birthDate` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table mariano_cms.users: ~9 rows (approximately)
REPLACE INTO `users` (`id`, `username`, `password`, `email`, `fullName`, `active`, `createdAt`, `deletedAt`, `updatedAt`, `birthDate`) VALUES
	(1, 'admin', 'admin', 'admin@gmail.com', 'marcelo', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0000-00-00'),
	(2, 'emanuel', 'asd123', 'ema@gmail.com', 'Emanuel gonzales', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', '2023-02-14 23:43:23', '0000-00-00'),
	(3, 'guille1', 'asd123', 'guille@gmail.com', 'guillermo lopez', 1, '2023-01-19 03:29:46', '0000-00-00 00:00:00', '2023-01-19 03:29:46', '2023-01-04'),
	(7, 'sabri1', 'asd123', 'sabrina@gmail.com', 'sabrina lopez', 1, '2023-01-19 03:47:10', '0000-00-00 00:00:00', '2023-01-19 03:47:10', '2022-08-19'),
	(8, 'enriquezzz', 'qweqweqwe', 'enriquezz@gmail.com', 'enrique lopezzz', 1, '2023-01-20 18:15:14', '2023-02-27 23:57:48', '2023-01-27 00:17:28', '2022-12-22'),
	(9, 'sabrina1', 'asd123', 'sabrina@gmail.com', 'sabrina lopez', 1, '2023-01-24 22:10:58', '2023-01-24 22:11:22', '2023-01-24 22:10:58', '2023-01-10'),
	(10, 'sabrina1', '123asd', 'sabrina@gmail.com', 'sabrina lopez', 0, '2023-01-24 22:13:30', '0000-00-00 00:00:00', '2023-01-24 22:13:30', '2023-01-12'),
	(11, 'enrique33', '123asd', 'enrique3@gmail.com', 'enrique garcias', 0, '2023-02-27 23:57:15', '0000-00-00 00:00:00', '2023-02-27 23:57:15', '2022-04-22'),
	(12, 'elias2', 'asd123', 'elias1@gmail.com', 'elias gonzales', 1, '2023-02-28 21:21:06', '0000-00-00 00:00:00', '2023-02-28 21:21:35', '2023-02-07');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
