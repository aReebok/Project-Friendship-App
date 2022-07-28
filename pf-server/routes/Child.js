const express = require('express');
const router = express.Router();

const pool = require('./index');

router.post('/', (request, response) => {
	let { fname, lname, dob, school, pronouns } = request.body;

	console.log(`Got request to add a child, will add ${fname} ${lname} to database table child`);
    pool.query('INSERT INTO child (fname, lname, dob, school, pronouns) VALUES ($1, $2, $3, $4, $5)',
	       [fname, lname, dob, school, pronouns])
	.then(res => {
	    console.log('DB response: ' + res.rows[0]);
	    response.sendStatus(200)
	})
	.catch(err =>
	       setImmediate(() => {
		   throw err;
	       }));
})

router.delete('/', (request, response) => {
    let cid = request.body.cid;
    console.log(`Got request to delete previously created sessions, will remove ${cid} from child table if exists`);
    pool.query('DELETE FROM child WHERE cid = $1', [cid])
	.then(res => {
	    console.log('DB response: ' + res.rows[0]);
	    response.sendStatus(200)
	})
	.catch(err =>
	       setImmediate(() => {
		   throw err;
	       }));
})

router.get('/', (request, response) => {
    pool.query('SELECT * FROM child')
	.then(res => {
	    console.log('DB response: ' + JSON.stringify(res.rows));
	    response.send(res.rows);
	})
	.catch(err =>
	       setImmediate(() => {
		   throw err;
	       }));
})

router.put('/', (request, response) => {
    console.log(`Got request to get child of given cid`);
	let cid = request.body.cid;
	console.log("Check for cid: " + cid)
    pool.query('SELECT * FROM child where cid = ($1)', [cid])
	.then(res => {
	    console.log('DB response: ' + JSON.stringify(res.rows[0]));
	    response.send(res.rows[0]);
	}).catch(err =>
	       setImmediate(() => {
		   throw err;
	       }));
})

module.exports = router;

