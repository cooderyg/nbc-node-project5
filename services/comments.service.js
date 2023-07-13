const CommentsRepository = require('../repositories/comments.repository');
const HttpException = require('../utils/error');

class CommentsService {
  commentsRepository = new CommentsRepository();

  createComment = async ({ userId, postId, comment }) => {
    const result = await this.commentsRepository.createComment({
      userId,
      postId,
      comment,
    });
    return result;
  };

  findByPostId = async ({ postId }) => {
    const result = await this.commentsRepository.findByPostId({ postId });
    return result;
  };

  updateComment = async ({ userId, comment, commentId }) => {
    await this.commentValidate({ commentId, userId });

    await this.commentsRepository.updateComment({
      comment,
      commentId,
      userId,
    });
  };

  deleteComment = async ({ commentId, userId }) => {
    await this.commentValidate({ commentId, userId });

    await this.commentsRepository.deleteCommnet({
      commentId,
      userId,
    });
  };

  commentValidate = async ({ commentId, userId }) => {
    // 댓글을 조회
    const comment = await this.commentsRepository.findById({ commentId });
    // 댓글 없을 때
    if (!comment) throw new HttpException(404, '댓글이 존재하지 않습니다.');
    if (comment.UserId !== userId) throw new HttpException(401, '권한이 없습니다.');
  };
}

module.exports = CommentsService;
