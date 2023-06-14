export function sealed(constructor: Function): void {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}
