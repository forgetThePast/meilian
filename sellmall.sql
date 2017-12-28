/*
SQLyog  v12.2.6 (64 bit)
MySQL - 5.6.24 : Database - sellmall
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`sellmall` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `sellmall`;

/*Table structure for table `account` */

DROP TABLE IF EXISTS `account`;

CREATE TABLE `account` (
  `account_id` bigint(18) NOT NULL COMMENT '流水号',
  `account_code` varchar(40) CHARACTER SET latin1 NOT NULL COMMENT '用户编号',
  `account_name` varchar(50) CHARACTER SET latin1 DEFAULT NULL COMMENT '用户名称',
  `password` varchar(50) CHARACTER SET latin1 NOT NULL COMMENT '密码',
  `phone` varchar(20) CHARACTER SET latin1 DEFAULT NULL COMMENT '电话',
  `remark` varchar(255) CHARACTER SET latin1 DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`account_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户表';

/*Data for the table `account` */

insert  into `account`(`account_id`,`account_code`,`account_name`,`password`,`phone`,`remark`) values 
(0,'admin','admin','b1f68500097c4dccac7d99554087b1f9',NULL,NULL),
(1032664264826880,'123','123','e4beb18013022c45c53918e5b47aaac8','string','string');

/*Table structure for table `cart` */

DROP TABLE IF EXISTS `cart`;

CREATE TABLE `cart` (
  `cart_id` bigint(18) NOT NULL COMMENT '流水号',
  `account_id` bigint(18) NOT NULL COMMENT '用户流水号',
  `goods_code` varchar(40) CHARACTER SET latin1 DEFAULT NULL COMMENT '商品编号',
  `goods_name` varchar(100) CHARACTER SET latin1 DEFAULT NULL COMMENT '商品名称',
  `price` double(15,6) DEFAULT '0.000000' COMMENT '价格',
  `remark` varchar(255) CHARACTER SET latin1 DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`cart_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='购物车信息';

/*Data for the table `cart` */

insert  into `cart`(`cart_id`,`account_id`,`goods_code`,`goods_name`,`price`,`remark`) values 
(1032675496177664,1032664264826880,'test','test',100.330000,'string'),
(1032675561009152,1032664264826880,'test2','test2',100.330000,'string');

/*Table structure for table `goods` */

DROP TABLE IF EXISTS `goods`;

CREATE TABLE `goods` (
  `goods_id` bigint(18) NOT NULL,
  `goods_code` varchar(40) CHARACTER SET latin1 NOT NULL,
  `goods_name` varchar(50) CHARACTER SET latin1 DEFAULT NULL,
  `price` double(15,6) NOT NULL DEFAULT '0.000000',
  `description` varchar(1000) CHARACTER SET latin1 DEFAULT NULL,
  `remark` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  PRIMARY KEY (`goods_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='商品表';

/*Data for the table `goods` */

/*Table structure for table `order_detail` */

DROP TABLE IF EXISTS `order_detail`;

CREATE TABLE `order_detail` (
  `order_detail_id` bigint(18) NOT NULL COMMENT '订单明细编号',
  `order_id` bigint(18) DEFAULT NULL COMMENT '订单号',
  `goods_code` varchar(40) CHARACTER SET latin1 DEFAULT NULL COMMENT '商品编号',
  `goods_name` varchar(50) CHARACTER SET latin1 DEFAULT NULL COMMENT '商品名称',
  `price` double(15,6) DEFAULT '0.000000' COMMENT '价格',
  `remark` varchar(255) CHARACTER SET latin1 DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`order_detail_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='订单单身表';

/*Data for the table `order_detail` */

/*Table structure for table `orderinfo` */

DROP TABLE IF EXISTS `orderinfo`;

CREATE TABLE `orderinfo` (
  `order_id` bigint(18) NOT NULL COMMENT '流水号',
  `account_id` bigint(18) NOT NULL COMMENT '用户流水号',
  `order_time` varchar(30) CHARACTER SET latin1 DEFAULT NULL COMMENT '订单时间',
  `total_money` double(16,6) DEFAULT '0.000000' COMMENT '总金额',
  `remark` varchar(255) CHARACTER SET latin1 DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='订单单头表';

/*Data for the table `orderinfo` */

insert  into `orderinfo`(`order_id`,`account_id`,`order_time`,`total_money`,`remark`) values 
(103267781144123,123,NULL,0.000000,NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
