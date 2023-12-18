import { IsString } from 'class-validator';

export class CreateUserRequestDto {
  @IsString()
  username: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  matchPassword: string;
}
