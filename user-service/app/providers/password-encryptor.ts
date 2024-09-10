export interface IPasswordEncryptor {
  encrypt(password: string, salt: string): Promise<string>;
}