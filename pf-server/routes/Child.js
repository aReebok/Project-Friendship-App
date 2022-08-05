const express = require('express');
const router = express.Router();
const pool = require('./index');

/**
 * @swagger  
 * /child:
 *  post:
 *    description: Use to post a child profile
 *    parameters:
 *    - name: fname
 *      description: first name of child
 *      in: formData
 *      required: true
 *      type: String
 *    - name: lname
 *      description: last name of child
 *      in: formData
 *      required: true
 *      type: String
 *    - name: dob
 *      description: date of birth of child
 *      in: formData
 *      required: true
 *      type: String
 *    - name: school
 *      description: school of child
 *      in: formData
 *      required: true
 *      type: String
 *    - name: pronouns
 *      description: pronouns of child
 *      in: formData
 *      required: true
 *      type: String
 *    - name: notes
 *      description: notes regarding child 
 *      in: formData
 *      required: true
 *      type: String
 * 
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.post('/', (request, response) => {
	let { fname, lname, dob, school, pronouns, notes } = request.body;

	console.log(`Got request to add a child, will add ${fname} ${lname} to database table child`);
    pool.query('INSERT INTO child (fname, lname, dob, school, pronouns, notes) VALUES ($1, $2, $3, $4, $5, $6)',
	       [fname, lname, dob, school, pronouns, notes])
	.then(res => {
	    console.log('DB response: ' + res.rows[0]);
	    response.sendStatus(200)
	})
	.catch(err =>
	       setImmediate(() => {
		   throw err;
	       }));
})

/**
 * @swagger  
 * /child:
 *  get:
 *    description: returns all child profiles
 *    responses:
 *      '200':
 *        description: all child profiles returned
 */
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

/**
 * @swagger  
 * /child:
 *  put:
 *    description: get child profile by cid
 *    parameters:
 *    - name: cid
 *      description: child ID for child profile
 *      in: formData
 *      required: true
 *      type: integer
 *    responses:
 *      '200':
 *        description: Child profile JSON object returned by cid
 */
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

/**
 * @swagger  
 * /child/dobSearch:
 *  put:
 *    description: get child profile by date of birth and last name
 *    parameters:
 *    - name: dob
 *      description: date of birth of child
 *      in: formData
 *      required: true
 *      type: String
 *    - name: lname
 *      description: last name of child
 *      in: formData
 *      required: true
 *      type: String
 *    responses:
 *      '200':
 *        description: a child object
 */
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
	CHILDRELATIONSHIP TABLE Endpoints
*/

/**
 * @swagger  
 * /child/childrs:
 *  post:
 *    description: Posts a relationshp between a given child profile and user profile
 *    parameters:
 *    - name: cid
 *      description: child ID of profile to create a relationship for 
 *      in: formData
 *      required: true
 *      type: int
 *    - name: email
 *      description: email of the user to add to realtionship with child
 *      in: formData
 *      required: true
 *      type: String
 *    - name: isParent
 *      description: boolean to describe if the user profile is parent of child profile
 *      in: formData
 *      required: true
 *      type: Boolean
 *    responses:
 *      '200':
 *        description: A successful response
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

/**
 * @swagger  
 * /child/childrs:
 *  put:
 *    description: Posts a relationshp between a given child profile and user profile
 *    parameters:
 *    - name: cid
 *      description: child ID of profile to create a relationship for 
 *      in: formData
 *      required: true
 *      type: int
 *    - name: email
 *      description: email of the user to add to realtionship with child
 *      in: formData
 *      required: true
 *      type: String
 *    - name: isParent
 *      description: boolean to describe if the user profile is parent of child profile
 *      in: formData
 *      required: true
 *      type: Boolean
 *    responses:
 *      '200':
 *        description: A successful response
 */
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

/**
 * @swagger  
 * /child:
 *  delete:
 *    description: delete child profile when given cid
 *    parameters:
 *    - name: cid
 *      description: child ID to delete
 *      in: formData
 *      required: true
 *      type: int
 *    responses:
 *      '200':
 *        description: Child successfully deleted
 */
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

module.exports = router;

