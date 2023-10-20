import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { User } from 'src/user/user.model';
import { NewUserData } from './types';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async createNewUser(userData: NewUserData): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        ...userData,
      },
    });

    return new User(user);
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) return null;

    return new User(user);
  }

  async getAllUsers(): Promise<User[]> {
    const usersFromDb = await this.prisma.user.findMany({
      orderBy: [
        {
          id: 'asc',
        },
      ],
    });
    return usersFromDb.map((u) => new User(u));
  }
}
