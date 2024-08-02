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
}

export interface VideoPost extends Post {
  title: string;
  link: string;
}

export interface TextPost extends Post {
  title: string;
  preview: string;
  text: string;
}

export interface QuotePost extends Post {
  text: string;
  author: string;
}

export interface PhotoPost extends Post {
  photo: string;
}

export interface LinkPost extends Post {
  description?: string;
  link: string;
}
