const CommentsService = require('../services/comments.service');
const HttpException = require('../utils/error');

class CommentsController {
  commentsService = new CommentsService();

  createComment = async (req, res) => {
    const { comment } = req.body;
    const { userId } = res.locals.user;
    const postId = Number(req.params.postId);
    try {
      if (!comment) throw new HttpException(400, '댓글을 입력되지 않았습니다.');
      const data = await this.commentsService.createComment({
        comment,
        userId,
        postId,
      });
      res.status(200).json({ data });
    } catch (error) {
      const { status, message } = error;
      if (!status) res.status(500).json({ message: '에러가 발생했습니다.' });
      res.status(status).json({ message });
    }
  };

  findByPostId = async (req, res) => {
    try {
      const postId = Number(req.params.postId);
      const data = await this.commentsService.findByPostId({ postId });
      res.status(200).json({ data });
    } catch (error) {
      const { status, message } = error;
      if (!status) res.status(500).json({ message: '에러가 발생했습니다.' });
      res.status(status).json({ message });
    }
  };

  updateComment = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const { comment } = req.body;
      const commentId = Number(req.params.commentId);

      await this.commentsService.updateComment({
        userId,
        comment,
        commentId,
      });
      res.status(200).json({ data: { ok: true } });
    } catch (error) {
      const { status, message } = error;
      if (!status) res.status(500).json({ message: '에러가 발생했습니다.' });
      res.status(status).json({ message });
    }
  };

  deleteComment = async (req, res) => {
    try {
      const { commentId } = req.params;
      const { userId } = res.locals.user;
      const { code, data } = await this.commentsService.deleteComment({
        commentId,
        userId,
      });
      res.status(code).json({ data });
    } catch (error) {
      const { status, message } = error;
      if (!status) res.status(500).json({ message: '에러가 발생했습니다.' });
      res.status(status).json({ message });
    }
  };
}

module.exports = CommentsController;
