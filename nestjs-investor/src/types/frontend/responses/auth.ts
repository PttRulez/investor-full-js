import { User as UserEntity } from 'src/user/user.model';

export type UserFromBackend = ReturnType<UserEntity['toJSON']>;
