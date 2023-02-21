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
-- Table structure for table `batches`
--

DROP TABLE IF EXISTS `batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `batches` (
  `Batch_ID` int NOT NULL AUTO_INCREMENT,
  `College_ID` int DEFAULT NULL,
  `Level_ID` int DEFAULT NULL,
  `Department_ID` int DEFAULT NULL,
  `Batch_General_Count` int DEFAULT NULL,
  `Batch_Payment_Count` int DEFAULT NULL,
  `Batch_Parallel_Count` int DEFAULT NULL,
  PRIMARY KEY (`Batch_ID`),
  KEY `College_ID` (`College_ID`),
  KEY `Level_ID` (`Level_ID`),
  KEY `Department_ID` (`Department_ID`),
  CONSTRAINT `batches_ibfk_2` FOREIGN KEY (`College_ID`) REFERENCES `college` (`College_ID`),
  CONSTRAINT `batches_ibfk_3` FOREIGN KEY (`Level_ID`) REFERENCES `level` (`Level_ID`),
  CONSTRAINT `batches_ibfk_4` FOREIGN KEY (`Department_ID`) REFERENCES `department` (`Department_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `batches`
--

LOCK TABLES `batches` WRITE;
/*!40000 ALTER TABLE `batches` DISABLE KEYS */;
INSERT INTO `batches` VALUES (1,1,5,1,33,4,4),(2,1,4,1,27,7,3),(3,1,3,4,35,11,5),(4,1,5,2,40,9,15),(5,1,2,3,46,9,7),(6,1,1,5,68,9,18),(7,1,3,6,46,7,28),(8,1,3,1,45,4,8),(9,1,2,1,38,12,6),(10,1,1,1,67,8,9);
/*!40000 ALTER TABLE `batches` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-20 17:35:50
