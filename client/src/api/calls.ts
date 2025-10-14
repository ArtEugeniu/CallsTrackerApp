import type { Call, StatsData } from "../types/call";

export const fetchCalls = async (page = 1, limit = 10): Promise<{
  calls: Call[];
  total: number;
  page: number;
  totalPages: number;
}> => {
  const res = await fetch(`/api/calls?page=${page}&limit=${limit}`);
  if (!res.ok) throw new Error("Failed to fetch calls");
  return res.json();
};

export const addCall = async (call: Call): Promise<Call> => {
  const res = await fetch("/api/calls", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(call),
  });
  if (!res.ok) throw new Error("Failed to create call");
  return res.json();
};

export const updateCall = async (call: Call): Promise<Call> => {
  const res = await fetch(`/api/calls/${call.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(call),
  });
  if (!res.ok) throw new Error("Failed to update call");
  return res.json();
};

export const deleteCall = async (id: number | string): Promise<void> => {
  const res = await fetch(`/api/calls/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete call");
};

export const fetchCallsStats = async (): Promise<StatsData> => {
  const res = await fetch('/api/calls/stats');
  if (!res.ok) throw new Error('Failed to fetch call stats');
  return res.json();
};