import React, { useContext, useState } from "react";

import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import { AuthContext } from "../context/AuthContext";
import fetcher from "../utils/fetcher";
import { uploadToUrl } from "../utils/poster";

const FormikUploadFile = ({ field, form }) => {
  const { auth } = useContext(AuthContext);
  const [uploadStatus, setUploadStatus] = useState();
  const [fileName, setFileName] = useState();

  const resetUpload = () => setUploadStatus(undefined);

  const handleChange = event => {
    /* get file */
    const file = event.target.files[0];
    setFileName(file.name);

    /* get secure upload link */
    fetcher("uploads", auth)
      .then(secureUploadInfo => {
        setUploadStatus("pending");

        // set the filename...
        const newKey = secureUploadInfo.fields.key.replace(
          `${fileName}`,
          file.name
        );
        secureUploadInfo.fields.key = newKey;

        /* construct form data needed for upload post */
        const fileFormData = new FormData();

        Object.keys(secureUploadInfo.fields).forEach(key => {
          fileFormData.append(key, secureUploadInfo.fields[key]);
        });

        /* actual file has to be appended last to form data */
        fileFormData.append("file", file);

        uploadToUrl(secureUploadInfo.url, fileFormData)
          .then(res => {
            const location = secureUploadInfo.url + secureUploadInfo.fields.key;

            if (!res || !location) {
              throw Error("response empty");
            }

            setUploadStatus("success");
            form.setFieldValue(field.name, location);
          })
          .catch(err => {
            console.log(err);
            setUploadStatus("error");
          });
      })
      .catch(err => {
        console.log(err);
        setUploadStatus("error");
      });
  };

  const handleBlur = () => {
    form.setFieldTouched(field.name, true);
  };

  if (!uploadStatus) {
    return (
      <input
        id="upload_file"
        name="upload_file"
        type="file"
        onChange={handleChange}
        onBlur={handleBlur}
      />
    );
  } else if (uploadStatus === "pending") {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  } else if (uploadStatus === "success") {
    return (
      <div className="text-success">
        <span
          className="oi oi-circle-check"
          title="success checkmark icon"
          aria-hidden="true"
        ></span>
        &nbsp;&nbsp;{fileName}
      </div>
    );
  } else {
    return (
      <div className="text-danger">
        <span
          className="oi oi-circle-x"
          title="error x icon"
          aria-hidden="true"
        ></span>
        &nbsp; Upload Failed. &nbsp;
        <Button variant="outline-danger" size="sm" onClick={resetUpload}>
          Retry
        </Button>
      </div>
    );
  }
};

export default FormikUploadFile;
