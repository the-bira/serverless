import { IPasswordEncryptor } from '../providers/password-encryptor';
import bcrypt from 'bcrypt';

export class BCryptPasswordEncryptor implements IPasswordEncryptor {
  async encrypt(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
}