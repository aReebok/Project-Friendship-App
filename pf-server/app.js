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

    console.log(`Got request to delete previously created sessions, will remove ${sid}, ${email} from session table if exists`);
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

app.put('/session/get', (request, response) => {
    console.log(`Got request for email`);
    let sid = request.body.sid;
	console.log("Check for sid: " + sid)
    pool.query('SELECT email($1)', [sid])
	.then(res => {
	    console.log('DB response: ' + JSON.stringify(res.rows[0]));
	    response.send(res.rows[0]);
	})
	.catch(err =>
	       setImmediate(() => {
		   throw err;
	       }));
})


app.get('/users', (request, response) => {
    pool.query('SELECT * FROM users')
	.then(res => {
	    console.log('DB response: ' + JSON.stringify(res.rows));
	    response.send(res.rows);
	})
	.catch(err => setImmediate(() => { throw err; })); })

app.post('/users/add', (request, response) => {
	let { email, fname, lname, phone, role } = request.body;

	console.log(`Got request to add profile, will add ${fname} ${lname} to database table users`);
    pool.query('INSERT INTO users (email, fname, lname, role, phone) VALUES ($1, $2, $3, $4, $5)',
	       [email, fname, lname, role, phone])
	.then(res => {
	    console.log('DB response: ' + res.rows[0]);
	    response.sendStatus(200)
	})
	.catch(err =>
	       setImmediate(() => {
		   throw err;
	       }));
})

app.put('/users/get', (request, response) => {
    console.log(`Got request to check if email`);
	let email = request.body.email;
	console.log("Check for email: " + email)
    pool.query('SELECT * FROM users where email = ($1)', [email])
	.then(res => {
	    console.log('DB response: ' + JSON.stringify(res.rows[0]));
	    response.send(res.rows[0]);
	})
	.catch(err =>
	       setImmediate(() => {
		   throw err;
	       }));
})

app.delete('/users/delete', (request, response) => {
    let email = request.body.email;
    console.log(`Got request to delete user, will remove ${email} from users table`);
    pool.query('DELETE FROM users WHERE email = $1', [email])
	.then(res => {
	    console.log('DB response: ' + res.rows[0]);
	    response.sendStatus(200)
	})
	.catch(err =>
	       setImmediate(() => {
		   throw err;
	       }));
})

/* RELATIONSHIPS */

app.put('/relationship/get', (request, response) => {
    let email = request.body.email;
	console.log("Retrive all realtionships for email: " + email)
    pool.query('SELECT * from relationships WHERE person1 = $1 OR person2 = $1', [email])
	.then(res => {
	    console.log('DB response: ' + JSON.stringify(res.rows));
	    response.send(res.rows);
	})
	.catch(err =>
	       setImmediate(() => {
		   throw err;
	       }));
})


/*
* Registration requests post, get, delete
*
*/
app.post('/register/request', (request, response) => {
	let { email, fname, lname, phone, role } = request.body;

	console.log(`Got request to register, will add ${fname} ${lname} to database table registerRequests`);
    pool.query('INSERT INTO registerRequests (email, fname, lname, role, phone) VALUES ($1, $2, $3, $4, $5)',
	       [email, fname, lname, role, phone])
	.then(res => {
	    console.log('DB response: ' + res.rows[0]);
	    response.sendStatus(200)
	})
	.catch(err =>
	       setImmediate(() => {
		   throw err;
	       }));
})
app.delete('/register/request', (request, response) => {
    let email = request.body.email;
    console.log(`Got request to delete previously created sessions, will remove ${email} from registerrequests table if exists`);
    pool.query('DELETE FROM registerrequests WHERE email = $1', [email])
	.then(res => {
	    console.log('DB response: ' + res.rows[0]);
	    response.sendStatus(200)
	})
	.catch(err =>
	       setImmediate(() => {
		   throw err;
	       }));
})


app.post('/register/request', (request, response) => {
	let { email, fname, lname, role, phone } = request.body;

	console.log(`Got request to register, will add ${fname} ${lname} to database table registerRequests`);
    pool.query('INSERT INTO registerRequests (email, fname, lname, role, phone) VALUES ($1, $2, $3, $4, $5)',
	       [email, fname, lname, role, phone])
	.then(res => {
	    console.log('DB response: ' + res.rows[0]);
	    response.sendStatus(200)
	})
	.catch(err =>
	       setImmediate(() => {
		   throw err;
	       }));
})

app.get('/register/request', (request, response) => {
    pool.query('SELECT * FROM registerRequests')
	.then(res => {
	    console.log('DB response: ' + JSON.stringify(res.rows));
	    response.send(res.rows);
	})
	.catch(err =>
	       setImmediate(() => {
		   throw err;
	       }));
})

app.put('/register/request', (request, response) => {
    console.log(`Got request to check if email exists`);
	let email = request.body.email;
	console.log("Check for email: " + email)
    pool.query('SELECT * FROM registerRequests where email = ($1)', [email])
	.then(res => {
	    console.log('DB response: ' + JSON.stringify(res.rows[0]));
	    response.send(res.rows[0]);
	}).catch(err =>
	       setImmediate(() => {
		   throw err;
	       }));
})

// catch 404 and forward to error handler

app.use(function(request, response, next) {
  console.error("EEError!");
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

console.log(`Starting pf-server`);

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
