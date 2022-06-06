-- set up relationship table

create table relationships (
    rid serial primary key,
    person1 text,
    person2 text,
    relation text default 'friend'
);

INSERT INTO RELATIONSHIPS (person1, person2) VALUES ('Areeba','Risha');
INSERT INTO RELATIONSHIPS (person1, person2) VALUES ('Areeba','Huzaifa');
