import { Permission } from './IPermission';
import { Role } from './IRole';

export interface User {
  id: string;
  email: string;
  password?: string;
  phone: string;
  role: Role;
  permissions?: Permission[];
  createdAt: Date;
  updatedAt?: Date;
}