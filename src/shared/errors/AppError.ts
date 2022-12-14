export class AppError {
  public readonly message: string;

  public readonly statusCode: number;

  constructor(message = "Error message", statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
