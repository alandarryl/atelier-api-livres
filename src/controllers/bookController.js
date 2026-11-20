
const Book = require('../models/Book');

exports.getBooks = async (req, res) => {
    try{
        const books = await Book.find().sort({createdAt: -1});
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


exports.getBooksById = async (req, res) => {
    try{
        const book = await Book.findById(req.params.id);
        if(!book){
            return res.status(404).json({message: 'Book not found'});
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

exports.createBook = async (req, res) => {
    try{
        const {title, author, publishedYear, genre} = req.body;
        const newBook = new Book({title, author, publishedYear, genre});
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

exports.updateBook = async (req, res) => {
    try{
        const {title, author, publishedYear, genre} = req.body;
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            {title, author, publishedYear, genre},
            {new: true, runValidators: true}
        );
        if(!updatedBook){
            return res.status(404).json({message: 'Book not found'});
        }
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

exports.deleteBook = async (req, res) =>{
    try{
        const book =  await Book.findByIdAndDelete(req.params.id);
        if(!book){
            return res.status(404).json({message: 'Book not found'});
        }
        res.status(200).json({message: 'Book deleted successfully'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


