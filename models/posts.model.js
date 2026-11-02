import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    author: {
        type: String,
        default: "User"
    }
}, { timestamps: true });

const postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    body: {
        type: String,
        required: false
    },
    content: {
        type: String,
        required: false
    },
    author: {
        type: String,
        default: "User"
    },
    likes: {
        type: Number,
        default: 0
    },
    media: {
        type: String,
        default: ''
    },
    active: {
        type: Boolean,
        default: true
    },
    fileType: {
        type: String,
        default: ''
    },
    comments: [commentSchema] // <-- Added this so MongoDB accepts and saves comments!
}, { timestamps: true });

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
export default Post;