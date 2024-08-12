import { IsString, IsUUID, MaxLength, MinLength } from "class-validator";

export class QuotePostDto {
  @IsUUID()
  public postId: string;

  @IsString()
  @MinLength(3)
  @MaxLength(50)
  public author: string;

  @IsString()
  @MinLength(20)
  @MaxLength(300)
  public text: string
}
