import React, { useState } from "react";

import TransferForm from "../../forms/TransferForm";
import ValidationModal from "../../ValidationModal";
import { postTransfer } from "../../../utils/postTransfer";
import { TransferData } from "../../../types";

type POST_STATUS = "pending" | "success" | "error";

const SUCCESS_MESSAGE =
  "You have successfully created a new transfer. Please continue with an option below.";
const FAIL_MESSAGE =
  "Something went wrong when attempting to create your transfer. Please close this dialog and try again.";

export const CreateTransfer = () => {
  const [postStatus, setPostStatus] = useState<POST_STATUS | undefined>();
  const showModalPostStatus = ["success", "error"];
  const showModal = postStatus && showModalPostStatus.includes(postStatus);

  const submitTransfer = async (transferData: TransferData) => {
    try {
      const res = await postTransfer(transferData);
      console.log("do we get here!");
      if (res) {
        setPostStatus("success");
      }
    } catch (err) {
      console.log(err);
      setPostStatus("error");
    }
  };

  const onHideModal = () => {
    setPostStatus(undefined);
  };

  return (
    <section>
      <h1>Create Transfers</h1>
      <div>
        <TransferForm onSubmit={submitTransfer} />
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
