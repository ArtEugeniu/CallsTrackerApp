import  sqlite3  from "sqlite3";
import { open } from "sqlite";



export const dbPromise = open({
  filename: "./db/calls.db",
  driver: sqlite3.Database
});

(async () => {
  const db = await dbPromise;
  await db.run(`
    CREATE TABLE IF NOT EXISTS calls (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      phone_number TEXT,
      contact_name TEXT,
      call_date TEXT,
      duration_seconds INTEGER,
      status TEXT,
      outcome TEXT,
      notes TEXT,
      created_at TEXT,
      updated_at TEXT
    )
  `);
})();
