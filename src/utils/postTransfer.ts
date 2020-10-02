import axios from "./axios";
import { TransferData } from "../types";

export const postTransfer = (data: TransferData) => {
  return axios.post(
    `/organizations/${data.organization}/transfers`,
    JSON.stringify(data)
  );
};
