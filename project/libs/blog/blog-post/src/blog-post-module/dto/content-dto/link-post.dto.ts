import { IsOptional, IsString, IsUrl, IsUUID, MaxLength } from "class-validator";

export class LinkPostDto {
  @IsUUID()
  public postId: string;

  @IsString()
  @IsUrl()
  public link: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  public description?: string;
}
