const PostsRepository = require('../repositories/posts.repository');

class PostsService {
  postsRepository = new PostsRepository();

  createPost = async ({ title, content, userId }) => {
    if (!content || !title) {
      return { code: 400, data: '게시글을 내용을 입력해주세요.' };
    }
    try {
      const result = await this.postsRepository.createPost({
        title,
        content,
        userId,
      });
      return { code: 200, data: result };
    } catch (error) {
      return { code: 500, data: error.message };
    }
  };

  findAll = async () => {
    try {
      const posts = await this.postsRepository.findAll();

      return { code: 200, data: posts };
    } catch (error) {
      return { code: 500, data: error.message };
    }
  };

  findOne = async ({ postId }) => {
    try {
      const post = await this.postsRepository.findOne({ postId });
      if (!post) return { code: 404, data: '해당 게시물을 찾을 수 없습니다.' };

      return { code: 200, data: post };
    } catch (error) {
      return { code: 500, data: error.message };
    }
  };

  findLikePosts = async ({ userId }) => {
    try {
      const likePosts = await this.postsRepository.findLikePosts({ userId });
      return { code: 200, data: likePosts };
    } catch (error) {
      return { code: 500, data: error.message };
    }
  };

  updatePost = async ({ postId, userId, title, content }) => {
    // 게시글을 조회합니다.
    try {
      const post = await this.postsRepository.findOne({ postId });
      //게시글 없을 때
      if (!post) {
        return { code: 404, data: '게시글을 찾을 수 없습니다.' };
      } else if (post.UserId !== userId) {
        // 유저 다를 때
        return { code: 401, data: '권한이 없습니다.' };
      }
    } catch (error) {
      return { code: 500, data: error.message };
    }

    try {
      // 게시글을 수정
      this.postsRepository.updatePost({ postId, userId, title, content });
      return { code: 200, data: '게시글이 수정되었습니다.' };
    } catch (error) {
      return { code: 500, data: error.message };
    }
  };

  deletePost = async ({ postId, userId }) => {
    try {
      // 게시글을 조회
      const post = await this.postsRepository.findOne({ postId });
      if (!post) return { code: 404, data: '게시글이 존재하지 않습니다.' };
      if (post.UserId !== userId) return { code: 401, data: '권한이 없습니다.' };
    } catch (error) {
      return { code: 500, data: error.message };
    }

    // 게시글의 권한을 확인하고, 게시글을 삭제
    try {
      await this.postsRepository.deletePost({ postId, userId });
      return { code: 200, data: '게시글이 삭제되었습니다.' };
    } catch (error) {
      return { code: 500, data: error.message };
    }
  };
}

module.exports = PostsService;
