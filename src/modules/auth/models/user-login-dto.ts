import { ApiProperty } from '@nestjs/swagger';

export class UserLoginReq {
  @ApiProperty({
    description: 'Id of user',
    example: '2'
  })
  id: string;
}
