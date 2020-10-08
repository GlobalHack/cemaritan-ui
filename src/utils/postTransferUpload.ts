import axios from "./axios";
import { UploadTransferData, TransferData } from "../types";

const postTransferUpload = (data: UploadTransferData) => {
  return axios.post<TransferData>(
    `/organizations/${data.organization}/uploads`,
    JSON.stringify(data)
  );
};

export default postTransferUpload;
