const LikesRepository = require('../repositories/likes.repository');

class LikesService {
  likesRepository = new LikesRepository();

  toggleLike = async ({ userId, postId }) => {
    let isExisted;
    try {
      isExisted = await this.likesRepository.findLike({ userId, postId });
    } catch (error) {
      return { code: 500, data: error.message };
    }

    if (isExisted) {
      try {
        await this.likesRepository.deletLike({ userId, postId });

        await this.likesRepository.decrementLikeCount({ postId });

        return { code: 200, data: { isLiked: false } };
      } catch (error) {
        return { code: 500, data: error.message };
      }
    }

    try {
      await this.likesRepository.creatLike({ userId, postId });

      await this.likesRepository.incrementLikeCount({ postId });

      return { code: 200, data: { isLiked: true } };
    } catch (error) {
      return { code: 500, data: error.message };
    }
  };
}

module.exports = LikesService;
