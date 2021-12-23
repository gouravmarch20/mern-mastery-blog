const express = require("express");
const router = express.Router();

const { getPosts, getPost, createPost, updatePost, likePost, deletePost } = require("../controllers/postController");
const auth = require('../middleware/auth')


router.get('/', getPosts);
router.post('/', createPost);
router.get('/:id', getPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth,deletePost);
router.patch('/:id/likePost', auth, likePost);

module.exports = router;
