const mongoose = require('mongoose');
const slugify = require('slugify');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title'],
        trim: true,
    },
    content: {
        type: String,
        required: [true, 'Please provide content'],
    },
    slug: {
        type: String,
        unique: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Post must have an author'],
    },
    likesCount: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

// Middleware to create slug from title
postSchema.pre('save', async function () {
    if (this.isModified('title')) {
        this.slug = slugify(this.title, { lower: true, strict: true }) + '-' + Date.now();
        // this.slug = 'post-' + Date.now();
    }
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
