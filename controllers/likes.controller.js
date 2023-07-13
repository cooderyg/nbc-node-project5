const LikesService = require('../services/likes.service');

class LikesController {
  likesService = new LikesService();

  toggleLike = async (req, res) => {
    const { userId } = res.locals.user;
    const { postId } = req.params;

    try {
      const isLiked = await this.likesService.toggleLike({
        userId,
        postId,
      });
      res.status(200).json({ data: { isLiked } });
    } catch (error) {
      res.status(500).json({ message: '에러가 발생했습니다.' });
    }
  };
}

module.exports = LikesController;
