import { Role } from '@prisma/client';

export interface NewUserData {
  email: string;
  hashedPassword: string;
  name: string;
  role: Role;
}
