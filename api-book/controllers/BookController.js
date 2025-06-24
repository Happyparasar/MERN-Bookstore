const Book = require('../models/Book')
const cloudinary = require("cloudinary").v2;
async function addBook(req, res) {
    try {
        console.log(req.body, 'req.body')
        if(req.file) {
            cloudinary.config({
                cloud_name: "dln7svzdo",
                api_key: "776616335115449",
                api_secret: "IFjZ6HTYGa1plOJB1xoObAE-fgc"
            });
            const upload = await cloudinary.uploader.upload(req.file.path);
            req.body.bookImage = upload.secure_url;
        }
        let book = new Book(req.body);
        if(req.body.isDiscountApplicable) {

        } else {
            req.body.finalPrice = req.body.price;
        }
        await book.save();
        res.status(200).send({ success: true, message: 'Data Saved Successfully' });
    } catch(err) {
        console.log(err)
    }
}
async function getBooks(req, res) {
    try {
        let books = await Book.find({bookName: new RegExp(req.query.search, "i")}).sort('-created_at');
        
        res.status(200).send({ success: true, data: books });
    } catch(err) {
        res.status(200).send({ success: true, message: 'Some Thing went wrong' });
    }
}
async function getBookForEdit(req, res) {
    try {
        let id = req.params.id;
        let book = await Book.findOne({ _id: id });
        res.status(200).send({ success: true, data: book })
    } catch(err) {
        console.log(err)
        res.status(500).send({ success: false, message: 'something went wrong' })
    }
}
async function getBookForUser(req, res) {
    try {
        console.log("Getting Book for user...")
        let id = req.params.id;
        let book = await Book.findOne({ _id: id });
        console.log(book, 'book')
        res.status(200).send({ success: true, data: book })
    } catch(err) {
        console.log(err)
        res.status(500).send({ success: false, message: 'something went wrong' })
    }
}
async function editBook(req, res) {
    try { 
       
        let id = req.params.id;
        let book = await Book.findOne({ _id: id });
       
        book.bookName = req.body.bookName;
        book.bookDescription = req.body.bookDescription;
        book.price = req.body.price;
        book.authorName = req.body.authorName;
        book.language = req.body.language;
        await book.save();
        res.status(200).send({ success: true, data: book })
    } catch(err) {
        console.log(err)
        res.status(500).send({ success: false, message: 'something went wrong' })
    }
}

//Function for user pannel

async function getBooksForUser(req,res){
    try{
        let books = await Book.find({});
        console.log(books)
        res.status(200).send({success: true , data : books})
    }catch(err){
        console.log(err.message)
        res.status(400).send({success: false })

    }
}
module.exports = {
    addBook,
    getBooks,
    getBookForEdit,
    editBook,
    getBooksForUser,
    getBookForUser
}
