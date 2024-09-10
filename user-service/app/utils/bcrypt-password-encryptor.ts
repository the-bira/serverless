import { IPasswordEncryptor } from '../providers/password-encryptor';
import bcrypt from 'bcrypt';

export class BCryptPasswordEncryptor implements IPasswordEncryptor {
  async encrypt(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}