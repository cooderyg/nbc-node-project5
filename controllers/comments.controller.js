const CommentsService = require('../services/comments.service');

class CommentsController {
  commentsService = new CommentsService();

  createComment = async (req, res) => {
    const { comment } = req.body;
    const { userId } = res.locals.user;
    const postId = Number(req.params.postId);

    const { code, data } = await this.commentsService.createComment({
      comment,
      userId,
      postId,
    });

    res.status(code).json({ data });
  };

  findByPostId = async (req, res) => {
    const postId = Number(req.params.postId);
    const { code, data } = await this.commentsService.findByPostId({ postId });
    res.status(code).json({ data });
  };

  updateComment = async (req, res) => {
    const { userId } = res.locals.user;
    const { comment } = req.body;
    const commentId = Number(req.params.commentId);

    const { code, data } = await this.commentsService.updateComment({
      userId,
      comment,
      commentId,
    });
    res.status(code).json({ data });
  };

  deleteComment = async (req, res) => {
    const { commentId } = req.params;
    const { userId } = res.locals.user;

    const { code, data } = await this.commentsService.deleteComment({
      commentId,
      userId,
    });
    res.status(code).json({ data });
  };
}

module.exports = CommentsController;
