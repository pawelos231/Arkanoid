export function sealed(constructor) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}
