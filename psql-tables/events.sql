-- set up relationship table

create table events (
    eid serial primary key,
    creator text,
    reciever text,
    status text default 'pending' -- pending, approved, expired/completed/removed
    title text,
    desc text,
    date text,
    time text
);

create table eventChangeRequests (
    eid text, 
    creator text,
    reciever text,
    status text default 'pending' -- pending, approved
    
); 