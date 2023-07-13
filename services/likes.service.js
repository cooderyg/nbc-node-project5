const LikesRepository = require('../repositories/likes.repository');

class LikesService {
  likesRepository = new LikesRepository();

  toggleLike = async ({ userId, postId }) => {
    const isExisted = await this.likesRepository.findLike({ userId, postId });

    if (isExisted) {
      await this.likesRepository.deletLike({ userId, postId });
      await this.likesRepository.decrementLikeCount({ postId });
      return false;
    }

    await this.likesRepository.creatLike({ userId, postId });
    await this.likesRepository.incrementLikeCount({ postId });

    return true;
  };
}

module.exports = LikesService;
