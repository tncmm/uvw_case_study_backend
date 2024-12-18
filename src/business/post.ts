import { PostDbManager } from '../database/post';
import { BusinessError } from '../domain/error/business_error';

export interface PostCreateParams {
  title: string;
  content: string;
  tags?: string[];
  authorId: string;
}

export interface PostUpdateParams {
  id: string;
  title?: string;
  content?: string;
  tags?: string[];
}

export default class PostManager {
  async create({ title, content, tags, authorId }: PostCreateParams) {
    if (content.length < 20) {
      throw new BusinessError('content-too-short');
    }
    if (title.length > 100) {
      throw new BusinessError('title-too-long');
    }

    return await new PostDbManager().create({ title, content, tags, authorId });
  }

  async update({ id, title, content, tags }: PostUpdateParams) {
    const post = await new PostDbManager().findById(id);
    if (!post) {
      throw new BusinessError('post-not-found');
    }

    return await new PostDbManager().update({ id, title, content, tags });
  }

  async delete(id: string) {
    const post = await new PostDbManager().findById(id);
    if (!post) {
      throw new BusinessError('post-not-found');
    }
    const isDeleted = await new PostDbManager().delete(id);
    if (isDeleted) {
      return true;
    }
    else {
      return false;
    }
  }

  async getPostById(id: string) {
    return await new PostDbManager().findById(id);
  }

  async getPostsByUserId(userId: string) {
    return await new PostDbManager().findByUserId(userId);
  }

  async getAllPosts(filters: any, sort: any) {
    const posts = await new PostDbManager().findAll(filters, sort);
  return posts.map((post) => ({
    id: post.id,
    title: post.title,
    content: post.content,
    tags: post.tags,
    createdAt: post.createdAt,
    authorId:post.authorId,
    author: {
      surname:post.author.surname,
      name: post.author.name,
    },
  }));
  }
}
