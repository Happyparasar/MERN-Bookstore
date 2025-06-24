const express = require('express');
const cors = require('cors');

const book = require('./routes/books')
const user = require('./routes/user')
const payment = require('./routes/payment')
const connect = require('./connection')
const pincode = require('./routes/pincode')
const app = express();
connect();
app.use(cors());
app.use(book)
app.use(user)
app.use(payment);
app.use(pincode);




app.listen(3001, (err)=> {
    if(err) {
        console.log(err)
    } else {
        console.log("server is running on 3001")
    }
})