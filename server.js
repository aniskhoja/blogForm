const express = require('express');
const articles = require('./routes/articles')
const Blog = require('./module/blog')
const app = express();
const mongoose = require('mongoose');
const methodOverride =  require('method-override');

mongoose.connect('mongodb://localhost/blog')
    .then(() => console.log("connected to db"))
    .catch((e) => console.log("could not connect to db"))

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use('/articles', articles)

app.get('/', async (req,res) => {
    const objArticle =await Blog.find().sort({
        createdAt: 'desc'
    })
    res.render('articles/main', { article: objArticle })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, (err) => {
    if(err) console.log('Sever not connected');
    console.log("server connected sucessfully")
})