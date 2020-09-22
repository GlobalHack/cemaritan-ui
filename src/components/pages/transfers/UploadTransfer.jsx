import React, { useState, useEffect } from "react";
import { Formik, Field } from "formik";

import { Form, Label, Select, SubmitButton } from "../../../styled-variables";

import FormikUploadFile from "../../FormikUploadFile";
import ValidationModal from "../../ValidationModal";

import fetcher from "../../../utils/fetcher";
import poster from "../../../utils/poster";

const SUCCESS_MESSAGE =
  "You have successfully uploaded a transfer. Please continue with an option below.";
const FAIL_MESSAGE =
  "Something went wrong when attempting to upload your transfer. Please close this dialog and try again.";

export const UploadTransfer = () => {
  const [postStatus, setPostStatus] = useState([]);
  const [connectionOptions, setConnectionOptions] = useState([]);
  const [mappingOptions, setMappingOptions] = useState([]);

  useEffect(() => {
    /* fetch connections for source & destination options */
    fetcher("connections").then((data) => {
      setConnectionOptions(data);
    });

    /* fetch data mappings for mapping options */
    fetcher("mappings").then((data) => {
      setMappingOptions(data);
    });
  }, []);

  const postUpload = (data) => {
    // TODO: organization, we won't need... will be handled by the backend ...
    // TODO: need to attach created_by from global context?...
    data.organization = "OLI";
    data.created_by = 1;

    setPostStatus("pending");

    poster("uploads", data)
      .then((res) => {
        if (res) {
          setPostStatus("success");
        } else {
          setPostStatus("error");
        }
      })
      .catch(() => setPostStatus("error"));
  };

  const showModal = () => {
    const showModalPostStatus = ["success", "error"];

    return showModalPostStatus.includes(postStatus);
  };

  const onHideModal = () => {
    setPostStatus(undefined);
  };

  return (
    <section>
      <h1>Upload Transfer</h1>
      <div>
        <Formik
          initialValues={{
            location: null,
            source_mapping_uid: "",
            destination_uid: "",
            destination_mapping_uid: "",
          }}
          onSubmit={postUpload}
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
                <Label htmlFor="location">Source File</Label>
                <Field
                  id="location"
                  name="location"
                  value={values.location}
                  component={FormikUploadFile}
                />
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
                <Label htmlFor="destination_mapping_uid">
                  Destination Mapping
                </Label>
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

              <SubmitButton type="submit" disabled={isSubmitting}>
                Submit
              </SubmitButton>
            </Form>
          )}
        </Formik>
      </div>
      <ValidationModal
        show={showModal()}
        onHide={onHideModal}
        title={
          postStatus === "success"
            ? "Upload Transfer Success"
            : "Failed to Upload Transfer"
        }
        text={postStatus === "success" ? SUCCESS_MESSAGE : FAIL_MESSAGE}
        success={postStatus === "success"}
        successActions={[
          { link: "/transfers", label: "View Transfers" },
          { onClick: onHideModal, label: "Upload Another Transfer" },
        ]}
      />
    </section>
  );
};
