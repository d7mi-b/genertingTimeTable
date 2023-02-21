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
-- Table structure for table `lecturer`
--

DROP TABLE IF EXISTS `lecturer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lecturer` (
  `Lecturer_ID` int NOT NULL AUTO_INCREMENT,
  `Lecturer_Name` varchar(100) NOT NULL,
  `Department_ID` int DEFAULT NULL,
  `College_ID` int DEFAULT NULL,
  `Rank_` varchar(100) DEFAULT NULL,
  `Not_Available` tinyint(1) DEFAULT NULL,
  `NO_Available_Days` int DEFAULT NULL,
  `Sunday` tinyint(1) DEFAULT NULL,
  `Monday` tinyint(1) DEFAULT NULL,
  `Tuesday` tinyint(1) DEFAULT NULL,
  `Wednesday` tinyint(1) DEFAULT NULL,
  `Thursday` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`Lecturer_ID`),
  KEY `Department_ID` (`Department_ID`),
  KEY `College_ID` (`College_ID`),
  CONSTRAINT `lecturer_ibfk_1` FOREIGN KEY (`Department_ID`) REFERENCES `department` (`Department_ID`),
  CONSTRAINT `lecturer_ibfk_2` FOREIGN KEY (`College_ID`) REFERENCES `college` (`College_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lecturer`
--

LOCK TABLES `lecturer` WRITE;
/*!40000 ALTER TABLE `lecturer` DISABLE KEYS */;
INSERT INTO `lecturer` VALUES (1,'خالد فوزي اشبير',1,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,'رشا بن ثعلب',1,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(3,'سهام بامطرف',1,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(4,'مكارم بامطرف',1,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(5,'مازن باحشوان',1,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(6,'مجدي مرعي',2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(7,'خالد بن سحاق',2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(8,'هشام باكرمان',2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(9,'وداد محمود فيصل',2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(10,'سعيد بن عجاج',2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(11,'فهد جوهر',3,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(12,'هشام البيتي',3,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(13,'عادل معلم بامعلم',3,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(14,'عامر بن مرضاح',6,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(15,'سالم بامومن',6,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `lecturer` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-20 18:46:44
