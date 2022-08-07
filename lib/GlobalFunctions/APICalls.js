const CONFIG = require('../../config/app.config.js');
const handlePress = require('../GlobalFunctions/HandlePress'); 
const formContentType = CONFIG.formContentType;


/**
 * GET API calls
 */
export const getEmailFromSessionID = async (sid) => {
    const { email } = await handlePress('sessions', 'PUT', {
        headers: {"Content-type": formContentType}, body: `sid=${sid}&`}); 
    return email;
}

export const getUserProfile = async (email) => {
    return await handlePress('users', 'PUT', {
        headers: {"Content-type": formContentType}, body: `email=${email}&`});
}

export const getRelationsByEmail = async (email) => {
    return await handlePress('childrs', 'PUT', {
        headers: {"Content-type": formContentType}, body: `email=${email}&`});
}

export const getChildProfileByChildID = async (cid) => {
    return await handlePress('child', 'PUT', { 
        headers: {"Content-type": formContentType}, body: `cid=${cid}&`});
}

export const getChildProfileByLnameDOB = async (lname, dob) => {
    await handlePress('child/dobSearch', 'PUT', {
        headers: {"Content-type": formContentType}, 
        body: `lname=${lname}&dob=${dob}`});
}

export const getChildMentorEmailByChildID = async (cid) => {
    return await handlePress('childrs/findMentorEmail', 'PUT', {
    headers: {"Content-type": formContentType}, body: `cid=${cid}&`});
}

export const getChildParentEmailByChildID = async (cid) => {
    return handlePress('childrs/findParentEmail', 'PUT', {
        headers: {"Content-type": formContentType}, body: `cid=${cid}&`});
}




/**
 * POST API calls
 */

export const createChild = async (fname, lname, dob, school, pronouns, notes) => {
    return await handlePress('child', 'POST', {
        headers: {"Content-type": formContentType}, 
        body: `fname=${fname}&lname=${lname}&dob=${dob}&school=${school}&pronouns=${proouns}&notes=${notes}`});
}

export const createRelationship = async (cid, email, isparent) => {
    handlePress('childrs', 'POST', {
        headers: {"Content-type": formContentType}, 
        body: `cid=${cid}&email=${email}&isParent=${isparent}`});
}
// export const getEventsByChildID = async (cid) => {
//     return await handlePress('events/approved', 'PUT', { 
//         headers: {"Content-type": formContentType}, body: `cid=${cid}&`});
        
// }