import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { AdminRoute } from 'src/auth/decorators';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @AdminRoute()
  @Get('all')
  getAllUsers() {
    return this.userService.getAllUsers();
  }
}
