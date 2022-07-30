-- There are 2 relationship tables, I will delete the other one
-- and primarily use this one. I like the structure of this better

create table childrelationship (
    rid serial primary key,
    cid text,
    personEmail text,
    isParent boolean
);
