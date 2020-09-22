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

export interface User {
  uid: number;
  name: string;
  organization: number;
}
