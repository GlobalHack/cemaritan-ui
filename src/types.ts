export interface Connection {
  uid: number;
  connection_info: string;
  created_by: number;
  created_datetime: string;
  name: string;
  organization: number;
  type: string;
}

export interface Mapping {
  end_format: string;
  mapping_info: string;
  name: string;
  num_of_transfers: number;
  organization: number;
  start_format: string;
  uid: number;
}

export type Active = "TRUE" | "FALSE";
export type Frequency = "5 Minute" | "Day" | "Week";

export interface UploadTransferData {
  location: string;
  source_mapping_uid: number;
  destination_uid: number;
  destination_mapping_uid: number;
  organization: number;
  created_by: number;
}

export interface TransferData {
  name: string;
  active: Active;
  source_uid: number;
  source_mapping_uid: number;
  destination_uid: number;
  destination_mapping_uid: number;
  frequency: Frequency;
  start_datetime: string;
  created_by: number;
  organization: number;
}

export interface Transfer {
  uid: number;
  name: string;
  active: Active;
  source?: string;
  source_uid: number;
  source_mapping: string;
  source_mapping_uid: number;
  destination?: string;
  destination_uid: number;
  destination_mapping?: string;
  destination_mapping_uid: number;
  start_datetime: string;
  frequency: Frequency;
  created_datetime: string;
  created_by: number;
  organization: number;
}

export interface History {
  uid: number;
  type: string;
  action: string;
  name: string;
  datetime: string;
  details: string;
  organization: number;
  source_uid: number;
}

export interface User {
  uid: number;
  name: string;
  organization: number;
  created_datetime: string;
}

export interface AppState {
  auth: String /* auth token */;
  user: User;
}

export type AppActions =
  | { type: "SET_AUTH"; authToken: string }
  | { type: "SET_USER"; user: User };
