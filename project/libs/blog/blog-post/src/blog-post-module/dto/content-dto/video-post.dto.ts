import { IsString, IsUrl, IsUUID, MaxLength, MinLength } from "class-validator";

export class VideoPostDto {
  @IsUUID()
  public postId: string;

  @IsString()
  @MinLength(20)
  @MaxLength(50)
  public title: string;

  @IsString()
  @IsUrl()
  public link: string;
}
