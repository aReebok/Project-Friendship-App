const express = require('express');
const router = express.Router();
const pool = require('.');

router.get('/', (request, response) => {
    pool.query('SELECT * FROM users')
	.then(res => {
	    console.log('DB response: ' + JSON.stringify(res.rows));
	    response.send(res.rows);
	})
	.catch(err => setImmediate(() => { throw err; })); })

router.post('/', (request, response) => {
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

router.put('/', (request, response) => {
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

router.delete('/', (request, response) => {
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

module.exports = router;