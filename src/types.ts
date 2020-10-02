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

active: "FALSE";
destination: "CW";
destination_mapping: "CW Validation";
destination_mapping_uid: 4;
destination_uid: 123;
organization: "SPC";
source: "SP";
source_mapping: "SP Validation";
source_mapping_uid: 3;
source_uid: 3;
start_datetime: "2020-09-22T01:57:12.256Z";
uid: 26;

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
