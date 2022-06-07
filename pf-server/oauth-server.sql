-- database setup for oauth-server example

create table session (
    sessionid text primary key, -- secure session key
    email text            -- authenticated email 
);

-- postgres function email()
--    1 arg of type text, a session id
--    return type text, email for that session id
create function email(text) returns text as $$
    select email from session where sessionid = $1;
$$ language 'sql';

create table profile (
    email text primary key,
    name text default '',   -- preferred name
    color text default 'white'   -- background color
); 	  

-- postgres function update_profile()
--    3 args type text: session id, preferred name, background color
--    no return
create function update_profile(text, text, text) returns void as $$
    DELETE FROM profile WHERE email = email($1);
    INSERT INTO profile VALUES (email($1), $2, $3);
$$ language 'sql';

