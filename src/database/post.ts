import db from './db';

export interface PostCreationParams {
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

export class PostDbManager {
  create = async ({ title, content, tags, authorId }: PostCreationParams) => {
    return await db.post.create({
      data: { title, content, tags, authorId },
    });
  };

  update = async ({ id, title, content, tags }: PostUpdateParams) => {
    return await db.post.update({
      where: { id },
      data: { title, content, tags },
    });
  };

  delete = async (id: string) => {
    return await db.post.delete({
      where: { id },
    });
  };

  findById = async (id: string) => {
    return await db.post.findUnique({
      where: {id},
      include: {
        author: {
          select: {
            name: true,
            email: true,
            surname:true
          },
        },
      },
    });
  };

  findByUserId = async (userId: string) => {
    return await db.post.findMany({
      where: { authorId: userId },
      orderBy: { createdAt: 'desc' },
      include: {
        author: {
          select: {
            name: true,
            surname: true,
          },
        },
      },
    });
  };

  findAll = async (filters?: any, sort?: any) => {
    const formattedFilters: any = {};
  
    // Handle search by author (name or surname) and tags
    if (filters?.search) {
      formattedFilters.OR = [
        { author: { name: { contains: filters.search, mode: 'insensitive' } } },
        { author: { surname: { contains: filters.search, mode: 'insensitive' } } },
        { tags: { has: filters.search } },
      ];
    }
  
    return await db.post.findMany({
      where: formattedFilters,
      orderBy: sort,
      include: {
        author: {
          select: {
            name: true,
            surname: true,
          },
        },
      },
    });
  };

}
