const CONFIG = require('../../config/app.config.js');
const handlePress = require('../GlobalFunctions/HandlePress'); 
const formContentType = CONFIG.formContentType;

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
    return await handlePress('child/childrs', 'PUT', {
        headers: {"Content-type": formContentType}, body: `email=${email}&`});
}

export const getChildProfileByChildID = async (cid) => {
    return await handlePress('child', 'PUT', { 
        headers: {"Content-type": formContentType}, body: `cid=${cid}&`});
}

export const getChildMentorEmailByChildID = async (cid) => {
    return await handlePress('child/childrs/findMentorEmail', 'PUT', {
    headers: {"Content-type": formContentType}, body: `cid=${cid}&`});
}

// export const getEventsByChildID = async (cid) => {
//     return await handlePress('events/approved', 'PUT', { 
//         headers: {"Content-type": formContentType}, body: `cid=${cid}&`});
        
// }