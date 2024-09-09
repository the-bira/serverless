export interface IController <T = any, R = any> {
  handle: (dto: T) => R;
}