-- set up relationship table

create table relationships (
    rid serial primary key,
    person1 text,
    person2 text,
    role1 text,
    role2 text
);

INSERT INTO RELATIONSHIPS (person1, person2, role1, role2) VALUES ('kahnareeba@gmail.com','khan6@stolaf.edu','mentor', 'mentee');
INSERT INTO RELATIONSHIPS (person1, person2, role1, role2) VALUES ('kahnareeba@gmail.com','abc@gmail.com','mentor', 'mentee');

-- query: select * from relationships where person1 = 'email' OR person2 = 'email'