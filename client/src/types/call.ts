export interface Call {
  id?: number | string;
  phone_number: string;
  contact_name: string;
  call_date: string;
  duration_seconds: number;
  status: string;
  outcome: string;
  notes?: string;
}

export interface PaginatedCallsResponse {
  calls: Call[];
  total: number;
}