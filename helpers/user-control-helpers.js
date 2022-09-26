var db = require('../config/connection');
var collection = require('../config/collections');
const bcrypt = require('bcrypt');
var objectId = require('mongodb').ObjectId;
module.exports = {
  getAllUsers: () => {
    return new Promise(async (resolve, reject) => {
      let users = await db
        .get()
        .collection(collection.USER_COLLECTION)
        .find()
        .toArray();
      resolve(users);
    });
  },

  deleteUser: (userId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.USER_COLLECTION)
        .deleteOne({ _id: objectId(userId) })
        .then((response) => {
          console.log(response);
          resolve(response);
        });
    });
  },

  getUserDetails: (userId) => {
    return new Promise(async (resolve, reject) => {
      let user = await db
        .get()
        .collection(collection.USER_COLLECTION)
        .findOne({ _id: objectId(userId) });
      resolve(user);
    });
  },

  getUserByName: (userName) => {
    return new Promise(async (resolve, reject) => {
      let user = await db
        .get()
        .collection(collection.USER_COLLECTION)
        .findOne({ Name: userName });
      resolve(user);
    });
  },

  updateUser: (userId, userDetails) => {
    return new Promise(async (resolve, reject) => {
      userDetails.Password = await bcrypt.hash(userData.Password, 10);
      db.get()
        .collection(collection.USER_COLLECTION)
        .updateOne(
          { _id: objectId(userId) },
          {
            $set: {
              Name: userDetails.Name,
              Email: userDetails.Email,
              Password: userDetails.Password,
            },
          }
        )
        .then((response) => {
          resolve();
        });
    });
  },
};
