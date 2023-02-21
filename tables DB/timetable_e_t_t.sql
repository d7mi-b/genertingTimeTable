-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: timetable
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `e_t_t`
--

DROP TABLE IF EXISTS `e_t_t`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `e_t_t` (
  `ETT_ID` int NOT NULL AUTO_INCREMENT,
  `Module_ID` int DEFAULT NULL,
  `Hall_ID` int DEFAULT NULL,
  `Time_ID` int DEFAULT NULL,
  `Day_ID` int DEFAULT NULL,
  `Group_ID` int DEFAULT NULL,
  PRIMARY KEY (`ETT_ID`),
  KEY `Module_ID` (`Module_ID`),
  KEY `Hall_ID` (`Hall_ID`),
  KEY `Time_ID` (`Time_ID`),
  KEY `Day_ID` (`Day_ID`),
  KEY `Group_ID` (`Group_ID`),
  CONSTRAINT `e_t_t_ibfk_1` FOREIGN KEY (`Module_ID`) REFERENCES `module` (`Module_ID`),
  CONSTRAINT `e_t_t_ibfk_2` FOREIGN KEY (`Hall_ID`) REFERENCES `halls` (`Hall_ID`),
  CONSTRAINT `e_t_t_ibfk_3` FOREIGN KEY (`Time_ID`) REFERENCES `time` (`Time_ID`),
  CONSTRAINT `e_t_t_ibfk_4` FOREIGN KEY (`Day_ID`) REFERENCES `day` (`Day_ID`),
  CONSTRAINT `e_t_t_ibfk_5` FOREIGN KEY (`Group_ID`) REFERENCES `batch_groups` (`Group_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `e_t_t`
--

LOCK TABLES `e_t_t` WRITE;
/*!40000 ALTER TABLE `e_t_t` DISABLE KEYS */;
/*!40000 ALTER TABLE `e_t_t` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-20 17:35:49
