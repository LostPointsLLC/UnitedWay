/* Schema for the database.
 * This was not the actual code, just for reference.
 * For consistency, the PHP framework will work with these attributes for each
 * object as well.
 */

create table checklist {
	checklist_tip text,
	checklist_age int,
	checklist_id key int,
	checklist_category varchar(225),
	checklist_completed bit
};

create table rss {
	rss_url varchar(225),
	rss_title varchar(225),
	rss_source varchar(225),
	rss_id int

};

create table children {
	child_age int,
	child_color text, /* To store a 64 unsigned number for a color */
	child_name varchar(30),
	child_gender bit, /* 0 for male, 1 for female */
	child_id int,
	child_parentID int

};

create table tips {
	tips_age int,
	tips_category text,
	tips_id int,
	tips_title varchar(225)

};


create table favorites {
	favorites_type varchar(225),
	favorites_id int,
	favorites_userID int

};

create table users {
	user_name varchar(30),
	user_id int,
	user_email varchar(30),
	user_password text,
	user_phone text,
	user_language varchar(30) /* ENG = English */

};



create table event {
	event_title varchar(225),
	event_date date,
	event_time time,
	event_place varchar(225),
	event_url text,
	event_sponsor varchar(225),
	event_id int

};