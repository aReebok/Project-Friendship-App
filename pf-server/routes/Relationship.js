const express = require('express');
const router = express.Router();
const pool = require('./index');

router.put('/', (request, response) => {
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

router.delete('/', (request, response) => {
    let email = request.body.email;
	console.log("Delete all relationships for email: " + email)
    pool.query('DELETE from relationships WHERE person1 = $1 OR person2 = $1', [email])
	.then(res => {
		console.log('DB response: ' + res.rows[0]);
	    response.sendStatus(200);
	})
	.catch(err =>
	       setImmediate(() => {
		   throw err;
	       }));
})

module.exports = router;