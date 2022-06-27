-- set up relationship table
-- pending, approved, expired/completed/removed
create table events (
    eid serial primary key,
    author text,
    participant text,
    stat text default 'pending',
    title text,
    descrip text,
    eventDate text,
    eventCreated text
);

-- INSERT INTO events (author, participant, stat, title, descrip, eventDate) VALUES;

create table eventChangeRequests (
    eid text, 
    creator text,
    reciever text,
    status text default 'pending' -- pending, approved
    
); 

