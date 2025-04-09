export class ExceptionesError extends Error {
  public statusError: number;
  public message: string;

  constructor(statusError: number, message: string) {
    super();
    this.statusError = statusError;
    this.message = message;
  }
}
