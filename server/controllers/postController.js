const mongoose = require("mongoose");
const express = require("express");
const Post = require("../models/post");

exports.getPosts = async (req, res) => {
    try {
        const post = await Post.find();

        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
// ! FIXME: NOT FIND CASE
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
    // console.log(req.body);
    const post = req.body;
    const newPostMessage = new Post({ ...post, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newPostMessage.save();
        newPostMessage.selectedFile = undefined
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
    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const post = await Post.findById(id);
    const index = post.likes.findIndex((id) => id === String(req.userId));// if in like array that _id not avalible then only like the post
    if (index === -1) {
        post.likes.push(req.userId);//push user id into array
    } else {
        post.likes = post.likes.filter((id) => id !== String(req.userId));//! filter --> itterate all array item --> return that item that match filter case
    }
    const updatedPost = await Post.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });

    res.json(updatedPost);
}
