import { ISalt } from '../providers/salt';
import bcrypt from 'bcrypt';

export class BCryptSalt implements ISalt {
  async generateSalt(): Promise<string> {
    return await bcrypt.genSalt();
  }
}