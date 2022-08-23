-- set up relationship table
-- pending, approved, expired/completed/removed
create table events (
    eid serial primary key,
    author text,
    cid text,
    stat text default 'pending',
    title text,
    descrip text,
    eventDate text,
    eventCreated text,
    eventLocation text,
    approvedBy text
);


-- INSERT INTO events (author, participant, stat, title, descrip, eventDate) VALUES;

-- Added a column for eventLocation
-- ALTER TABLE events  ADD COLUMN IF NOT EXISTS eventLocation text
-- ALTER TABLE events RENAME COLUMN author TO mentor;
-- ALTER TABLE events RENAME COLUMN participant TO cid;

-- create table eventChangeRequests (
--     eid text, 
--     creator text,
--     reciever text,
--     status text default 'pending' -- pending, approved
    
-- ); 

