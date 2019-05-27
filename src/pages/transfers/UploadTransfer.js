import React, {useState, useEffect} from "react";
import {Formik, Field} from "formik";
import {Form, Label, Select, SubmitButton} from '../../styled-variables';

function UploadTransfer() {
  const [sourceMappingOptions, setSourceMappingOptions] = useState([]);
  const [destinationOptions, setDestinationOptions] = useState([]);
  const [destinationMappingOptions, setDestinationMappingOptions] = useState([]);

  useEffect(() => {
    /* fetch actual data here */
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
      <h1>Upload Transfer</h1>
      <div>
        <Formik
          initialValues={{
            sourceFile: null,
            sourceMapping: '',
            destination: '',
            destinationMapping: ''
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
          <Form onSubmit={handleSubmit}>

            <div className="form-group">
              <Label htmlFor="sourceFile">Source File</Label>
              <input id="sourceFile" name="sourceFile" type="file" onChange={handleChange} className="form-control"
              />
            </div>

            <div className="form-group">
              <Label htmlFor="sourceMapping">Source Mapping</Label>
              <Field id="sourceMapping" name="sourceMapping" component={Select} onChange={handleChange} value={values.sourceMapping}>
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
              <Label htmlFor="destinationMapping">Destination Mapping</Label>
              <Field id="destinationMapping" name="destinationMapping" component={Select} onChange={handleChange} value={values.destinationMapping}>
                <option value=""></option>
                {destinationMappingOptions.map((mapping) => (
                  <option key={`dest-mapping-option-${mapping.id}`} value={mapping.id}>{mapping.name}</option>
                ))}
              </Field>
            </div>

            <SubmitButton type="submit" disabled={isSubmitting}>
              Submit
            </SubmitButton>
          </Form>
        )}
        </Formik>
      </div>
    </section>
  );
}

export default UploadTransfer;
