import axios from "./axios";

export interface TransferData {
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

export const postTransfer = (data: TransferData) => {
  return axios.post(
    `/organizations/${data.organization}/transfers`,
    JSON.stringify(data)
  );
};
