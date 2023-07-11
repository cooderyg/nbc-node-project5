const { Posts, Likes } = require('../models');
const { Op } = require('sequelize');

class PostsRepository {
  createPost = async ({ title, content, userId }) => {
    return await Posts.create({
      UserId: userId,
      title,
      content,
    });
  };

  findAll = async () => {
    return await Posts.findAll({
      attributes: ['postId', 'title', 'createdAt', 'updatedAt'],
      order: [['createdAt', 'DESC']],
    });
  };

  findOne = async ({ postId }) => {
    return await Posts.findOne({
      attributes: ['postId', 'UserId', 'title', 'content', 'likeCount', 'createdAt', 'updatedAt'],
      where: { postId },
    });
  };

  findLikePosts = async ({ userId }) => {
    return await Posts.findAll({
      where: {
        '$Likes.UserId$': { [Op.eq]: userId },
      },
      include: [{ model: Likes, as: 'Likes', attributes: ['likeId'] }],
      order: [['createdAt', 'DESC']],
    });
  };

  updatePost = async ({ postId, userId, title, content }) => {
    return await Posts.update(
      { title, content }, // title과 content 컬럼을 수정
      {
        where: {
          [Op.and]: [{ postId }, { UserId: userId }],
        },
      },
    );
  };

  deletePost = async ({ postId, userId }) => {
    await Posts.destroy({
      where: {
        [Op.and]: [{ postId }, { UserId: userId }],
      },
    });
  };
}

module.exports = PostsRepository;
