export interface Call {
  id: number | string;
  phone_number: string;
  contact_name: string;
  call_date: string;
  duration_seconds: number;
  status: "completed" | "missed" | "scheduled";
  outcome: "qualified" | "not_qualified" | "callback" | "not_interested";
  notes: string;
}

export type StatsData = {
  total: number;
  qualified: number;
  notQualified: number;
  missed: number;
  completed: number;
  avgDuration: number;
  totalDuration: number;
};