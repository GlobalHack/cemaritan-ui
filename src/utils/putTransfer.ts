import axios from "./axios";
import { Transfer } from "../types";

export const putTransfer = (transfer: Transfer) => {
  return axios.put(
    `/organizations/${transfer.organization}/transfers/${transfer.uid}`,
    JSON.stringify(transfer)
  );
};
