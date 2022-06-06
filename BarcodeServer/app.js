var express = require('express');
var bodyParser = require('body-parser');
const { Pool } = require('pg');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }))

//// -- test 
app.get('/test', (request, response) => {
    console.log(`TEST REQUEST.... Processing`);
    // console.log(request.query);  // verbose output
    // let sessionID = request.query.sessionid;
    pool.query('SELECT * FROM RELATIONSHIPS')
	.then(res => {
	    console.log('DB response: ' + JSON.stringify(res.rows));
	    response.send(res.rows);
	})
	.catch(err =>
	       setImmediate(() => {
		   throw err;
	       }));
})

// delete session key
app.delete('/sessions/delete', (request, response) => {
    let email = request.body.email;
	let sid = request.body.sid;

    console.log(`Got request to delete previously created sessions, will remove ${sid} from session table if exists`);
    pool.query('DELETE FROM SESSIONS WHERE sid = $1 OR email = $2', [sid, email])
	.then(res => {
	    console.log('DB response: ' + res.rows[0]);
	    response.sendStatus(200)
	})
	.catch(err =>
	       setImmediate(() => {
		   throw err;
	       }));
})


app.post('/sessions/add', (request, response) => {
    let sid = request.body.sid;
    let email = request.body.email;

	console.log(`Got request to add a session, will add ${sid},${email} to database`);
    pool.query('INSERT INTO sessions (sid, email) VALUES ($1, $2)',
	       [sid, email])
	.then(res => {
	    console.log('DB response: ' + res.rows[0]);
	    response.sendStatus(200)
	})
	.catch(err =>
	       setImmediate(() => {
		   throw err;
	       }));
})



// handle requests

// CREATE session - insert a session key and email address into session table
// body parameters:
//	sessionid	string	new session id
//	email		string	authenticated email address

app.post('/session', (request, response) => {
    console.log("/session request");
    console.log(request.body)  // verbose output
    let sessionID = request.body.sessionid;
    let email = request.body.email;
    console.log(`Got request to add a session, will add ${sessionID},${email} to database`);
    pool.query('INSERT INTO session (sessionid, email) VALUES ($1, $2)',
	       [sessionID, email])
	.then(res => {
	    console.log('DB response: ' + res.rows[0]);
	    response.sendStatus(200)
	})
	.catch(err =>
	       setImmediate(() => {
		   throw err;
	       }));
})


// RETRIEVE email - send email associated with current session ID

app.get('/email', (request, response) => {
    console.log(`Got request for email`);
    //console.log(request.query);  // verbose output
    let sessionID = request.query.sessionid;
    pool.query('SELECT email($1)', [sessionID])
	.then(res => {
	    console.log('DB response: ' + JSON.stringify(res.rows[0]));
	    response.send(res.rows[0]);
	})
	.catch(err =>
	       setImmediate(() => {
		   throw err;
	       }));
})




// RETRIEVE profile - send profile object associated with current session ID

app.get('/profile', (request, response) => {
    console.log(`Got request to retrieve profile`);
    //console.log(request.query);  // verbose output
    let sessionID = request.query.sessionid;
    pool.query('SELECT * FROM profile WHERE email = email($1)', [sessionID])
	.then(res => {
	    console.log('DB response: ' + JSON.stringify(res.rows));
	    response.send(res.rows);
	})
	.catch(err =>
	       setImmediate(() => {
		   throw err;
	       }));
})

// UPDATE profile - update all profile settings
// body parameters:
//	sessionid	string	new session id
//	name		string	preferred name
//	color		string	background color

app.put('/profile', (request, response) => {
    console.log("/profile update request");
    //console.log(request.body)  // verbose output
    let sessionID = request.body.sessionid;
    let name = request.body.name;
    let color = request.body.color;
    console.log(`Got request to update profile (${name}, ${color}) for sessionid ${sessionID}`);
    pool.query('SELECT update_profile($1, $2, $3)', [sessionID, name, color])
	.then(res => {
	    console.log('DB response: ' + res.rows[0]);
            response.sendStatus(200);
	})
	.catch(err => setImmediate(() => { throw err; }));
})


// CREATE profile - set up default profile for email if none exists (idempotent)
// body parameters:
//	email	string	authenticated email

app.post('/profile', (request, response) => {
    //console.log("/profile check/create request");
    //console.log(request.body)  // verbose output
    let email = request.body.email; 
    console.log(`Got request to check profile for authenticated email ${email}`);
    pool.query('INSERT INTO profile (email) VALUES ($1)', [email])
	.then(res => {
	    console.log('Default profile created');
            response.sendStatus(200);
	})
	.catch(err => {
	    if (err.code === '23505') { // unique_violation
		console.log('Profile already exists');
		response.sendStatus(200);
	    }else
		setImmediate(() => { throw err; })
	});
})


// catch 404 and forward to error handler

app.use(function(request, response, next) {
  console.error("RAB error!");
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, request, response, next) {
  // set locals, only providing error in development
  response.locals.message = err.message;
  //response.locals.error = request.app.get('env') === 'development' ? err : {};
  response.locals.error = err;

  // render the error page
  response.status(err.status || 500);
});


/* Main program */

console.log(`Starting oauth-server`);

const lib = require('./mcalib');
lib.setErrorPrefix(__filename);  // set label for lib error messages

// database connection parameters
const dbHost = "anansi.stolaf.edu";
const user = 'khan6';    // CHANGE to your username, e.g., jones1
const password = lib.getPGPassword(dbHost);  // uncomment for Windows
const dbName = 'mca_f21';
const schema = 'pf';  // CHANGE to your username as schema for Lab 5
                       // CHANGE to team schema for project

const pool = new Pool({
    user: user,
   password: password,                      // uncomment for Windows
    host: dbHost,
    database: dbName,
    port: 5432,
});

pool.on('connect', client => {
    client.query(`SET search_path = ${schema}, public;`)
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

console.log(`Connected to database ${dbName} on ${dbHost}`);

console.log("IP addresses:  ", lib.getIPAddresses());

module.exports = app;
