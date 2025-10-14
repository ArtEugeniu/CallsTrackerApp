import { dbPromise } from "../db/sqlite.js";


export const getAllCalls = async () => {
  const db = await dbPromise;
  return db.all("SELECT * FROM calls ORDER BY call_date DESC");
};

export const getCallsPaginated = async (limit = 10, offset = 0) => {
  const db = await dbPromise;
  return db.all(
    "SELECT * FROM calls ORDER BY call_date DESC LIMIT ? OFFSET ?",
    [limit, offset]
  );
};

export const getCallsCount = async () => {
  const db = await dbPromise;
  const result = await db.get("SELECT COUNT(*) AS count FROM calls");
  return result.count;
};

export const getCallById = async (id) => {
  const db = await dbPromise;
  const call = await db.get("SELECT * FROM calls WHERE id = ?", [id]);
  if (!call) throw new Error("Call not found");
  return call;
};

export const createCall = async (call) => {
  const db = await dbPromise;
  const created_at = new Date().toISOString();
  const updated_at = created_at;

  const result = await db.run(
    `INSERT INTO calls 
      (phone_number, contact_name, call_date, duration_seconds, status, outcome, notes, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [call.phone_number, call.contact_name, call.call_date, call.duration_seconds, call.status, call.outcome, call.notes, created_at, updated_at]
  );

  if (result.lastID === undefined) {
    throw new Error("Failed to insert call, lastID is undefined");
  }

  const newCall = await getCallById(result.lastID);
  if (!newCall) {
    throw new Error("Call not found after insert");
  }

  return newCall;
};


export const updateCall = async (id, call) => {
  const db = await dbPromise;
  const updated_at = new Date().toISOString();
  await db.run(
    `UPDATE calls SET 
      phone_number = ?, contact_name = ?, call_date = ?, duration_seconds = ?, 
      status = ?, outcome = ?, notes = ?, updated_at = ?
      WHERE id = ?`,
    [call.phone_number, call.contact_name, call.call_date, call.duration_seconds, call.status, call.outcome, call.notes, updated_at, id]
  );
  return getCallById(id);
};

export const deleteCall = async (id) => {
  const db = await dbPromise;
  await db.run("DELETE FROM calls WHERE id = ?", [id]);
};