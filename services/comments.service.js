const CommentsRepository = require('../repositories/comments.repository');

class CommentsService {
  commentsRepository = new CommentsRepository();

  createComment = async ({ userId, postId, comment }) => {
    if (!comment) {
      return { code: 400, data: '댓글 내용을 입력해주세요.' };
    }

    // 댓글 생성
    try {
      const result = await this.commentsRepository.createComment({
        userId,
        postId,
        comment,
      });
      return { code: 200, data: result };
    } catch (error) {
      // 에러가 여러가지 있을 수 있음 error안에서
      console.error(error);
      return { code: 500, data: error.message };
    }
  };

  findByPostId = async ({ postId }) => {
    try {
      // 댓글 목록찾기
      const result = await this.commentsRepository.findByPostId({ postId });
      return { code: 200, data: result };
    } catch (error) {
      return { code: 500, data: error.message };
    }
  };

  updateComment = async ({ userId, comment, commentId }) => {
    const validation = await this.commentValidate({ commentId, userId });
    if (!validation.isValid) {
      return { code: validation.code, data: validation.data };
    }

    try {
      const result = await this.commentsRepository.updateComment({
        comment,
        commentId,
        userId,
      });
      return { code: 200, data: result };
    } catch (error) {
      return { code: 500, data: error.message };
    }
  };

  deleteComment = async ({ commentId, userId }) => {
    const validation = await this.commentValidate({ commentId, userId });
    if (!validation.isValid) {
      return { code: validation.code, data: validation.data };
    }

    //  댓글을 삭제
    try {
      const result = await this.commentsRepository.deleteCommnet({
        commentId,
        userId,
      });
      return { code: 200, data: result };
    } catch (error) {
      return { code: 500, data: error.message };
    }
  };

  commentValidate = async ({ commentId, userId }) => {
    try {
      // 댓글을 조회
      const comment = await this.commentsRepository.findById({ commentId });
      // 댓글 없을 때
      if (!comment) {
        return { isValid: false, code: 404, data: '댓글이 존재하지 않습니다.' };
      } else if (comment.UserId !== userId) {
        // 권한이 없을 때
        return { isValid: false, code: 401, data: '권한이 없습니다.' };
      }
    } catch (error) {
      return { isValid: false, code: 500, data: error.message };
    }
    return { isValid: true };
  };
}

module.exports = CommentsService;
