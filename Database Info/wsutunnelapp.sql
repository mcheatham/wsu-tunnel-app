-- --------------------------------------------------------
-- Host:                         192.168.1.110
-- Server version:               8.0.11 - MySQL Community Server - GPL
-- Server OS:                    Linux
-- HeidiSQL Version:             9.3.0.4984
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping database structure for wsutunnelapp
CREATE DATABASE IF NOT EXISTS `wsutunnelapp` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */;
USE `wsutunnelapp`;


-- Dumping structure for table wsutunnelapp.buildings
CREATE TABLE IF NOT EXISTS `buildings` (
  `buildingID` int(11) NOT NULL AUTO_INCREMENT,
  `name` tinytext NOT NULL,
  `updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`buildingID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table wsutunnelapp.buildings: ~4 rows (approximately)
DELETE FROM `buildings`;
/*!40000 ALTER TABLE `buildings` DISABLE KEYS */;
INSERT INTO `buildings` (`buildingID`, `name`, `updated`) VALUES
	(0, 'Fawcett Hall', '2019-02-06 00:33:39'),
	(1, 'Oelman Hall', '2019-02-06 00:33:09'),
	(2, 'Allyn Hall', '2019-02-06 00:34:07'),
	(3, 'Millet Hall', '2019-02-06 00:34:19'),
	(4, 'Rike Hall', '2019-02-06 00:34:26');
/*!40000 ALTER TABLE `buildings` ENABLE KEYS */;


-- Dumping structure for table wsutunnelapp.connections
CREATE TABLE IF NOT EXISTS `connections` (
  `connectionID` int(11) NOT NULL AUTO_INCREMENT,
  `nodeA_ID` int(11) DEFAULT NULL,
  `nodeB_ID` int(11) DEFAULT NULL,
  `length` float DEFAULT NULL,
  `isIndoors` varchar(1) DEFAULT 'T',
  `hasStairs` varchar(1) DEFAULT 'F',
  `hasElevator` varchar(1) DEFAULT 'F',
  `width` tinyint(4) DEFAULT NULL,
  `updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`connectionID`),
  KEY `NID` (`nodeA_ID`),
  KEY `ConnectedNID` (`nodeB_ID`),
  CONSTRAINT `ConnectedNID` FOREIGN KEY (`nodeB_ID`) REFERENCES `nodes` (`nodeID`),
  CONSTRAINT `NID` FOREIGN KEY (`nodeA_ID`) REFERENCES `nodes` (`nodeID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table wsutunnelapp.connections: ~6 rows (approximately)
DELETE FROM `connections`;
/*!40000 ALTER TABLE `connections` DISABLE KEYS */;
INSERT INTO `connections` (`connectionID`, `nodeA_ID`, `nodeB_ID`, `length`, `isIndoors`, `hasStairs`, `hasElevator`, `width`, `updated`) VALUES
	(0, 0, 1, 133.878, 'T', 'F', 'F', 4, '2019-02-06 00:44:19'),
	(1, 0, 3, 134.843, 'T', 'F', 'F', 4, '2019-02-06 00:44:20'),
	(2, 1, 2, 127.231, 'T', 'F', 'F', 4, '2019-02-06 00:44:22'),
	(3, 1, 3, 1.00851, 'T', 'F', 'F', 4, '2019-02-06 00:44:23'),
	(4, 2, 3, 258.481, 'T', 'F', 'F', 4, '2019-02-06 00:44:23'),
	(5, 2, 4, 273.572, 'T', 'F', 'F', 4, '2019-02-06 00:44:24');
/*!40000 ALTER TABLE `connections` ENABLE KEYS */;


-- Dumping structure for table wsutunnelapp.nodes
CREATE TABLE IF NOT EXISTS `nodes` (
  `nodeID` int(11) NOT NULL AUTO_INCREMENT,
  `lat` float NOT NULL DEFAULT '0',
  `long` float NOT NULL DEFAULT '0',
  `elev` float NOT NULL,
  `isIndoors` char(50) DEFAULT 'T',
  `buildingID` int(11) DEFAULT '0',
  `floor` int(11) DEFAULT '0',
  `roomNumber` tinytext,
  `nodeTypeID` int(11) NOT NULL,
  `updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`nodeID`),
  KEY `Building` (`buildingID`),
  KEY `Type` (`nodeTypeID`),
  CONSTRAINT `Building` FOREIGN KEY (`buildingID`) REFERENCES `buildings` (`buildingID`),
  CONSTRAINT `Type` FOREIGN KEY (`nodeTypeID`) REFERENCES `types` (`nodeTypeID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table wsutunnelapp.nodes: ~5 rows (approximately)
DELETE FROM `nodes`;
/*!40000 ALTER TABLE `nodes` DISABLE KEYS */;
INSERT INTO `nodes` (`nodeID`, `lat`, `long`, `elev`, `isIndoors`, `buildingID`, `floor`, `roomNumber`, `nodeTypeID`, `updated`) VALUES
	(0, 39.7827, -84.0653, 288, 'T', 1, 0, NULL, 1, '2019-02-06 00:41:38'),
	(1, 39.7839, -84.0633, 288, 'T', 1, 0, NULL, 1, '2019-02-06 00:41:40'),
	(2, 39.7839, -84.0634, 288, 'T', 1, 0, NULL, 1, '2019-02-06 00:41:41'),
	(3, 39.7816, -84.0635, 288, 'T', 1, 0, NULL, 1, '2019-02-06 00:41:43'),
	(4, 39.7792, -84.0622, 288, 'T', 1, 0, NULL, 1, '2019-02-06 00:41:44');
/*!40000 ALTER TABLE `nodes` ENABLE KEYS */;


-- Dumping structure for table wsutunnelapp.routes
CREATE TABLE IF NOT EXISTS `routes` (
  `routeID` int(11) NOT NULL AUTO_INCREMENT,
  `routeNodeA_ID` int(11) DEFAULT NULL,
  `routeNodeB_ID` int(11) DEFAULT NULL,
  `buildingA_ID` int(11) DEFAULT NULL,
  `buildingB_ID` int(11) DEFAULT NULL,
  `connectionIDs` text,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`routeID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table wsutunnelapp.routes: ~0 rows (approximately)
DELETE FROM `routes`;
/*!40000 ALTER TABLE `routes` DISABLE KEYS */;
INSERT INTO `routes` (`routeID`, `routeNodeA_ID`, `routeNodeB_ID`, `buildingA_ID`, `buildingB_ID`, `connectionIDs`, `updated`) VALUES
	(1, 1, 5, 1, 1, '1,4,5', '2019-01-18 22:36:09');
/*!40000 ALTER TABLE `routes` ENABLE KEYS */;


-- Dumping structure for table wsutunnelapp.types
CREATE TABLE IF NOT EXISTS `types` (
  `nodeTypeID` int(11) NOT NULL AUTO_INCREMENT,
  `name` tinytext NOT NULL,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`nodeTypeID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table wsutunnelapp.types: ~0 rows (approximately)
DELETE FROM `types`;
/*!40000 ALTER TABLE `types` DISABLE KEYS */;
INSERT INTO `types` (`nodeTypeID`, `name`, `updated`) VALUES
	(1, 'EDGE', '2019-02-06 00:34:39');
/*!40000 ALTER TABLE `types` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
