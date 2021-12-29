const express = require("express");
const router = express.Router();

const { getPosts, getPostsBySearch, getPost, createPost, updatePost, likePost, deletePost } = require("../controllers/postController");
const auth = require('../middleware/auth')


router.get('/', getPosts);
router.get('/search', getPostsBySearch);
router.get('/:id', getPost);

router.post('/', createPost);
router.patch('/:id/likePost', auth, likePost);

router.patch('/:id', auth, updatePost);
router.delete('/:id', auth,deletePost);

module.exports = router;
