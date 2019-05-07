import React, {useState, useEffect} from "react";
import {Formik, Field} from "formik";

function CreateTransfer() {
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
    <section>
      <h1>Create Transfers</h1>
      <div>
        <Formik
          initialValues={{
            source: '',
            sourceMapping: '',
            destination: '',
            destinationMapping: '',
            frequency: '',
            active: false
          }}
          onSubmit={(values) => {
            console.log(values);
          }}
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
          <form onSubmit={handleSubmit}>

            <label htmlFor="source">Source</label>
            <Field component="select" name="source" onChange={handleChange} value={values.source}>
              <option value=""></option>
              {sourceOptions.map((source) => (
                <option key={`source-option-${source.id}`} value={source.id}>{source.name}</option>
              ))}
            </Field>

            <label htmlFor="sourceMapping">Source Mapping</label>
            <Field component="select" name="sourceMapping" onChange={handleChange} value={values.sourceMapping}>
              <option value=""></option>
              {sourceMappingOptions.map((mapping) => (
                <option key={`source-mapping-option-${mapping.id}`} value={mapping.id}>{mapping.name}</option>
              ))}
            </Field>

            <label htmlFor="destination">Destination</label>
            <Field component="select" name="destination" onChange={handleChange} value={values.destination}>
              <option value=""></option>
              {destinationOptions.map((dest) => (
                <option key={`dest-option-${dest.id}`} value={dest.id}>{dest.name}</option>
              ))}
            </Field>

            <label htmlFor="destinationMapping">Destination Mapping</label>
            <Field component="select" name="destinationMapping" onChange={handleChange} value={values.destinationMapping}>
              <option value=""></option>
              {destinationMappingOptions.map((mapping) => (
                <option key={`dest-mapping-option-${mapping.id}`} value={mapping.id}>{mapping.name}</option>
              ))}
            </Field>

            <label htmlFor="frequency">Frequency</label>
            <Field component="select" name="frequency" onChange={handleChange} value={values.frequency}>
              <option value=""></option>
              <option value="5 Minute">5 Minute</option>
              <option value="Hour">Hour</option>
              <option value="Day">Day</option>
            </Field>

            <label htmlFor="active">Active</label>
            <input type="checkbox" name="active" onChange={handleChange} value={values.active} />

            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
        </Formik>
      </div>
    </section>
  );
}

export default CreateTransfer;
