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

export interface Transfer {
  uid: number;
  active: boolean;
  destination_mapping_uid: number;
  destination_uid: number;
  frequency: string;
  name: string;
  source_mapping_uid: number;
  source_uid: number;
  start_datetime: Date;
  created_by: number;
  organization: number;
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
