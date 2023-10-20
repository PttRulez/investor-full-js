import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getAllUsers() {
    const users = await this.userRepository.getAllUsers();
    return users.map((u) => u.toJSON());
  }
}
