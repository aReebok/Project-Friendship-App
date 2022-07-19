const express = require('express');
const router = express.Router();

router.post('/events/add', (request, response) => {
    let { author, participant, stat, title,
		descrip, eventDate, eventCreated} = request.body;

	console.log(`Got request to add an event, 
			will add ${title} created by ${author} to database`);
    pool.query(
	'INSERT INTO events (author, participant, stat, title, descrip, eventDate, eventCreated) VALUES ($1, $2, $3, $4, $5, $6, $7)',
	       [author, participant, stat, title, descrip, eventDate, eventCreated])
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
