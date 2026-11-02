import Post from "../models/posts.model.js";

export const activeCheck = async(req, res) => {
    try {
        res.status(200).json({ message: "Posts service is active" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getPosts = async(req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createPost = async(req, res) => {
    try {
        const textValue = req.body.content || req.body.body || req.body.text || "";
        let imageUrl = '';
        if (req.file) {
            imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
        }

        const postData = {
            body: textValue,
            content: textValue,
            author: req.body.author || req.body.name || "User",
            likes: req.body.likes || 0,
            media: imageUrl || req.body.media || '',
            fileType: req.file ? req.file.mimetype : ''
        };

        const newPost = new Post(postData);
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ error: error.message });
    }
};

export const likePost = async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ error: "Post not found" });

        post.likes = (post.likes || 0) + 1;
        const updatedPost = await post.save();
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const addComment = async(req, res) => {
    try {
        const { text, author } = req.body;
        const postId = req.params.id;

        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ error: "Post not found" });

        if (!post.comments) post.comments = [];

        const newComment = {
            text: text,
            author: author || "User",
            createdAt: new Date()
        };

        post.comments.push(newComment);
        const updatedPost = await post.save();

        res.status(200).json(updatedPost);
    } catch (error) {
        console.error("Comment Error:", error);
        res.status(500).json({ error: error.message });
    }
};

export const deletePost = async(req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if (!deletedPost) return res.status(404).json({ error: "Post not found" });
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};