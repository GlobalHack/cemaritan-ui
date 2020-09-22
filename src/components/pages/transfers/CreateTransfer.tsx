import React, { useState } from "react";

import useStoreState from "../../../hooks/useStoreState";
import TransferForm, { TransferFormData } from "../../forms/TransferForm";
import ValidationModal from "../../ValidationModal";
import { postTransfer } from "../../../utils/postTransfer";

const initValues: TransferFormData = {
  name: "",
  source_uid: 0,
  source_mapping_uid: 0,
  destination_uid: 0,
  destination_mapping_uid: 0,
  frequency: "",
  start_datetime: new Date(),
  active: false,
};

type POST_STATUS = "pending" | "success" | "error";

const SUCCESS_MESSAGE =
  "You have successfully created a new transfer. Please continue with an option below.";
const FAIL_MESSAGE =
  "Something went wrong when attempting to create your transfer. Please close this dialog and try again.";

export const CreateTransfer = () => {
  const { user } = useStoreState();
  const [postStatus, setPostStatus] = useState<POST_STATUS | undefined>();
  const showModalPostStatus = ["success", "error"];
  const showModal = postStatus && showModalPostStatus.includes(postStatus);

  const submitTransfer = (formData: TransferFormData) => {
    const postData = {
      ...formData,
      organization: user.organization,
      created_by: user.uid,
    };

    setPostStatus("pending");

    console.log("posting data", postData);

    postTransfer(postData)
      .then((res) => {
        if (res) {
          setPostStatus("success");
        }
      })
      .catch((err) => {
        console.error(err);
        setPostStatus("error");
      });
  };

  const onHideModal = () => {
    setPostStatus(undefined);
  };

  return (
    <section>
      <h1>Create Transfers</h1>
      <div>
        <TransferForm initialValues={initValues} onSubmit={submitTransfer} />
      </div>
      <ValidationModal
        show={showModal}
        onHide={onHideModal}
        title={
          postStatus === "success"
            ? "Create Transfer Success"
            : "Failed to Create Transfer"
        }
        text={postStatus === "success" ? SUCCESS_MESSAGE : FAIL_MESSAGE}
        success={postStatus === "success"}
        successActions={[
          { link: "/transfers", label: "View Transfers" },
          { onClick: onHideModal, label: "Create Another Transfer" },
        ]}
      />
    </section>
  );
};
