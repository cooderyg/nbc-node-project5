const PostsService = require('../services/posts.service');
const HttpException = require('../utils/error');

class PostsController {
  postsService = new PostsService();
  // 게시글 등록
  createPost = async (req, res, next) => {
    const { title, content } = req.body;
    const { userId } = res.locals.user;
    try {
      if (!content || !title) throw new HttpException(400, '게시글을 잘 작성해주세요.');
      const data = await this.postsService.createPost({
        title,
        content,
        userId,
      });
      return res.status(200).json({ data });
    } catch (error) {
      const { status, message } = error;
      if (!status) res.status(500).json({ message: '에러가 발생했습니다.' });
      return res.status(status).json({ message });
    }
  };
  // 게시글 등록 끝

  findAll = async (req, res, next) => {
    try {
      const data = await this.postsService.findAll();
      return res.status(200).json({ data });
    } catch (error) {
      const { status, message } = error;
      if (!status) res.status(500).json({ message: '에러가 발생했습니다.' });
      return res.status(status).json({ message });
    }
  };

  findOne = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const data = await this.postsService.findOne({ postId });
      return res.status(200).json({ data });
    } catch (error) {
      const { status, message } = error;
      if (!status) res.status(500).json({ message: '에러가 발생했습니다.' });
      return res.status(status).json({ message });
    }
  };

  findLikePosts = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const data = await this.postsService.findLikePosts({ userId });
      return res.status(200).json({ data });
    } catch (error) {
      const { status, message } = error;
      if (!status) res.status(500).json({ message: '에러가 발생했습니다.' });
      return res.status(status).json({ message });
    }
  };

  updatePost = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { userId } = res.locals.user;
      const { title, content } = req.body;
      await this.postsService.updatePost({
        postId,
        userId,
        title,
        content,
      });
      return res.status(200).json({ data: { ok: true } });
    } catch (error) {
      const { status, message } = error;
      if (!status) res.status(500).json({ message: '에러가 발생했습니다.' });
      return res.status(status).json({ message });
    }
  };

  deletePost = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { userId } = res.locals.user;
      await this.postsService.deletePost({
        postId,
        userId,
      });
      return res.status(200).json({ data: { ok: true } });
    } catch (error) {
      const { status, message } = error;
      if (!status) res.status(500).json({ message: '에러가 발생했습니다.' });
      return res.status(status).json({ message });
    }
  };
}

module.exports = PostsController;
