const mongoose = require('mongoose');
const marked = require('marked');
const slugify =  require('slugify');
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)

const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    description:{
        type: String,
    },
    markdown:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    slug:{
        type: String,
        required: true,
        unique: true
    },
    sanitizedHTML: {
        type: String,
        required: true
    }
})

blogSchema.pre('validate', function(next) {
    if(this.title){
        this.slug = slugify(this.title, { lower: true, strict: true})
    }

    if(this.markdown) {
        this.sanitizedHTML =  dompurify.sanitize(marked.parse(this.markdown))
    }
    next()
})

const Blog = mongoose.model('blogs', blogSchema)


module.exports= Blog

