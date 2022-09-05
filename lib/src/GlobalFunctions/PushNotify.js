import * as Notifications from 'expo-notifications';
const APICalls = require('./API/APICalls') 

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

const sendPushNotification = async (token, title, body, hours) => {
return fetch('https://exp.host/--/api/v2/push/send', {
    body: JSON.stringify({
    to: token,
    title: title,
    body: body,
    data: { message: `${title} - ${body}` },
    sound: "default",
    icon: "/assets/pf-logo.png",
    android:{
        icon: "/assets/pf-logo.png",
        sound:"default"
    }, trigger: { hours: {hours} }
    }),
    headers: {
    'Content-Type': 'application/json',
    },
    method: 'POST',
}); }

const returnTokens = async (emailList) => {
    let tokenList = [];
    for (let i = 0; i < emailList.length; i++) {
        let {notiftoken} = await APICalls.getNotifTokenByEmail(emailList[i].email);
        tokenList.push(notiftoken);
    }
    return tokenList;
}

export const notify = async (emailList, title, body) => {
    let notiftokenlist = await returnTokens(emailList);
    console.log(notiftokenlist);
    await sendPushNotification(notiftokenlist, title, body, 0);
    return;
}

export const scheduleNotify = async (emailList, title, body, hours) => {
    let notiftokenlist = await returnTokens(emailList);
    sendPushNotification(notiftokenlist, title, body, hours);
}   

