import { ApiResponseProperty } from '@nestjs/swagger';
import { userConstants } from '@modules/user/user.constants';

export class GetUserRes {
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
  @ApiResponseProperty()
  userType?: string;
}
