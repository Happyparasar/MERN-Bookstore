const mongoose = require('mongoose');
async function connection() {
    try {
        let connect = await mongoose.connect(`mongodb://127.0.0.1:27017/bookstore`);
        console.log("connection created....")
    } catch(err) {
        console.log(err)
    }
}
module.exports = connection