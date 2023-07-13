const PostsRepository = require('../repositories/posts.repository');
const HttpException = require('../utils/error');

class PostsService {
  postsRepository = new PostsRepository();

  createPost = async ({ title, content, userId }) => {
    const result = await this.postsRepository.createPost({
      title,
      content,
      userId,
    });
    return result;
  };

  findAll = async () => {
    const posts = await this.postsRepository.findAll();
    return posts;
  };

  findOne = async ({ postId }) => {
    const post = await this.postsRepository.findOne({ postId });
    if (!post) throw new HttpException(404, '해당 게시글을 찾을 수 없습니다.');
    return post;
  };

  findLikePosts = async ({ userId }) => {
    const likePosts = await this.postsRepository.findLikePosts({ userId });
    return { code: 200, data: likePosts };
  };

  updatePost = async ({ postId, userId, title, content }) => {
    // 게시글을 조회합니다.

    const post = await this.postsRepository.findOne({ postId });

    if (!post) throw new HttpException(404, '게시글을 찾을 수 없습니다.');
    if (post.UserId !== userId) throw new HttpException(401, '권한이 없습니다.');

    // 게시글을 수정
    await this.postsRepository.updatePost({ postId, userId, title, content });
  };

  deletePost = async ({ postId, userId }) => {
    // 게시글을 조회
    const post = await this.postsRepository.findOne({ postId });
    if (!post) throw new HttpException(404, '게시글이 존재하지 않습니다.');
    if (post.UserId !== userId) throw new HttpException(401, '권한이 없습니다.');

    await this.postsRepository.deletePost({ postId, userId });
  };
}

module.exports = PostsService;
