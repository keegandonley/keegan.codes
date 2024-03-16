CREATE TABLE `user_timeline_views` (
	`id` int NOT NULL AUTO_INCREMENT,
    `user_id` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`ts` datetime NOT NULL,
    `from_modal` tinyint(1) NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_0900_ai_ci;

  CREATE TABLE `user_timeline_cheers` (
	`id` int NOT NULL AUTO_INCREMENT,
    `user_id` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`ts` datetime NOT NULL,
    `from_modal` tinyint(1) NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_0900_ai_ci;