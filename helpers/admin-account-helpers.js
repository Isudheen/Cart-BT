var db = require('../config/connection');
var collection = require('../config/collections');
const bcrypt = require('bcrypt');
module.exports = {
  adminLogin: (adminData) => {
    return new Promise(async (resolve, reject) => {
      let loginStatus = false;
      let response = {};
      if (
        adminData.Email == 'admin@gmail.com' &&
        adminData.Password == '1234'
      ) {
        console.log('login success');
        response.admin = 'admin';
        response.status = true;
        resolve(response);
      } else {
        console.log('login failed');
        resolve({ status: false });
      }
    });
  },
};
