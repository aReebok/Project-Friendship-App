const express = require('express');
const router = express.Router();

const pool = require('./index');

router.post('/', (request, response) => {
	let { cid, email, isParent } = request.body;

	console.log(`Got request to add a realtionship with child ${cid}, 
        will add ${email} to database table childrelationship`);
    pool.query('INSERT INTO childrelationship (cid, email, isparent) VALUES ($1, $2, $3)',
	       [cid, email, isParent])
	.then(res => {
	    console.log('DB response: ' + res.rows[0]);
	    response.sendStatus(200)
	})
	.catch(err =>
	       setImmediate(() => {
		   throw err;
	       }));
})

router.delete('/cid', (request, response) => {
    let cid = request.body.cid;
    console.log(`Got request to delete all childrelationship under cid: ${cid}
     from childrelationship table if exists`);
    pool.query('DELETE FROM childrelationship WHERE cid = $1', [cid])
	.then(res => {
	    console.log('DB response: ' + res.rows[0]);
	    response.sendStatus(200)
	})
	.catch(err =>
	       setImmediate(() => {
		   throw err;
	       }));
})


router.delete('/all', (request, response) => {
    console.log(`Got request to delete previously created sessions, will remove ${cid} from child table if exists`);
    pool.query('DELETE FROM childrelationship')
	.then(res => {
	    console.log('DB response: ' + res.rows[0]);
	    response.sendStatus(200)
	})
	.catch(err =>
	       setImmediate(() => {
		   throw err;
	       }));
})

router.delete('/email', (request, response) => {
    let email = request.body.email;
    console.log(`Got request to delete previously created sessions, will remove ${email} from childrelationship table if exists`);
    pool.query('DELETE FROM childrelationship WHERE email = $1', [email])
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
    pool.query('SELECT * FROM childrelationship')
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
    console.log(`Got request to get realtionships of given email`);
	let email = request.body.email;
	console.log("Check for email: " + email)
    pool.query('SELECT * FROM childrelationship where email = ($1)', [email])
	.then(res => {
	    console.log('DB response: ' + JSON.stringify(res.rows[0]));
	    response.send(res.rows[0]);
	}).catch(err =>
	       setImmediate(() => {
		   throw err;
	       }));
})

module.exports = router;

