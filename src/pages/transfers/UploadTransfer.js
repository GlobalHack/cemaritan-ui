import React, {useState, useEffect} from "react";
import {Formik, Field} from "formik";
import {Form, Label, Select, SubmitButton} from '../../styled-variables';
import fetcher from '../../utils/fetcher';

function UploadTransfer() {
  const [connectionOptions, setConnectionOptions] = useState([]);
  const [mappingOptions, setMappingOptions] = useState([]);

  useEffect(() => {
    /* fetch connections for source & destination options */
    fetcher('connections').then(data => {
      setConnectionOptions(data);
    });

    /* fetch data mappings for mapping options */
    fetcher('mappings').then(data => {
      setMappingOptions(data);
    });
  }, []);

  return (
    <section>
      <h1>Upload Transfer</h1>
      <div>
        <Formik
          initialValues={{
            sourceFile: null,
            source_mapping_uid: '',
            destination_uid: '',
            destination_mapping_uid: ''
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
              <Label htmlFor="source_mapping_uid">Source Mapping</Label>
              <Field id="source_mapping_uid" name="source_mapping_uid" component={Select} onChange={handleChange} value={values.source_mapping_uid}>
                <option value=""></option>
                {mappingOptions.map((mapping) => (
                  <option key={`source-mapping-option-${mapping.uid}`} value={mapping.uid}>{mapping.name}</option>
                ))}
              </Field>
            </div>

            <div className="form-group">
              <Label htmlFor="destination_uid">Destination</Label>
              <Field id="destination_uid" name="destination_uid" component={Select} onChange={handleChange} value={values.destination_uid}>
                <option value=""></option>
                {connectionOptions.map((dest) => (
                  <option key={`dest-option-${dest.uid}`} value={dest.uid}>{dest.name}</option>
                ))}
              </Field>
            </div>

            <div className="form-group">
              <Label htmlFor="destination_mapping_uid">Destination Mapping</Label>
              <Field id="destination_mapping_uid" name="destination_mapping_uid" component={Select} onChange={handleChange} value={values.destination_mapping_uid}>
                <option value=""></option>
                {mappingOptions.map((mapping) => (
                  <option key={`dest-mapping-option-${mapping.uid}`} value={mapping.uid}>{mapping.name}</option>
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
