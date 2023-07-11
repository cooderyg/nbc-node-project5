const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware');
const { Posts, Likes } = require('../models');
const { Op } = require('sequelize');
const PostsController = require('../controllers/posts.controller');
const postsController = new PostsController();

// 게시글 등록
router.post('/posts', authMiddleware, postsController.createPost);
// 게시글 등록 끝

// 게시글 목록 조회
router.get('/posts', postsController.findAll);
// 게시글 목록 조회 끝

// 게시글 상세 조회
router.get('/posts/:postId', postsController.findOne);
// 게시글 상세 조회 끝

// 좋아요한 게시글 조회 시작
router.get('/like-posts', authMiddleware, postsController.findLikePosts);
// 좋아요한 게시글 조회 끝

// 게시글 수정
router.put('/posts/:postId', authMiddleware, postsController.updatePost);
// 게시글 수정 끝

// 게시글 삭제
router.delete('/posts/:postId', authMiddleware, postsController.deletePost);
// 게시글 삭제 끝

module.exports = router;
