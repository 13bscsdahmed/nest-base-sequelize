import { IsEmail, IsNotEmpty, Length, IsIn } from 'class-validator';
import { userConstants } from '@modules/user/user.constants';
import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';

export class CreateUserReq {
  
  @ApiProperty({
    description: 'Email of user',
    example: 'test@gmail.com'
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @ApiProperty({
    description: 'First name of user',
    example: 'Test'
  })
  @IsNotEmpty()
  firstName: string;
  
  @ApiProperty({
    description: 'Last name of user',
    example: 'user'
  })
  @IsNotEmpty()
  lastName: string;
  
  @ApiProperty({
    description: 'Password of user',
    minLength: 8,
    example: 'test12345'
  })
  @IsNotEmpty()
  @Length(8)
  password: string;
  
  @ApiProperty({
    description: 'User type of user',
    enum: Object.values(userConstants.userTypes),
    default: userConstants.userTypes.user,
    example: userConstants.userTypes.user,
    required: false
  })
  @IsIn(Object.values(userConstants.userTypes))
  userType?: string;
}

export class CreateUserRes {
  @ApiResponseProperty({
    example: '5f61f7b30f1fe63b79678033'
  })
  _id: string;
  
  @ApiResponseProperty({
    example: 'test@gmail.com'
  })
  email: string;
  
  @ApiResponseProperty({
    example: 'test'
  })
  firstName: string;
  
  @ApiResponseProperty({
    example: 'user'
  })
  lastName: string;
  
  @ApiResponseProperty({
    example: userConstants.userTypes.user
  })
  userType: string;
}
