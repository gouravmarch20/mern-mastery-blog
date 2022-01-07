const mongoose = require("mongoose");
const express = require("express");
const Post = require("../models/post");
exports.getPosts = async (req, res) => {
    console.log("hit getPost")
    const { page } = req.query;

    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

        const total = await Post.countDocuments({});
        const posts = await Post.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
        res.json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

exports.getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;

    try {
        const title = new RegExp(searchQuery, "i");
        // ! finding  title , tags --> in exiting post 
        // or operater : mongoDb operater  : { $or: [ { <expression1> }, { <expression2> }, ... , { <expressionN> } ] } -----> work in array of two or more ==> 
        //!  {title : title } --> {title} ==> moden js approch --> 
        //  $in operator : must be array to itterate , select the document value if it availible   

        // now : find --> return the given result 

        // ! why split -->  string to array --> so in operator itterate item  each if match item then store return all match items in array form  
        const posts = await Post.find({ $or: [{ title }, { tags: { $in: tags.split(',') } }] });


        res.json({ data: posts });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
exports.getPost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findById(id);

        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

exports.createPost = async (req, res) => {
    const post = req.body;

    const newPostMessage = new Post({ ...post, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
exports.updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;


    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await Post.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

exports.deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await Post.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

exports.likePost = async (req, res) => {
    const { id } = req.params;
// SENDING LOGED IN USER ID --> API.
    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const post = await Post.findById(id);
    // ! TODO: feat min : Gift initial like || fake like options ---> currently disabled

    // if (!post.like) {
    //     post.likes.push('123456789');
    // }
    // ? like , unline feat together 
    const index = post.likes?.findIndex((id) => id === String(req.userId));
    if (index === -1) {
        post.likes.push(req.userId);
    } else {
        post.likes = post.likes?.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json(updatedPost);
}
exports.commentPost = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    const post = await Post.findById(id);
    post.comments.push(value);

    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
};
