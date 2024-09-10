import { BCryptPasswordEncryptor } from './bcrypt-password-encryptor'

export const validatePassword = async (password: string, savedPassword: string, salt: string): Promise<boolean> => {
  return await new BCryptPasswordEncryptor().encrypt(password, salt) === savedPassword;
}