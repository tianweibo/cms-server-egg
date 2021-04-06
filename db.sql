# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.33)
# Database: buried_points_server
# Generation Time: 2021-04-06 01:11:28 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table activity
# ------------------------------------------------------------

DROP TABLE IF EXISTS `activity`;

CREATE TABLE `activity` (
  `activity_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `project_id` int(11) unsigned NOT NULL,
  `title` varchar(64) NOT NULL,
  `start_date` int(10) unsigned NOT NULL DEFAULT '0',
  `end_date` int(10) unsigned NOT NULL DEFAULT '0',
  `tag_conf` text NOT NULL,
  `description` text NOT NULL,
  `status` tinyint(2) unsigned NOT NULL DEFAULT '0',
  `created_at` int(11) NOT NULL DEFAULT '0',
  `updated_at` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`activity_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `activity` WRITE;
/*!40000 ALTER TABLE `activity` DISABLE KEYS */;

INSERT INTO `activity` (`activity_id`, `project_id`, `title`, `start_date`, `end_date`, `tag_conf`, `description`, `status`, `created_at`, `updated_at`)
VALUES
	(3,1,'测试标题002',0,0,'[{\"tag_name\":\"PV\",\"tag_key\":\"field_pv\"},{\"tag_name\":\"UV\",\"tag_key\":\"field_uv\"},{\"tag_name\":\"加购\",\"tag_key\":\"field_join_cart\"}]','测试内容002',0,1613631695,0),
	(4,1,'测试标题002',0,0,'[{\"tag_name\":\"PV\",\"tag_key\":\"field_pv\"},{\"tag_name\":\"UV\",\"tag_key\":\"field_uv\"},{\"tag_name\":\"加购\",\"tag_key\":\"field_join_cart\"}]','测试内容002',0,1613631695,0),
	(5,1,'测试标题002',0,0,'[{\"tag_name\":\"PV\",\"tag_key\":\"field_pv\"},{\"tag_name\":\"UV\",\"tag_key\":\"field_uv\"},{\"tag_name\":\"加购\",\"tag_key\":\"field_join_cart\"}]','测试内容002',0,1613631695,0),
	(6,1,'测试标题002',0,0,'[{\"tag_name\":\"PV\",\"tag_key\":\"field_pv\"},{\"tag_name\":\"UV\",\"tag_key\":\"field_uv\"},{\"tag_name\":\"加购\",\"tag_key\":\"field_join_cart\"}]','测试内容002',0,1613631695,0),
	(7,1,'测试标题002',0,0,'[{\"tag_name\":\"PV\",\"tag_key\":\"field_pv\"},{\"tag_name\":\"UV\",\"tag_key\":\"field_uv\"},{\"tag_name\":\"加购\",\"tag_key\":\"field_join_cart\"}]','测试内容002',0,1613631695,0),
	(8,1,'测试标题002',0,0,'[{\"tag_name\":\"PV\",\"tag_key\":\"field_pv\"},{\"tag_name\":\"UV\",\"tag_key\":\"field_uv\"},{\"tag_name\":\"加购\",\"tag_key\":\"field_join_cart\"}]','测试内容002',0,1613631695,0),
	(9,1,'测试标题002',0,0,'[{\"tag_name\":\"PV\",\"tag_key\":\"field_pv\"},{\"tag_name\":\"UV\",\"tag_key\":\"field_uv\"},{\"tag_name\":\"加购\",\"tag_key\":\"field_join_cart\"}]','测试内容002',0,1613631695,0),
	(10,1,'测试标题002',0,0,'[{\"tag_name\":\"PV\",\"tag_key\":\"field_pv\"},{\"tag_name\":\"UV\",\"tag_key\":\"field_uv\"},{\"tag_name\":\"加购\",\"tag_key\":\"field_join_cart\"}]','测试内容002',0,1613631695,0),
	(11,1,'测试标题002',0,0,'[{\"tag_name\":\"PV\",\"tag_key\":\"field_pv\"},{\"tag_name\":\"UV\",\"tag_key\":\"field_uv\"},{\"tag_name\":\"加购\",\"tag_key\":\"field_join_cart\"}]','测试内容002',0,1613631695,0),
	(12,1,'测试标题002',0,0,'[{\"tag_name\":\"PV\",\"tag_key\":\"field_pv\"},{\"tag_name\":\"UV\",\"tag_key\":\"field_uv\"},{\"tag_name\":\"加购\",\"tag_key\":\"field_join_cart\"}]','测试内容002',0,1613631695,0),
	(13,1,'测试标题002',0,0,'[{\"tag_name\":\"PV\",\"tag_key\":\"field_pv\"},{\"tag_name\":\"UV\",\"tag_key\":\"field_uv\"},{\"tag_name\":\"加购\",\"tag_key\":\"field_join_cart\"}]','测试内容002',0,1613631695,0),
	(14,1,'测试标题002',0,0,'[{\"tag_name\":\"PV\",\"tag_key\":\"field_pv\"},{\"tag_name\":\"UV\",\"tag_key\":\"field_uv\"},{\"tag_name\":\"加购\",\"tag_key\":\"field_join_cart\"}]','测试内容002',0,1613631695,0),
	(15,1,'测试标题002',0,0,'[{\"tag_name\":\"PV\",\"tag_key\":\"field_pv\"},{\"tag_name\":\"UV\",\"tag_key\":\"field_uv\"},{\"tag_name\":\"加购\",\"tag_key\":\"field_join_cart\"}]','测试内容002',0,1613631695,0),
	(16,1,'测试标题002',0,0,'[{\"tag_name\":\"PV\",\"tag_key\":\"field_pv\"},{\"tag_name\":\"UV\",\"tag_key\":\"field_uv\"},{\"tag_name\":\"加购\",\"tag_key\":\"field_join_cart\"}]','测试内容002',0,1613631695,0),
	(17,1,'测试标题002',0,0,'[{\"tag_name\":\"PV\",\"tag_key\":\"field_pv\"},{\"tag_name\":\"UV\",\"tag_key\":\"field_uv\"},{\"tag_name\":\"加购\",\"tag_key\":\"field_join_cart\"}]','测试内容002',0,1613631695,0),
	(18,1,'测试标题002',0,0,'[{\"tag_name\":\"PV\",\"tag_key\":\"field_pv\"},{\"tag_name\":\"UV\",\"tag_key\":\"field_uv\"},{\"tag_name\":\"加购\",\"tag_key\":\"field_join_cart\"}]','测试内容002',0,1613631695,0),
	(19,1,'测试标题002',0,0,'[{\"tag_name\":\"PV\",\"tag_key\":\"field_pv\"},{\"tag_name\":\"UV\",\"tag_key\":\"field_uv\"},{\"tag_name\":\"加购\",\"tag_key\":\"field_join_cart\"}]','测试内容002',0,1613631695,0),
	(20,1,'测试标题002',0,0,'[{\"tag_name\":\"PV\",\"tag_key\":\"field_pv\"},{\"tag_name\":\"UV\",\"tag_key\":\"field_uv\"},{\"tag_name\":\"加购\",\"tag_key\":\"field_join_cart\"}]','测试内容002',0,1613631695,0),
	(21,1,'测试标题002',0,0,'[{\"tag_name\":\"PV\",\"tag_key\":\"field_pv\"},{\"tag_name\":\"UV\",\"tag_key\":\"field_uv\"},{\"tag_name\":\"加购\",\"tag_key\":\"field_join_cart\"}]','测试内容002',0,1613631695,0),
	(22,1,'测试标题002',0,0,'[{\"tag_name\":\"PV\",\"tag_key\":\"field_pv\"},{\"tag_name\":\"UV\",\"tag_key\":\"field_uv\"},{\"tag_name\":\"加购\",\"tag_key\":\"field_join_cart\"}]','测试内容002',0,1613631695,0),
	(23,1,'测试标题002',0,0,'[{\"tag_name\":\"PV\",\"tag_key\":\"field_pv\"},{\"tag_name\":\"UV\",\"tag_key\":\"field_uv\"},{\"tag_name\":\"加购\",\"tag_key\":\"field_join_cart\"}]','测试内容002',0,1613631695,0),
	(24,1,'测试标题002',0,0,'[{\"tag_name\":\"PV\",\"tag_key\":\"field_pv\"},{\"tag_name\":\"UV\",\"tag_key\":\"field_uv\"},{\"tag_name\":\"加购\",\"tag_key\":\"field_join_cart\"}]','测试内容002',0,1613631695,0);

/*!40000 ALTER TABLE `activity` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table project
# ------------------------------------------------------------

DROP TABLE IF EXISTS `project`;

CREATE TABLE `project` (
  `project_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(64) NOT NULL DEFAULT '',
  `tag_conf` text NOT NULL,
  `description` text NOT NULL,
  `start_date` bigint(20) NOT NULL DEFAULT '0',
  `end_date` bigint(20) NOT NULL DEFAULT '0',
  `status` tinyint(2) unsigned NOT NULL DEFAULT '0',
  `created_at` bigint(20) NOT NULL DEFAULT '0',
  `updated_at` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;

INSERT INTO `project` (`project_id`, `title`, `tag_conf`, `description`, `start_date`, `end_date`, `status`, `created_at`, `updated_at`)
VALUES
	(1,'欧莱雅111a a a','[{\"tag_name\":\"用户PV\",\"tag_key\":\"field_pv\",\"description\":\"\"}]','描述信息222bbb',1617173360641,1618901360641,0,1617173360641,0),
	(2,'欧莱雅111','[{\"tag_name\":\"aaa\",\"tag_key\":\"aaa\",\"description\":\"aaa\"},{\"tag_key\":\"field_join\",\"tag_name\":\"加购\",\"description\":\"\"}]','描述信息222',1617263212166,1618472812166,0,1617173360641,0),
	(3,'aaaa111','[{\"tag_name\":\"用户UV\",\"tag_key\":\"field_uv\",\"description\":\"\"},{\"tag_name\":\"用户PV\",\"tag_key\":\"field_pv\",\"description\":\"\"}]','bbb222',1617166084449,1618894084449,0,1617173360641,0),
	(4,'aaa111','[{\"tag_key\":\"field_pv\",\"tag_name\":\"用户PV\",\"description\":\"\"},{\"tag_key\":\"field_uv\",\"tag_name\":\"用户UV\",\"description\":\"\"}]','bbb222',1617264873292,1618042473292,0,0,0);

/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table report
# ------------------------------------------------------------

DROP TABLE IF EXISTS `report`;

CREATE TABLE `report` (
  `report_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(64) NOT NULL DEFAULT '',
  `tag_conf` text NOT NULL,
  `description` text NOT NULL,
  `status` tinyint(2) unsigned NOT NULL DEFAULT '0',
  `created_at` int(11) NOT NULL DEFAULT '0',
  `updated_at` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`report_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `report` WRITE;
/*!40000 ALTER TABLE `report` DISABLE KEYS */;

INSERT INTO `report` (`report_id`, `title`, `tag_conf`, `description`, `status`, `created_at`, `updated_at`)
VALUES
	(1,'报表-1','[]','',0,0,0);

/*!40000 ALTER TABLE `report` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table sys_role
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sys_role`;

CREATE TABLE `sys_role` (
  `role_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `role_name` varchar(64) NOT NULL DEFAULT '',
  `role_alias` varchar(64) NOT NULL DEFAULT '',
  `routes_conf` tinyint(2) unsigned NOT NULL DEFAULT '0',
  `description` text NOT NULL,
  `created_at` int(11) NOT NULL DEFAULT '0',
  `updated_at` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table sys_tag
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sys_tag`;

CREATE TABLE `sys_tag` (
  `tag_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `tag_name` varchar(64) NOT NULL DEFAULT '',
  `tag_key` varchar(64) NOT NULL DEFAULT '',
  `description` text NOT NULL,
  `status` tinyint(2) unsigned NOT NULL DEFAULT '0',
  `created_at` int(11) NOT NULL DEFAULT '0',
  `updated_at` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `sys_tag` WRITE;
/*!40000 ALTER TABLE `sys_tag` DISABLE KEYS */;

INSERT INTO `sys_tag` (`tag_id`, `tag_name`, `tag_key`, `description`, `status`, `created_at`, `updated_at`)
VALUES
	(1,'用户PV','field_pv','',0,0,0),
	(2,'用户UV','field_uv','',0,0,0),
	(3,'bb','aa','cc',0,0,0),
	(4,'gg','eee','hh',0,0,0);

/*!40000 ALTER TABLE `sys_tag` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table sys_user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sys_user`;

CREATE TABLE `sys_user` (
  `user_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `mobile` varchar(64) NOT NULL DEFAULT '',
  `password` varchar(64) NOT NULL DEFAULT '',
  `role_id` tinyint(4) NOT NULL DEFAULT '0',
  `status` tinyint(2) unsigned NOT NULL DEFAULT '0',
  `description` text NOT NULL,
  `token` varchar(32) NOT NULL DEFAULT '',
  `created_at` int(11) NOT NULL DEFAULT '0',
  `updated_at` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `sys_user` WRITE;
/*!40000 ALTER TABLE `sys_user` DISABLE KEYS */;

INSERT INTO `sys_user` (`user_id`, `mobile`, `password`, `role_id`, `status`, `description`, `token`, `created_at`, `updated_at`)
VALUES
	(1,'17611220968','63ee451939ed580ef3c4b6f0109d1fd0',0,0,'','a62082e0729c37dca0c93546f7831362',0,0);

/*!40000 ALTER TABLE `sys_user` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
