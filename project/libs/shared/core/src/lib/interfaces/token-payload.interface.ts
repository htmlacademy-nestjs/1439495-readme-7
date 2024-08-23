export interface TokenPayload {
  id: string;
  email: string;
  name: string;
  dateOfRegistry: Date;
  avatar: string;
}

export interface RefreshTokenPayload extends TokenPayload {
  tokenId: string;
}
