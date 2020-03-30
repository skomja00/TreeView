USE SP20_3344_tun49199;
--     beverages
--       |--- water
--       |--- coffee
--            |--- database
--       |--- tea
--            |--- black
--            |--- white
--            |--- green
--                 |--- sencha
--                 |--- gyokuro
--                 |--- matcha
--                 |--- pi lo chun
--  
/**
 *    clear dbase
**/
SET FOREIGN_KEY_CHECKS=0;
	DROP TABLE IF EXISTS `bev`;
	DROP TABLE IF EXISTS `bevType`;
	DROP TABLE IF EXISTS `bevIngredient`;
SET FOREIGN_KEY_CHECKS=1;
/**
 *    create tables 
**/
    CREATE TABLE `bev` (
        `bev_id` VARCHAR(255) NOT NULL,
        PRIMARY KEY (`bev_id`)
    )
    ENGINE = InnoDB;
    CREATE TABLE `bevType` (
        `bevType_id` VARCHAR(255) NOT NULL,
        `bev_id` VARCHAR(255) NOT NULL,
        PRIMARY KEY (`bevType_id`),
        CONSTRAINT `bev_fk` FOREIGN KEY (`bev_id`) REFERENCES `bev` (`bev_id`) 
    )
    ENGINE = InnoDB;
    CREATE TABLE `bevIngredient` (
        `bevType_id` VARCHAR(255) NOT NULL,
        `ingredient` VARCHAR(255) NOT NULL,
        CONSTRAINT `bevType_fk` FOREIGN KEY (`bevType_id`) REFERENCES `bevType` (`bevType_id`) 
    )
    ENGINE = InnoDB;
/**
 *    Insert sample data
**/
    INSERT INTO `bev` (`bev_id`) VALUES ('water');
    INSERT INTO `bev` (`bev_id`) VALUES ('coffee');
    INSERT INTO `bevType` (`bev_id`,`bevType_id`) VALUES ('coffee', 'server-side');
    INSERT INTO `bev` (`bev_id`) VALUES ('tea');
    INSERT INTO `bevType` (`bev_id`,`bevType_id`) VALUES ('tea', 'black');
    INSERT INTO `bevType` (`bev_id`,`bevType_id`) VALUES ('tea', 'white');
    INSERT INTO `bevType` (`bev_id`,`bevType_id`) VALUES ('tea', 'green');
    INSERT INTO `bevIngredient` (`bevType_id`,`ingredient`) VALUES ('green','sencha');
    INSERT INTO `bevIngredient` (`bevType_id`,`ingredient`) VALUES ('green','gyokuro');
    INSERT INTO `bevIngredient` (`bevType_id`,`ingredient`) VALUES ('green','matcha');
    INSERT INTO `bevIngredient` (`bevType_id`,`ingredient`) VALUES ('green','pi lo chun');
/**
 *     The requirements for the TreeView database query are as follows:
 *
 *     1. Use LEFT JOINs in the query. INNER joins will not return all rows, and the resulting tree would be missing branches.
 *        A null indicates nothing further on the branch. It marks the end of a list (i.e. </ul>) in the TreeView. 
 *        A leaf will not open or close since it has no children (e.g. water).
 *
 *     2. Give the TreeView a name (i.e. root node) by typing a hard-code value in the 1st column of the query (e.g. 'beverages'). 
**/
    

DELIMITER $$
DROP PROCEDURE IF EXISTS `list`$$
CREATE PROCEDURE list()
BEGIN
    select 
        'beverages' as a, 
        bev.bev_id as b,
        bevType.bevType_id as c,
        bevIngredient.ingredient as d
    from bev
    left outer join bevType on bevType.bev_id = bev.bev_id
    left outer join bevIngredient on bevIngredient.bevType_id = bevType.bevType_id
    order by 1,2,3,4;
END$$
-- DELIMITER ;

