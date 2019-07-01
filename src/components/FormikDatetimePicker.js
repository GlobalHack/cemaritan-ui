import React from "react";
import DatePicker from "react-datepicker";

import {
  DATETIME_FORMAT_UNICODE,
  formatDatetimeForAPI,
  formatDatetimeForForm
} from '../utils/datetime';


const FormikDatetimePicker = ({field, form}) => {

  const handleChange = value => {
    let datetimeValue = value;

    if (value instanceof Date) {
      datetimeValue = formatDatetimeForAPI(value);
    }
    form.setFieldValue(field.name, datetimeValue);
  };

  const handleBlur = () => {
    form.setFieldTouched(field.name, true);
  };

  return (
    <DatePicker
      id={field.name}
      name={field.name}
      onBlur={handleBlur}
      onChange={handleChange}
      selected={
        typeof field.value === 'string' ?
        formatDatetimeForForm(field.value) :
        field.value
      }
      dateFormat={DATETIME_FORMAT_UNICODE}
      timeInputLabel="Time: "
      showTimeInput={true}
    />
  );
};

export default FormikDatetimePicker;
