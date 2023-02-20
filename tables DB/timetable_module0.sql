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
-- Table structure for table `module`
--

DROP TABLE IF EXISTS `module`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `module` (
  `Module_ID` int NOT NULL AUTO_INCREMENT,
  `Semester_ID` int DEFAULT NULL,
  `Subject_ID` int DEFAULT NULL,
  `Lecturer_ID` int DEFAULT NULL,
  `Department_ID` int DEFAULT NULL,
  `Hall_Type_ID` int DEFAULT NULL,
  PRIMARY KEY (`Module_ID`),
  KEY `Semester_ID` (`Semester_ID`),
  KEY `Subject_ID` (`Subject_ID`),
  KEY `Lecturer_ID` (`Lecturer_ID`),
  KEY `module` (`Department_ID`),
  KEY `Hall_Type_ID` (`Hall_Type_ID`),
  CONSTRAINT `module_ibfk_1` FOREIGN KEY (`Semester_ID`) REFERENCES `semester` (`Semester_ID`),
  CONSTRAINT `module_ibfk_2` FOREIGN KEY (`Subject_ID`) REFERENCES `subjects` (`Subject_ID`),
  CONSTRAINT `module_ibfk_3` FOREIGN KEY (`Lecturer_ID`) REFERENCES `lecturer` (`Lecturer_ID`),
  CONSTRAINT `module_ibfk_4` FOREIGN KEY (`Department_ID`) REFERENCES `department` (`Department_ID`),
  CONSTRAINT `module_ibfk_5` FOREIGN KEY (`Hall_Type_ID`) REFERENCES `hall_type` (`Hall_Type_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `module`
--

LOCK TABLES `module` WRITE;
/*!40000 ALTER TABLE `module` DISABLE KEYS */;
/*!40000 ALTER TABLE `module` ENABLE KEYS */;
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
