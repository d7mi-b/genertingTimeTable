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
-- Table structure for table `lecturer_requesr`
--

DROP TABLE IF EXISTS `lecturer_requesr`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lecturer_requesr` (
  `Requist_ID` int NOT NULL AUTO_INCREMENT,
  `Sender_ID` int DEFAULT NULL,
  `Reciver_ID` int DEFAULT NULL,
  `Lecturer_ID` int DEFAULT NULL,
  `Subject_ID` int DEFAULT NULL,
  PRIMARY KEY (`Requist_ID`),
  KEY `Sender_ID` (`Sender_ID`),
  KEY `Reciver_ID` (`Reciver_ID`),
  KEY `Lecturer_ID` (`Lecturer_ID`),
  KEY `Subject_ID` (`Subject_ID`),
  CONSTRAINT `lecturer_requesr_ibfk_1` FOREIGN KEY (`Sender_ID`) REFERENCES `users` (`User_ID`),
  CONSTRAINT `lecturer_requesr_ibfk_2` FOREIGN KEY (`Reciver_ID`) REFERENCES `users` (`User_ID`),
  CONSTRAINT `lecturer_requesr_ibfk_3` FOREIGN KEY (`Lecturer_ID`) REFERENCES `lecturer` (`Lecturer_ID`),
  CONSTRAINT `lecturer_requesr_ibfk_4` FOREIGN KEY (`Subject_ID`) REFERENCES `subjects` (`Subject_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lecturer_requesr`
--

LOCK TABLES `lecturer_requesr` WRITE;
/*!40000 ALTER TABLE `lecturer_requesr` DISABLE KEYS */;
/*!40000 ALTER TABLE `lecturer_requesr` ENABLE KEYS */;
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
