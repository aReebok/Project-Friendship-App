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

router.put('/dobSearch', (request, response) => {
    console.log(`Got request to get child of given cid`);
	let { lname, dob } = request.body;
	console.log("Check for lname and dob in child")
    pool.query('SELECT * FROM child where lname = ($1) AND dob = ($2)', [lname, dob])
	.then(res => {
	    console.log('DB response: ' + JSON.stringify(res.rows[0]));
	    response.send(res.rows[0]);
	}).catch(err =>
	       setImmediate(() => {
		   throw err;
	       }));
})


/*
	CHILDRELATIONSHIP TABLE
*/


router.post('/childrs', (request, response) => {
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

router.put('/childrs', (request, response) => {
    let email = request.body.email;
	console.log("Retrive all realtionships for email: " + email)
    pool.query('SELECT * from childrelationship WHERE email = $1', [email])
	.then(res => {
	    console.log('DB response: ' + JSON.stringify(res.rows));
	    response.send(res.rows);
	})
	.catch(err =>
	       setImmediate(() => {
		   throw err;
	       }));
})

router.put('/childrs/findMentorEmail', (request, response) => {
    let cid = request.body.cid;
	let isParent = '0';
	console.log("Retrive mentor email for given cid: " + cid)
    pool.query('SELECT email from childrelationship WHERE cid = $1 and isparent = $2', [cid, isParent])
	.then(res => {
	    console.log('DB response: ' + JSON.stringify(res.rows[0]));
	    response.send(res.rows);
	})
	.catch(err =>
	       setImmediate(() => {
		   throw err;
	       }));
})

router.put('/childrs/findParentEmail', (request, response) => {
    let cid = request.body.cid;
	let isParent = '1';
	console.log("Retrive parent emails for given cid: " + cid)
    pool.query('SELECT email from childrelationship WHERE cid = $1 and isparent = $2', [cid, isParent])
	.then(res => {
	    console.log('DB response: ' + JSON.stringify(res.rows[0]));
	    response.send(res.rows);
	})
	.catch(err =>
	       setImmediate(() => {
		   throw err;
	       }));
})

router.put('/childrs/checkDuplicateRS', (request, response) => {
    let {cid, email} = request.body;
	
	console.log("Retrive mentor for given cid: " + cid)
    pool.query('SELECT * from childrelationship WHERE cid = $1 and email = $2', [cid, email])
	.then(res => {
	    console.log('DB response: ' + JSON.stringify(res.rows));
	    response.send(res.rows);
	})
	.catch(err =>
	       setImmediate(() => {
		   throw err;
	       }));
})


module.exports = router;

