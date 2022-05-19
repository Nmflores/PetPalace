-- MariaDB dump 10.19  Distrib 10.4.24-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: petpalace
-- ------------------------------------------------------
-- Server version	10.4.24-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `available_services`
--

DROP TABLE IF EXISTS `available_services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `available_services` (
  `service_id` int(1) NOT NULL,
  `service_name` varchar(40) NOT NULL,
  PRIMARY KEY (`service_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `available_services`
--

LOCK TABLES `available_services` WRITE;
/*!40000 ALTER TABLE `available_services` DISABLE KEYS */;
INSERT INTO `available_services` VALUES (0,'hospedagem'),(1,'passeio');
/*!40000 ALTER TABLE `available_services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genders`
--

DROP TABLE IF EXISTS `genders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `genders` (
  `gender_id` int(1) NOT NULL,
  `gender` varchar(20) NOT NULL,
  PRIMARY KEY (`gender_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genders`
--

LOCK TABLES `genders` WRITE;
/*!40000 ALTER TABLE `genders` DISABLE KEYS */;
INSERT INTO `genders` VALUES (0,'masculino'),(1,'feminino');
/*!40000 ALTER TABLE `genders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pet_types`
--

DROP TABLE IF EXISTS `pet_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pet_types` (
  `pet_type_id` int(11) NOT NULL,
  `pet_type` varchar(40) NOT NULL,
  PRIMARY KEY (`pet_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pet_types`
--

LOCK TABLES `pet_types` WRITE;
/*!40000 ALTER TABLE `pet_types` DISABLE KEYS */;
INSERT INTO `pet_types` VALUES (0,'caninos'),(1,'felinos');
/*!40000 ALTER TABLE `pet_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pets`
--

DROP TABLE IF EXISTS `pets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pets` (
  `owner_id` varchar(40) NOT NULL,
  `pet_id` varchar(40) NOT NULL,
  `pet_name` varchar(40) NOT NULL,
  `pet_type` int(1) NOT NULL,
  `pet_breed` varchar(40) NOT NULL,
  PRIMARY KEY (`owner_id`,`pet_id`),
  CONSTRAINT `FK_owner_id` FOREIGN KEY (`owner_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pets`
--

LOCK TABLES `pets` WRITE;
/*!40000 ALTER TABLE `pets` DISABLE KEYS */;
INSERT INTO `pets` VALUES ('1asdj3123djhsd','c6ffc620-dee6-4f01-9e66-c2000d015bbb','angel',1,'egipicio'),('23123jsaff','gsgwtw5322','carlitos',0,'pastor alemao');
/*!40000 ALTER TABLE `pets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `queue_pet_types`
--

DROP TABLE IF EXISTS `queue_pet_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `queue_pet_types` (
  `queue_id` varchar(100) NOT NULL,
  `pet_type_id` int(4) NOT NULL,
  PRIMARY KEY (`queue_id`),
  KEY `FK_pet_type` (`pet_type_id`),
  CONSTRAINT `FK_pet_type` FOREIGN KEY (`pet_type_id`) REFERENCES `pet_types` (`pet_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `queue_pet_types`
--

LOCK TABLES `queue_pet_types` WRITE;
/*!40000 ALTER TABLE `queue_pet_types` DISABLE KEYS */;
/*!40000 ALTER TABLE `queue_pet_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services_queue`
--

DROP TABLE IF EXISTS `services_queue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `services_queue` (
  `queue_id` varchar(100) NOT NULL,
  `worker_id` varchar(40) NOT NULL,
  `client_id` varchar(40) NOT NULL,
  `service_id` varchar(100) NOT NULL,
  `entry_date` date NOT NULL DEFAULT current_timestamp(),
  `status` int(1) NOT NULL,
  `price` float NOT NULL,
  `end_date` date DEFAULT NULL,
  PRIMARY KEY (`service_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services_queue`
--

LOCK TABLES `services_queue` WRITE;
/*!40000 ALTER TABLE `services_queue` DISABLE KEYS */;
/*!40000 ALTER TABLE `services_queue` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `user_id` varchar(100) NOT NULL,
  `first_name` varchar(40) NOT NULL,
  `second_name` varchar(40) NOT NULL,
  `user_gender` int(1) NOT NULL,
  `user_role` int(1) NOT NULL,
  `cpf` varchar(30) NOT NULL,
  `loyalty` float DEFAULT NULL,
  `address` varchar(50) NOT NULL,
  `address_nbr` int(4) NOT NULL,
  `district` varchar(50) NOT NULL,
  `cep` varchar(50) NOT NULL,
  `state` varchar(50) NOT NULL,
  PRIMARY KEY (`user_id`,`user_gender`,`user_role`,`cpf`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('13452345gs','antonio','pepe',0,1,'19203123',NULL,'rua dos bobos',0,'zona norte','95555000','Rio Grande do Sul'),('1asdj3123djhsd','rogerio','alves',0,1,'0374238752',NULL,'rua dos bobos',2,'zona norte','95555000','Rio Grande do Sul'),('23123jsaff','jairo','mondes',0,2,'12831924',NULL,'rua dos bobos ',3,'zona norte','95555000','Rio Grande do Sul'),('4ac85347-72f7-48e5-a469-eac17735e0c4','joao','pedro',0,0,'0983543123',NULL,'rua peru',13,'zrco-iris','95543000','RS'),('5ecae041-fdee-419e-9572-8bc445e63228','jonas','pancadao',0,1,'12414551',NULL,'rua dos bobos',4,'zona norte','95555000','Rio Grande do Sul'),('a10020af-9540-42ac-a45a-865df7d4969f','marcos','cabeça',0,1,'1122334455',NULL,'rua dos bobos',7,'zona norte','95555000','Rio Grande do Sul'),('aass2123tw3','isabela','martins',1,1,'012384274',NULL,'rua dos bobos ',5,'zona norte','95555000','Rio Grande do Sul'),('asdasfgjg','antonela','alves',1,2,'120938148',NULL,'rua dos bobos ',6,'zona norte','95555000','Rio Grande do Sul');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_auth`
--

DROP TABLE IF EXISTS `users_auth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_auth` (
  `user_id` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `salt` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_auth`
--

LOCK TABLES `users_auth` WRITE;
/*!40000 ALTER TABLE `users_auth` DISABLE KEYS */;
INSERT INTO `users_auth` VALUES ('4ac85347-72f7-48e5-a469-eac17735e0c4','joao','joaopedr@gmail.com','12345',NULL),('5ecae041-fdee-419e-9572-8bc445e63228','jonas','pancadaodojonas@ibest.com','12345',NULL),('a10020af-9540-42ac-a45a-865df7d4969f','marcos','marquinhoscabeaao@gmail.com','12345',NULL);
/*!40000 ALTER TABLE `users_auth` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `worker_services`
--

DROP TABLE IF EXISTS `worker_services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `worker_services` (
  `user_id` varchar(50) NOT NULL,
  `service_id` int(1) NOT NULL,
  PRIMARY KEY (`user_id`,`service_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `worker_services`
--

LOCK TABLES `worker_services` WRITE;
/*!40000 ALTER TABLE `worker_services` DISABLE KEYS */;
INSERT INTO `worker_services` VALUES ('123fsd33',1),('13452345gs',1),('1asdj3123djhsd',0),('4ac85347-72f7-48e5-a469-eac17735e0c4',1),('aass2123tw3',0),('aass2123tw3',1);
/*!40000 ALTER TABLE `worker_services` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-09 19:05:45
