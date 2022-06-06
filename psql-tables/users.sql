-- creates table for users 

create table users (
    email text primary key,
    fname text,
    lname text,
    role text
);

-- create function addUser(email, fname, lname, role) returns 

-- table of users that have requested to sign up
create table signupRequests (
    email text primary key,
    fname text,
    lname text,
    role text
);

create table approvedEmails (
    email text primary key,
    role text
);

create table sessions (
    sid text primary key, -- secure session key
    email text            -- authenticated email 
);