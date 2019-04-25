import React from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";

function CreateTransfer() {
  return (
    <section>
      <h1>New Transfer</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={values => {
          let errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <label htmlFor="source" style={{ display: "block" }}>
              Source:
            </label>
            <Field type="text" name="source" label="source" />
            <ErrorMessage name="source" component="div" />
            <label htmlFor="source" style={{ display: "block" }}>
              Data Mapping:
            </label>
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
}

export default CreateTransfer;
