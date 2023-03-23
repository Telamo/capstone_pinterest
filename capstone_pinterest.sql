-- Adminer 4.8.1 MySQL 8.0.31 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `binh_luan`;
CREATE TABLE `binh_luan` (
  `binh_luan_id` int NOT NULL AUTO_INCREMENT,
  `nguoi_dung_id` int DEFAULT NULL,
  `hinh_id` int DEFAULT NULL,
  `ngay_binh_luan` datetime DEFAULT NULL,
  `noi_dung` mediumtext,
  PRIMARY KEY (`binh_luan_id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  KEY `hinh_id` (`hinh_id`),
  CONSTRAINT `binh_luan_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`),
  CONSTRAINT `binh_luan_ibfk_3` FOREIGN KEY (`hinh_id`) REFERENCES `hinh_anh` (`hinh_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `binh_luan` (`binh_luan_id`, `nguoi_dung_id`, `hinh_id`, `ngay_binh_luan`, `noi_dung`) VALUES
(1,	1,	2,	'2023-02-27 09:00:00',	'ảnh đẹp'),
(2,	1,	4,	'2023-02-27 10:00:00',	'ảnh ok'),
(3,	1,	3,	'2023-02-27 11:00:00',	'ảnh cũng được'),
(4,	2,	1,	'2023-02-27 12:00:00',	'đẹp'),
(5,	3,	2,	'2023-02-27 13:00:00',	'tàm tạm'),
(6,	4,	2,	'2023-02-27 14:00:00',	'ảo'),
(7,	6,	2,	'2023-03-20 10:54:51',	' quá đẹppp lun'),
(8,	6,	2,	'2023-03-21 04:30:50',	' quá đẹppp lun');

DROP TABLE IF EXISTS `hinh_anh`;
CREATE TABLE `hinh_anh` (
  `hinh_id` int NOT NULL AUTO_INCREMENT,
  `ten_hinh` varchar(1000) DEFAULT NULL,
  `duong_dan` mediumtext,
  `mo_ta` varchar(1000) DEFAULT NULL,
  `nguoi_dung_id` int DEFAULT NULL,
  PRIMARY KEY (`hinh_id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  CONSTRAINT `hinh_anh_ibfk_2` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `hinh_anh` (`hinh_id`, `ten_hinh`, `duong_dan`, `mo_ta`, `nguoi_dung_id`) VALUES
(1,	'hinh1',	'duong_dan1',	'mô tả hình 1',	3),
(2,	'hinh2',	'duong_dan2',	'mô tả hình 2',	2),
(3,	'hinh3',	'duong_dan3',	'mô tả hình 3',	4),
(4,	'hinh4',	'duong_dan4',	'mô tả hình 4',	5),
(5,	'hinh5',	'duong_dan5',	'mô tả hình 5',	2),
(6,	'hinh6',	'duong_dan6',	'mô tả hình 6',	5),
(7,	'hinh4',	'1679309636122-hinh4.jpg',	'cánh đồng chiều tối',	6),
(8,	'hinh4',	'1679309837641-hinh4.jpg',	'cánh đồng chiều tối',	6);

DROP TABLE IF EXISTS `luu_anh`;
CREATE TABLE `luu_anh` (
  `nguoi_dung_id` int NOT NULL,
  `hinh_id` int NOT NULL,
  `ngay_luu` datetime DEFAULT NULL,
  PRIMARY KEY (`nguoi_dung_id`,`hinh_id`),
  KEY `hinh_id` (`hinh_id`),
  CONSTRAINT `luu_anh_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`),
  CONSTRAINT `luu_anh_ibfk_3` FOREIGN KEY (`hinh_id`) REFERENCES `hinh_anh` (`hinh_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `luu_anh` (`nguoi_dung_id`, `hinh_id`, `ngay_luu`) VALUES
(1,	2,	'2023-02-27 09:01:00'),
(1,	4,	'2023-02-27 10:01:00'),
(3,	1,	'2023-02-27 14:01:00'),
(4,	1,	'2023-02-27 19:01:00'),
(4,	4,	'2023-03-21 09:47:14'),
(4,	5,	'2023-02-27 15:01:00');

DROP TABLE IF EXISTS `nguoi_dung`;
CREATE TABLE `nguoi_dung` (
  `nguoi_dung_id` int NOT NULL AUTO_INCREMENT,
  `ho_ten` varchar(150) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `mat_khau` varchar(150) DEFAULT NULL,
  `tuoi` int DEFAULT NULL,
  `anh_dai_dien` mediumtext,
  PRIMARY KEY (`nguoi_dung_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `nguoi_dung` (`nguoi_dung_id`, `ho_ten`, `email`, `mat_khau`, `tuoi`, `anh_dai_dien`) VALUES
(1,	'Nguyễn Văn An',	'vanan@gmail.com',	'$2b$10$/D26Vi1VCLgADmf2rkBncuJh6BtEBc2hkJF8GfhP3DpgOXh7hMV5y',	22,	'1679390588795-hinh5.jpg'),
(2,	'Nguyễn Văn Bình',	'vanbinh@gmail.com',	'$2b$10$63s8i483r13.GPeOKDmUnu3gz5lUz7kI2j.9I/IiBgbykGOfvKCrO',	18,	'1679390680038-hinh2.jpg'),
(3,	'Nguyễn Văn Cảnh',	'vancanh@gmail.com',	'$2b$10$3M2XoDvfoUih5VPVAWA7d.jR92hMLE8SU1nweVP0QJrABORqROhpa',	25,	'1679390742399-hinh1.jpg'),
(4,	'Nguyễn Văn Đoàn',	'vandoan@gmail.com',	'$2b$10$CYczMCimmqKJYhDqMjwWCuX5dgcf6IemBpw7T/K/N/2d6Q2nbmikG',	29,	'1679390800692-hinh3.jpg'),
(5,	'Nguyễn Văn Em',	'vanem@gmail.com',	'$2b$10$dOUTe8UI9XcYad75xcry1e19okD.oiZbmlF7TlY8lj.1Jt5uEjg.e',	20,	'1679390879773-hinh6.jpg'),
(6,	'Nguyễn Quang Hải',	'quanghai@gmail.com',	'$2b$10$Nd9sLT5Bm.w58/MBE0YKj.ictL.wkPeSs5q93fTOVknYsVOQtXcLW',	21,	'1679391007224-keanu.jpg');

-- 2023-03-23 10:38:21
