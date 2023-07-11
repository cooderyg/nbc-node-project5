const { Likes, Posts } = require('../models');
const { Op } = require('sequelize');

class LikesRepository {
  findLike = async ({ userId, postId }) => {
    return await Likes.findOne({
      where: {
        [Op.and]: [{ UserId: userId }, { PostId: postId }],
      },
    });
  };

  creatLike = async ({ userId, postId }) => {
    return await Likes.create({
      UserId: userId,
      PostId: postId,
    });
  };

  deletLike = async ({ userId, postId }) => {
    return await Likes.destroy({
      where: {
        [Op.and]: [{ UserId: userId }, { PostId: postId }],
      },
    });
  };

  incrementLikeCount = async ({ postId }) => {
    return await Posts.increment({ likeCount: 1 }, { where: { postId } });
  };

  decrementLikeCount = async ({ postId }) => {
    return await Posts.decrement({ likeCount: 1 }, { where: { postId } });
  };
}

module.exports = LikesRepository;
