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
-- Table structure for table `halls`
--

DROP TABLE IF EXISTS `halls`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `halls` (
  `Hall_ID` int NOT NULL AUTO_INCREMENT,
  `Hall_Name` varchar(100) NOT NULL,
  `Hall_Capacity` int NOT NULL,
  `Department_ID` int DEFAULT NULL,
  `Building_ID` int DEFAULT NULL,
  `Hall_Type_ID` int DEFAULT NULL,
  `Is_Available` varchar(100) NOT NULL,
  PRIMARY KEY (`Hall_ID`),
  UNIQUE KEY `Hall_Name` (`Hall_Name`),
  KEY `Department_ID` (`Department_ID`),
  KEY `Building_ID` (`Building_ID`),
  KEY `Hall_Type_ID` (`Hall_Type_ID`),
  CONSTRAINT `halls_ibfk_1` FOREIGN KEY (`Department_ID`) REFERENCES `department` (`Department_ID`),
  CONSTRAINT `halls_ibfk_2` FOREIGN KEY (`Building_ID`) REFERENCES `building` (`Building_ID`),
  CONSTRAINT `halls_ibfk_3` FOREIGN KEY (`Hall_Type_ID`) REFERENCES `hall_type` (`Hall_Type_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `halls`
--

LOCK TABLES `halls` WRITE;
/*!40000 ALTER TABLE `halls` DISABLE KEYS */;
INSERT INTO `halls` VALUES (1,'C101',70,7,6,3,'صالحة للإستخدام'),(2,'C1',25,1,6,1,'صالحة للإستخدام'),(3,'Network Lab',25,1,6,2,'صالحة للإستخدام'),(4,'C103',50,2,6,3,'صالحة للإستخدام'),(5,'A203',40,1,1,3,'صالحة للإستخدام'),(6,'مرسم 1',60,3,2,7,'صالحة للإستخدام'),(7,'مرسم 2',60,3,2,7,'غير صالحة للإستخدام'),(8,'Physic Lab',35,7,1,4,'صالحة للإستخدام'),(9,'D209',55,5,11,3,'صالحة للإستخدام'),(10,'C201',64,1,6,3,'صالحة للإستخدام');
/*!40000 ALTER TABLE `halls` ENABLE KEYS */;
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
