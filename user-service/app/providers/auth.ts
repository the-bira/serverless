export interface IAuthProvider {
  register (email: string, password: string, phone: string): Promise<{id: string}>;
}