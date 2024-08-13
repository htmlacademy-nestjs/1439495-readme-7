import { IsString, IsUUID } from "class-validator";

export class PhotoPostDto {
  @IsUUID()
  public postId: string;

  @IsString()
  public photo: string;
}
