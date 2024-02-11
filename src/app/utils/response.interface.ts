export interface Response<T> {
    error: string;
    message: string;
    result: T;
    errorValidation: { [key: string]: string };
  }