import React from "react";

import { Formik, Field } from "formik";

import FormikDatetimePicker from "../FormikDatetimePicker";
import {
  Form,
  Label,
  CheckboxLabel,
  Select,
  SubmitButton,
  Text,
} from "../../styled-variables";
import { useConnectionOptions, useMappingOptions } from "../../hooks";
import { Connection, Mapping } from "../../types";

export interface TransferFormData {
  active: boolean;
  destination_mapping_uid: number;
  destination_uid: number;
  frequency: string;
  name: string;
  source_mapping_uid: number;
  source_uid: number;
  start_datetime: Date;
}

interface TransferFormProps {
  initialValues: TransferFormData;
  onSubmit: (data: TransferFormData) => any;
}

const TransferForm = ({ initialValues, onSubmit }: TransferFormProps) => {
  const connectionOptions: Connection[] = useConnectionOptions();
  const mappingOptions: Mapping[] = useMappingOptions();

  console.log("connection options", connectionOptions);
  console.log("mapping options", mappingOptions);

  console.log("initialValues", initialValues);

  // TODO: add validation

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <Form onSubmit={handleSubmit}>
          <div className="form-group">
            <Label htmlFor="name">Name</Label>
            <Field
              id="name"
              name="name"
              component={Text}
              onChange={handleChange}
              value={values.name}
            />
          </div>

          <div className="form-group">
            <Label htmlFor="source_uid">Source</Label>
            <Field
              id="source_uid"
              name="source_uid"
              component={Select}
              onChange={handleChange}
              value={values.source_uid}
            >
              <option value=""></option>
              {connectionOptions.map((source) => (
                <option key={`source-option-${source.uid}`} value={source.uid}>
                  {source.name}
                </option>
              ))}
            </Field>
          </div>

          <div className="form-group">
            <Label htmlFor="source_mapping_uid">Source Mapping</Label>
            <Field
              id="source_mapping_uid"
              name="source_mapping_uid"
              component={Select}
              onChange={handleChange}
              value={values.source_mapping_uid}
            >
              <option value=""></option>
              {mappingOptions.map((mapping) => (
                <option
                  key={`source-mapping-option-${mapping.uid}`}
                  value={mapping.uid}
                >
                  {mapping.name}
                </option>
              ))}
            </Field>
          </div>

          <div className="form-group">
            <Label htmlFor="destination_uid">Destination</Label>
            <Field
              id="destination_uid"
              name="destination_uid"
              component={Select}
              onChange={handleChange}
              value={values.destination_uid}
            >
              <option value=""></option>
              {connectionOptions.map((dest) => (
                <option key={`dest-option-${dest.uid}`} value={dest.uid}>
                  {dest.name}
                </option>
              ))}
            </Field>
          </div>

          <div className="form-group">
            <Label htmlFor="destination_mapping_uid">Destination Mapping</Label>
            <Field
              id="destination_mapping_uid"
              name="destination_mapping_uid"
              component={Select}
              onChange={handleChange}
              value={values.destination_mapping_uid}
            >
              <option value=""></option>
              {mappingOptions.map((mapping) => (
                <option
                  key={`dest-mapping-option-${mapping.uid}`}
                  value={mapping.uid}
                >
                  {mapping.name}
                </option>
              ))}
            </Field>
          </div>

          <div className="form-group">
            <Label htmlFor="start_datetime">Start Date &amp; Time</Label>
            <Field
              id="start_datetime"
              name="start_datetime"
              value={values.start_datetime}
              component={FormikDatetimePicker}
            />
          </div>

          <div className="form-group">
            <Label htmlFor="frequency">Frequency</Label>
            <Field
              id="frequency"
              name="frequency"
              component={Select}
              onChange={handleChange}
              value={values.frequency}
            >
              <option value=""></option>
              <option value="5 Minute">5 Minute</option>
              <option value="Hour">Hour</option>
              <option value="Day">Day</option>
            </Field>
          </div>

          <div className="form-group">
            <input
              type="checkbox"
              name="active"
              onChange={handleChange}
              value={values.active.toString()}
            />
            <CheckboxLabel htmlFor="active">Active</CheckboxLabel>
          </div>

          <SubmitButton type="submit" disabled={isSubmitting}>
            Submit
          </SubmitButton>
        </Form>
      )}
    </Formik>
  );
};

export default TransferForm;