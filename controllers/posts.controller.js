const PostsService = require('../services/posts.service');

class PostsController {
  postsService = new PostsService();
  // 게시글 등록
  createPost = async (req, res) => {
    const { title, content } = req.body;
    const { userId } = res.locals.user;

    const { code, data } = await this.postsService.createPost({
      title,
      content,
      userId,
    });
    return res.status(code).json({ data });
  };
  // 게시글 등록 끝

  findAll = async (req, res) => {
    const { code, data } = await this.postsService.findAll();
    return res.status(code).json({ data });
  };

  findOne = async (req, res) => {
    const { postId } = req.params;
    const { code, data } = await this.postsService.findOne({ postId });
    return res.status(code).json({ data });
  };

  findLikePosts = async (req, res) => {
    const { userId } = res.locals.user;

    const { code, data } = await this.postsService.findLikePosts({ userId });

    return res.status(code).json({ data });
  };

  updatePost = async (req, res) => {
    const { postId } = req.params;
    const { userId } = res.locals.user;
    const { title, content } = req.body;

    const { code, data } = await this.postsService.updatePost({
      postId,
      userId,
      title,
      content,
    });

    return res.status(code).json({ data });
  };

  deletePost = async (req, res) => {
    const { postId } = req.params;
    const { userId } = res.locals.user;
    const { code, data } = await this.postsService.deletePost({
      postId,
      userId,
    });

    return res.status(code).json({ data });
  };
}

module.exports = PostsController;
