-- MySQL dump 10.13  Distrib 8.0.19, for macos10.15 (x86_64)
--
-- Host: 127.0.0.1    Database: vetement
-- ------------------------------------------------------
-- Server version	5.7.25

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
-- Table structure for table categories
--

DROP TABLE IF EXISTS categories;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE categories (
  id int(11) NOT NULL AUTO_INCREMENT,
  nom_categorie varchar(45) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table categories
--

LOCK TABLES categories WRITE;
/*!40000 ALTER TABLE categories DISABLE KEYS */;
INSERT INTO categories VALUES (1,'haut'),(2,'short');
/*!40000 ALTER TABLE categories ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table commentaire
--

DROP TABLE IF EXISTS commentaire;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE commentaire (
  id int(11) NOT NULL,
  id_produit int(11) DEFAULT NULL,
  commentaire varchar(128) DEFAULT NULL,
  date varchar(45) DEFAULT NULL,
  users_id int(11) NOT NULL,
  PRIMARY KEY (id),
  KEY fk_commentaire_users1_idx (users_id),
  CONSTRAINT fk_commentaire_users1 FOREIGN KEY (users_id) REFERENCES users (id) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table commentaire
--

LOCK TABLES commentaire WRITE;
/*!40000 ALTER TABLE commentaire DISABLE KEYS */;
/*!40000 ALTER TABLE commentaire ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table panier
--

DROP TABLE IF EXISTS panier;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE panier (
  id int(11) NOT NULL AUTO_INCREMENT,
  quantite int(11) DEFAULT NULL,
  prix_unitaire decimal(10,0) DEFAULT NULL,
  users_id int(11) NOT NULL,
  PRIMARY KEY (id),
  KEY fk_panier_users_idx (users_id),
  CONSTRAINT fk_panier_users FOREIGN KEY (users_id) REFERENCES users (id) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table panier
--

LOCK TABLES panier WRITE;
/*!40000 ALTER TABLE panier DISABLE KEYS */;
INSERT INTO panier VALUES (1,3,10,1),(2,8,3,1);
/*!40000 ALTER TABLE panier ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table panier_produit
--

DROP TABLE IF EXISTS panier_produit;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE panier_produit (
  produits_id int(11) NOT NULL,
  panier_id int(11) NOT NULL,
  id int(11) DEFAULT NULL,
  KEY fk_produits_has_panier_produits1_idx (panier_id),
  KEY fk_produits_has_panier_panier1 (produits_id),
  CONSTRAINT fk_produits_has_panier_panier1 FOREIGN KEY (produits_id) REFERENCES produits (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT fk_produits_has_panier_produits1 FOREIGN KEY (panier_id) REFERENCES panier (id) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table panier_produit
--

LOCK TABLES panier_produit WRITE;
/*!40000 ALTER TABLE panier_produit DISABLE KEYS */;
INSERT INTO panier_produit VALUES (1,1,1),(2,2,2);
/*!40000 ALTER TABLE panier_produit ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table produits
--

DROP TABLE IF EXISTS produits;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE produits (
  id int(11) NOT NULL AUTO_INCREMENT,
  nom_produit varchar(45) DEFAULT NULL,
  stock int(11) DEFAULT NULL,
  prix_unitaire varchar(10) DEFAULT NULL,
  designation varchar(45) DEFAULT NULL,
  image_produit varchar(30) DEFAULT NULL,
  montant_ligne varchar(45) DEFAULT NULL,
  categories_id int(11) NOT NULL,
  description varchar(45) DEFAULT NULL,
  PRIMARY KEY (id),
  KEY fk_produits_categories1_idx (categories_id),
  CONSTRAINT fk_produits_categories1 FOREIGN KEY (categories_id) REFERENCES categories (id) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table produits
--

LOCK TABLES produits WRITE;
/*!40000 ALTER TABLE produits DISABLE KEYS */;
INSERT INTO produits VALUES (1,'t shirt',30,'10','t-shirt','rtest','13',1,'tshirt en soie d\'Inde'),(2,'chemise',10,'15','chemise soie',NULL,'18',1,'chemise coton');
/*!40000 ALTER TABLE produits ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table users
--

DROP TABLE IF EXISTS users;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE users (
  id int(11) NOT NULL,
  nom_client varchar(45) DEFAULT NULL,
  prenom_client varchar(45) DEFAULT NULL,
  adresse_livraison varchar(45) DEFAULT NULL,
  adresse varchar(45) DEFAULT NULL,
  telephone int(11) DEFAULT NULL,
  password varchar(45) DEFAULT NULL,
  email varchar(45) DEFAULT NULL,
  role varchar(45) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table users
--

LOCK TABLES users WRITE;
/*!40000 ALTER TABLE users DISABLE KEYS */;
INSERT INTO users VALUES (1,'tom','tom','3 rue garnfe','14 ch vale',123,'pass','mail.fr','client');
/*!40000 ALTER TABLE users ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-03-05 22:17:39
