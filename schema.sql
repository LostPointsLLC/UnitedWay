/* Schema for the database.
 * This was not the actual code, just for reference.
 * For consistency, the PHP framework will work with these attributes for each
 * object as well.
 */

create table checklist (
	check_id key int,
	check_age int,
	check_tip text,
	check_category varchar(30),
	check_completed bit
);

create table rss (
	rss_id key int,
	rss_url text,
	rss_title varchar(255),
	rss_source varchar(255)


);

create table children {
	child_id key int,
	child_parentID int
	child_age int,
	child_color text, /* To store a 64 unsigned number for a color */
	child_name varchar(30),
	child_gender bit, /* 0 for male, 1 for female */


};

create table tips {
	tip_id key int,
	tip_age int,
	tip_category varchar(30),
	tip_title varchar(255)

};


create table favorites (
	fav_id key int,
	fav_userID int,
	fav_type varchar(20) /* type of object */


);

create table users (
	user_id key int,
	user_password varchar(30),
	user_phone text, (nullable)
	user_name varchar(30),
	user_email varchar(30),
	user_language varchar(20) /* ENG = English */

);



create table events (
	event_id key int
	event_date date,
	event_time time,
	event_url text,
	event_place varchar(225),
	event_title varchar(225),
	event_sponsor varchar(225),


);