export type PostType = 'Video' | 'Text' | 'Quote' | 'Photo' | 'Link';

export interface Post {
  id?: string;
  userId: string;
  type: PostType;
  isDraft: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  publishDate: Date
  tags?: string[];
  content?: TextPost | VideoPost | PhotoPost | LinkPost | QuotePost;
  commentsCount?: number;
  likesCount?: number;
}

export interface VideoPost {
  postId: string;
  title: string;
  link: string;
}

export interface TextPost {
  postId: string;
  title: string;
  preview: string;
  text: string;
}

export interface QuotePost {
  postId: string;
  text: string;
  author: string;
}

export interface PhotoPost {
  postId: string;
  photo: string;
}

export interface LinkPost {
  postId: string;
  description?: string;
  link: string;
}
