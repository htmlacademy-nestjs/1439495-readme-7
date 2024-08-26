export enum ApplicationServiceURL {
  Users = 'http://localhost:3333/api/user',
  Blog = 'http://localhost:3001/api/posts',
  Files = 'http://localhost:3500/api/files'
}

export const HTTP_CLIENT_MAX_REDIRECTS = 5;
export const HTTP_CLIENT_TIMEOUT = 3000;
