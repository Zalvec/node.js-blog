const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogRoutes.js')

const { db_URI } = require('./config');

//express app
const app = express()

//connect to mongodb
const dbURI = db_URI
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then( (result) => {
        //listen for requests
        app.listen(3000)
    })
    .catch( (err) => console.log(err))

//register view engine
app.set('view engine', 'ejs')
//app.set('views', 'myviews') //set folder where express looks for the files, default → views

//middleware & static files
app.use(express.static('public'))  // When using express: make files public accessible like css files. if not they can't be reached and you get an 404 error for ex. your stylesheet
app.use(express.urlencoded({ extended: true }))  //takes all urlencoded data and pass it in an object we can use (ex. req.body)
app.use(morgan('dev'))

//routes
app.get('/', (req, res) => { 
    res.redirect('/blogs')
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About'})
})

//redirects
// app.get('/about-us', (req, res) => {
//     res.redirect('/about')
// })

//blog routes
app.use('/blogs', blogRoutes)

//404 page
app.use( (req, res) => {
    res.status(404).render('404', { title: '404'})
})

/* 
If url matches first .get(), it runs it. 
If the callback function in .get() sends a message to the browser, express doesn't continue with the rest of the code
If it doesn't match it carries on with the code and fires the next .get()
If there isn't a match when it reaches .use(), this will be fired for all url's that don't have a match. It must be at the bottom op the file. You must add a status code since express doesn't recognize this as an error
*/