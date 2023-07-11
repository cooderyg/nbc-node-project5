const LikesService = require('../services/likes.service');

class LikesController {
  likesService = new LikesService();

  toggleLike = async (req, res) => {
    const { userId } = res.locals.user;
    const { postId } = req.params;

    const { code, data } = await this.likesService.toggleLike({
      userId,
      postId,
    });

    res.status(code).json({ data });
  };
}

module.exports = LikesController;
