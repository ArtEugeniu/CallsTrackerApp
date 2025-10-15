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

export const getStats = async () => {
  const db = await dbPromise;
  
  const calls = await getAllCalls();
  
  if (!calls || calls.length === 0) {
    return {
      total_calls: 0,
      average_duration: 0,
      successful_calls: 0,
      failed_calls: 0,
      longest_call: 0,
      shortest_call: 0
    };
  }

  const durations = calls
    .map(call => {
      if (typeof call.duration_seconds === 'string' && call.duration_seconds.includes(':')) {
        const [minutes, seconds] = call.duration_seconds.split(':').map(Number);
        return minutes * 60 + seconds;
      }
      return parseInt(call.duration_seconds) || 0;
    })
    .filter(duration => duration > 0);

  const successful = calls.filter(c => c.status === 'completed' || c.outcome === 'qualified').length;
  const failed = calls.filter(c => c.status === 'missed' || c.status === 'failed').length;

  return {
    total_calls: calls.length,
    average_duration: durations.length > 0 ? durations.reduce((a, b) => a + b, 0) / durations.length : 0,
    successful_calls: successful,
    failed_calls: failed,
    longest_call: durations.length > 0 ? Math.max(...durations) : 0,
    shortest_call: durations.length > 0 ? Math.min(...durations) : 0
  };
};