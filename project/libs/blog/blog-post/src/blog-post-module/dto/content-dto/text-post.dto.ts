import { IsString, IsUUID, MinLength, MaxLength } from "class-validator";

export class TextPostDto {
  @IsUUID()
  public postId: string;

  @IsString()
  @MinLength(20)
  @MaxLength(50)
  public title: string;

  @IsString()
  @MinLength(50)
  @MaxLength(255)
  public preview: string;

  @IsString()
  @MinLength(100)
  @MaxLength(1024)
  public text: string
}
