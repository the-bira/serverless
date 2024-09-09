import { Address } from './IAddress';
import { User } from './IUser';

export interface UserProfile {
  id: string;
  user: User;
  addresses: Address[];
  fullName: string;
}
