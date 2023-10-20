import { Role } from '..';
// export type { UserFromBackend } from '@backend/types/frontend/responses/auth';

export type UserFromBackend = {
  id: number;
  name: string;
  email: string;
  role: Role;
};
