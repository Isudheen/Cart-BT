var db = require('../config/connection');

module.exports = {
  addProduct: (product, callback) => {
    db.get()
      .collection('product')
      .insertOne(product)
      .then(() => {
        let date = new Date();
        let id = date.getTime();
        callback(id);
      });
  },
};
