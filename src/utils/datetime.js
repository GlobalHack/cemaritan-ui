import moment from "moment";

export const DATETIME_FORMAT_UNICODE = "yyyy-MM-dd HH:mm:ss";
export const MOMENT_DATETIME_FORMAT = "YYYY-MM-DD HH:mm:ss";

export const formatDatetimeForAPI = datetime => {
  return moment(datetime).format(MOMENT_DATETIME_FORMAT);
}

export const formatDatetimeForForm = datetime => {
  return moment(datetime).toDate();
}
