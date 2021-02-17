const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Blog = mongoose.model('Blog', blogSchema)  //name 'Blog' is important. model() will pluralize this and look for that collection in the database. In this case the Blogs collection
module.exports = Blog