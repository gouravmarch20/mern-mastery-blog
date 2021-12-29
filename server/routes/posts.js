const express = require("express");
const router = express.Router();

const { getPosts, getPostsBySearch, getPost, createPost, updatePost, likePost, commentPost, deletePost } = require("../controllers/postController");
const auth = require('../middleware/auth')


router.get('/', getPosts);
router.get('/search', getPostsBySearch);
router.get('/:id', getPost);

router.post('/', createPost);
router.patch('/:id/likePost', auth, likePost);

router.patch('/:id', auth, updatePost);
router.delete('/:id', auth,deletePost);
router.post('/:id/commentPost', commentPost);

module.exports = router;
