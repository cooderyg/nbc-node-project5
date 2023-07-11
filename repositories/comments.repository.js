const { Comments } = require('../models');
const { Op } = require('sequelize');

class CommentsRepository {
  createComment = async ({ userId, postId, comment }) => {
    return await Comments.create({
      UserId: userId,
      PostId: postId,
      comment,
    });
  };

  findByPostId = async ({ postId }) => {
    return await Comments.findAll({
      where: { PostId: postId },
      attributes: ['comment', 'postId', 'userId', 'createdAt', 'updatedAt'],
      order: [['createdAt', 'DESC']],
    });
  };

  findById = async ({ commentId }) => {
    return await Comments.findOne({ where: { commentId } });
  };

  updateComment = async ({ comment, commentId, userId }) => {
    return await Comments.update(
      { comment },
      {
        where: {
          [Op.and]: [{ commentId }, { UserId: userId }],
        },
      },
    );
  };

  deleteCommnet = async ({ commentId, userId }) => {
    return await Comments.destroy({
      where: {
        [Op.and]: [{ commentId }, { UserId: userId }],
      },
    });
  };
}

module.exports = CommentsRepository;
