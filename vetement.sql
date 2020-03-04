-- MySQL Script generated by MySQL Workbench
-- Tue Mar  3 15:40:57 2020
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema vetement
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema vetement
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `vetement` DEFAULT CHARACTER SET utf8 ;
USE `vetement` ;

-- -----------------------------------------------------
-- Table `vetement`.`panier`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vetement`.`panier` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_user` INT NULL,
  `id_produit` INT NULL,
  `quantite` INT NULL,
  `prix_unitaire` DECIMAL(10) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `vetement`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vetement`.`users` (
  `id` INT NOT NULL,
  `nom_client` VARCHAR(45) NULL,
  `prennom_client` VARCHAR(45) NULL,
  `adresse_livraison` VARCHAR(45) NULL,
  `adresse` VARCHAR(45) NULL,
  `telephone` INT NULL,
  `password` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `role` VARCHAR(45) NULL,
  `panier_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_users_panier1_idx` (`panier_id` ASC),
  CONSTRAINT `fk_users_panier1`
    FOREIGN KEY (`panier_id`)
    REFERENCES `vetement`.`panier` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `vetement`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vetement`.`categories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nom_categorie` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `vetement`.`produits`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vetement`.`produits` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nom_produit` VARCHAR(45) NULL,
  `id_categorie` INT NULL,
  `stock` INT NULL,
  `prix_unitaire` VARCHAR(10) NULL,
  `designation` VARCHAR(45) NULL,
  `image_produit` VARCHAR(30) NULL,
  `montant_ligne` VARCHAR(45) NULL,
  `categories_id` INT NOT NULL,
  `panier_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_produits_categories1_idx` (`categories_id` ASC) ,
  INDEX `fk_produits_panier1_idx` (`panier_id` ASC) ,
  CONSTRAINT `fk_produits_categories1`
    FOREIGN KEY (`categories_id`)
    REFERENCES `vetement`.`categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_produits_panier1`
    FOREIGN KEY (`panier_id`)
    REFERENCES `vetement`.`panier` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `vetement`.`commentaire`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vetement`.`commentaire` (
  `id` INT NOT NULL,
  `id_user` INT NULL,
  `id_produit` INT NULL,
  `commentaire` VARCHAR(128) NULL,
  `date` VARCHAR(45) NULL,
  `users_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_commentaire_users1_idx` (`users_id` ASC),
  CONSTRAINT `fk_commentaire_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `vetement`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
