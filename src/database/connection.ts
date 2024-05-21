import { open, Database } from 'sqlite'
import sqlite3 from 'sqlite3'
import { AppError } from '../utils/error'
import { Result } from '../utils/result'

let dbInstance: Database<sqlite3.Database, sqlite3.Statement> | null = null

export async function openDB () {
  if (!dbInstance) {
    dbInstance = await open({
      filename: ':memory:',
      driver: sqlite3.Database
    })
  }
  return dbInstance
}

export async function resetDB () {
  dbInstance = null
}

export async function closeDB () {
  if (dbInstance) {
    await dbInstance.close()
    dbInstance = null
  }
}

export async function initializeDB (): Promise<Result<void>> {
  try {
    const db = await openDB()
    await db.exec(`
      CREATE TABLE IF NOT EXISTS movies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        year INTEGER,
        title TEXT,
        studios TEXT,
        producers TEXT,
        winner BOOLEAN
      );
    `)
    return Result.ok(undefined)
  } catch (error: any) {
    return Result.fail(new AppError.InitializeDatabase(error.toString()))
  }
}
