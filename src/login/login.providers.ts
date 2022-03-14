import { User } from '../models/user.model';
import { LoginUser } from '../models/login.model';

export const loginUsersProviders = [
  {
    provide: 'LOGINUSERS_REPOSITORY',
    useValue: LoginUser,
  },
];