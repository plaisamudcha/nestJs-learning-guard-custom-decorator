import { IsIn, IsString } from 'class-validator';

export class CurrentUserDto {
  @IsString()
  id: string;

  @IsIn(['admin', 'user'])
  role: string;
}
