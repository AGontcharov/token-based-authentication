CREATE DATABASE Auth;
USE Auth;

DROP TABLE IF EXISTS `Users`;

CREATE TABLE `Users` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `username` varchar(255) NOT NULL,
    `password` char(60) NOT NULL,
    PRIMARY KEY (`ID`),
    UNIQUE KEY `Username` (`Username`)
);