const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware');
const CommentsController = require('../controllers/comments.controller');

const commentsController = new CommentsController();

// 댓글 등록
router.post('/comments/:postId', authMiddleware, commentsController.createComment);
// 댓글 등록 끝

// 댓글 목록 조회
router.get('/comments/:postId', commentsController.findByPostId);
// 댓글 목록 조회 끝

// 댓글 수정
router.put('/comments/:commentId', authMiddleware, commentsController.updateComment);
// 댓글 수정 끝

// 댓글 삭제
router.delete('/comments/:commentId', authMiddleware, commentsController.deleteComment);
// 댓글 삭제 끝

module.exports = router;
