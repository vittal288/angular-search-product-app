CREATE DATABASE  IF NOT EXISTS `arocity_temp` ;
USE `arocity_temp`;
DROP TABLE IF EXISTS `tbl_offer`;

CREATE TABLE `tbl_offer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `desc` varchar(2048) DEFAULT NULL,
  `type` varchar(45) NOT NULL,
  `offerPrice` varchar(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `tbl_product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `desc` varchar(2048) DEFAULT NULL,
  `gender` varchar(8) DEFAULT NULL,
  `brandName` varchar(30) NOT NULL,
  `category` varchar(45) NOT NULL,
  `prodCode` varchar(25) NOT NULL,
  `price` varchar(15) NOT NULL,
  `image_path` varchar(45) NOT NULL,
  `thumbnail_path` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `tbl_product_offer`;
CREATE TABLE `tbl_product_offer` (
  `product_id` int(11) NOT NULL,
  `offer_id` int(11) NOT NULL,
  KEY `fk_product_id_idx` (`product_id`),
  KEY `fk_offer_id_idx` (`offer_id`),
  CONSTRAINT `fk_offer_id` FOREIGN KEY (`offer_id`) REFERENCES `tbl_offer` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_productId` FOREIGN KEY (`product_id`) REFERENCES `tbl_product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `tbl_seller`;
CREATE TABLE `tbl_seller` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `area_name` varchar(45) DEFAULT NULL,
  `addr` varchar(200) DEFAULT NULL,
  `contactNo` varchar(25) NOT NULL,
  `city` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `tbl_seller_product`;
CREATE TABLE `tbl_seller_product` (
  `seller_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  KEY `fk_seller_id_idx` (`seller_id`),
  KEY `fk_product_id_idx` (`product_id`),
  CONSTRAINT `fk_product_id` FOREIGN KEY (`product_id`) REFERENCES `tbl_product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_seller_id` FOREIGN KEY (`seller_id`) REFERENCES `tbl_seller` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;