/* Schema for the database.
 * This was not the actual code, just for reference.
 * For consistency, the PHP framework will work with these attributes for each
 * object as well.
 */

 /* Slight error: I meant to put varchar(255), not varchar(225). 
  * But it shouldn't make much of a difference
  */
 
create table checklist {
	check_id key int,
	check_tip text,
	check_age int,
	check_category varchar(225),
	check_completed bit
};

create table rss {
	rss_id int
	rss_url varchar(225),
	rss_title varchar(225),
	rss_source varchar(225),


};

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
	tip_category text, /* Maybe should've been varchar? */
	tip_title varchar(225)

};


create table favorites {
	fav_id key int,
	fav_type varchar(20), /* type of object */
	fav_userID int

};

create table users {
	user_id key int,
	user_name varchar(30),
	user_email varchar(30),
	user_password text,
	user_phone text, (nullable)
	user_language varchar(20) /* ENG = English */

};



create table events {
	event_id key int
	event_date date,
	event_time time,
	event_url text,
	event_place varchar(225),
	event_title varchar(225),
	event_sponsor varchar(225),


};