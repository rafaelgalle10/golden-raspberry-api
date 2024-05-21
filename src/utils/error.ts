export class ErrorBase extends Error {
  public statusCode: number
  public classError?: string
  constructor (value: string) {
    super(value)
    this.statusCode = 500
  }
}

export namespace AppError {
  export class ParseCSV extends ErrorBase {
    constructor (value: string) {
      super(`Error when parsing csv: '${value}'`)
      this.statusCode = 500
      this.classError = 'ErrorParseCSV'
    }
  }

  export class InitializeDatabase extends ErrorBase {
    constructor (value: string) {
      super(`Error when initializing database: '${value}'`)
      this.statusCode = 500
      this.classError = 'InitializeDatabase'
    }
  }

  export class CSVEmpty extends ErrorBase {
    constructor () {
      super('No movies found in CSV')
      this.statusCode = 500
      this.classError = 'CSVEmpty'
    }
  }

  export class CSVInvalid extends ErrorBase {
    constructor (value: string) {
      super(`Invalid CSV: '${value}'`)
      this.statusCode = 500
      this.classError = 'CSVInvalid'
    }
  }
}
