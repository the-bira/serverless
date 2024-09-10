export interface ISalt {
  generateSalt: () => Promise<string>;
}