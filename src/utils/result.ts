import { ErrorBase } from './error'

export class Result<T> {
  public success: boolean
  public data?: T
  public error?: ErrorBase

  private constructor (success: boolean, data?: T, error?: ErrorBase) {
    this.success = success
    this.data = data
    this.error = error
  }

  public static ok<T> (data: T): Result<T> {
    return new Result<T>(true, data)
  }

  public static fail<T> (error: ErrorBase): Result<T> {
    return new Result<T>(false, undefined, error)
  }
}
