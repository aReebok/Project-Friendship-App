const express = require('express');
const router = express.Router();

const pool = require('./index');

router.post('/', (request, response) => {
    let { author, participant, stat, title,
		descrip, eventDate, eventCreated, eventLocation} = request.body;

	console.log(`Got request to add an event, 
			will add ${title} created by ${author} to database`);
    pool.query(
	'INSERT INTO events (author, participant, stat, title, descrip, eventDate, eventCreated, eventLocation) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
	       [author, participant, stat, title, descrip, eventDate, eventCreated, eventLocation])
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
    console.log(`Got request to get events of given email`);
	let email = request.body.email;
	console.log("Check for cid: " + cid)
    pool.query('SELECT * FROM events where author = ($1)', [email])
	.then(res => {
	    console.log('DB response: ' + JSON.stringify(res.rows[0]));
	    response.send(res.rows[0]);
	}).catch(err =>
	       setImmediate(() => {
		   throw err;
	       }));
})

module.exports = router;
