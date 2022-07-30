const CONFIG = require('../../config/app.config.js');
const url= CONFIG.url;  

/* 
    * This function handles api request to the RESTful api we create
    * in express: See BarcodeServer app.js file
    */
const handlePress = async (op, method = '', params = {}) => {
    if (method != '')
        params.method = method;
    console.log('handlePress '+method+' '+ url+'/'+op);
    var ret_val = await fetch(url + '/'+op, params)
        .then((response) => response.text())
        .then((responseText) => {
          try {
            return JSON.parse(responseText);
          } catch (error) {
            return responseText;
          }
        })
        .catch((error) => {
            console.error(error); 
        });
    return ret_val;
  }

module.exports = handlePress;