/* Schema for the database.
 * This was not the actual code, just for reference.
 * For consistency, the PHP framework will work with these attributes for each
 * object as well.
 */

create table checklist {
	tip varchar(225),
	age int,
	key id int,
	category varchar(225),
	completed bit
};

create table rss {
	url varchar(225),
	title varchar(225),
	source varchar(225),
	id int

};

create table child {
	age int,
	color numeric(20), /* To store a 64 unsigned number for a color */
	name varchar(225),
	gender bit, /* 0 for male, 1 for female */
	id int,
	parentID int

};

create table tips {
	age int,
	category varchar(225),
	id int,
	title varchar(225)

};


create table favorites {
	item_type varchar(225),
	id int,
	userID int

};

create table users {
	name varchar(225),
	id int,
	password varchar(225)

};



create table event {
	title varchar(225),
	event_date date,
	event_time time,
	place varchar(225),
	url varchar(225),
	sponsor varchar(225),
	id int

};