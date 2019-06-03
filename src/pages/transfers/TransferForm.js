import React, {useState, useEffect} from "react";
import {Formik, Field} from "formik";
import {Form, Label, CheckboxLabel, Select, SubmitButton} from '../../styled-variables';


function TransferForm (props) {
  const [sourceOptions, setSourceOptions] = useState([]);
  const [sourceMappingOptions, setSourceMappingOptions] = useState([]);
  const [destinationOptions, setDestinationOptions] = useState([]);
  const [destinationMappingOptions, setDestinationMappingOptions] = useState([]);

  useEffect(() => {
    /* fetch actual data here */
    setSourceOptions([
      {'id': '0', 'name': 'CW'},
      {'id': '1', 'name': 'SF'}
    ]);
    setSourceMappingOptions([
      {'id': '0', 'name': 'CW to HUD'},
      {'id': '1', 'name': 'SF to HUD'}
    ]);
    setDestinationOptions([
      {'id': '0', 'name': 'CW'},
      {'id': '1', 'name': 'SF'}
    ]);
    setDestinationMappingOptions([
      {'id': '0', 'name': 'CW to HUD'},
      {'id': '1', 'name': 'SF to HUD'}
    ]);
  });

  return (
    <Formik
      initialValues={props.intialValues}
      onSubmit={props.onSubmit}
    >
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
          <Label htmlFor="source">Source</Label>
          <Field id="source" name="source" component={Select} onChange={handleChange} value={values.source}>
            <option value=""></option>
            {sourceOptions.map((source) => (
              <option key={`source-option-${source.id}`} value={source.id}>{source.name}</option>
            ))}
          </Field>
        </div>

        <div className="form-group">
          <Label htmlFor="source_mapping">Source Mapping</Label>
          <Field id="source_mapping" name="source_mapping" component={Select} onChange={handleChange} value={values.source_mapping}>
            <option value=""></option>
            {sourceMappingOptions.map((mapping) => (
              <option key={`source-mapping-option-${mapping.id}`} value={mapping.id}>{mapping.name}</option>
            ))}
          </Field>
        </div>

        <div className="form-group">
          <Label htmlFor="destination">Destination</Label>
          <Field id="destination" name="destination" component={Select} onChange={handleChange} value={values.destination}>
            <option value=""></option>
            {destinationOptions.map((dest) => (
              <option key={`dest-option-${dest.id}`} value={dest.id}>{dest.name}</option>
            ))}
          </Field>
        </div>

        <div className="form-group">
          <Label htmlFor="destination_mapping">Destination Mapping</Label>
          <Field id="destination_mapping" name="destination_mapping" component={Select} onChange={handleChange} value={values.destination_mapping}>
            <option value=""></option>
            {destinationMappingOptions.map((mapping) => (
              <option key={`dest-mapping-option-${mapping.id}`} value={mapping.id}>{mapping.name}</option>
            ))}
          </Field>
        </div>

        <div className="form-group">
          <Label htmlFor="frequency">Frequency</Label>
          <Field id="frequency" name="frequency" component={Select} onChange={handleChange} value={values.frequency}>
            <option value=""></option>
            <option value="5 Minute">5 Minute</option>
            <option value="Hour">Hour</option>
            <option value="Day">Day</option>
          </Field>
        </div>

        <div className="form-group">
          <input type="checkbox" name="active" onChange={handleChange} value={values.active} />
          <CheckboxLabel htmlFor="active">Active</CheckboxLabel>
        </div>

        <SubmitButton type="submit" disabled={isSubmitting}>
          Submit
        </SubmitButton>
      </Form>
    )}
    </Formik>
  );
}

export default TransferForm;
