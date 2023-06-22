export class AppError extends Error {
  private errorCode: number;
  constructor(message: string, errorCode: number) {
    super(message);
    this.name = "AppError";
    this.errorCode = errorCode;
  }
  logError() {
    console.log(`[${this.name}] ${this.message}, errorCode: ${this.errorCode}`);
  }
}
