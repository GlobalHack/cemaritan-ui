import React, { useState } from "react";

import { UploadTransferData } from "../../../types";

import ValidationModal from "../../ValidationModal";
import UploadTransferForm from "../../forms/UploadTransferForm";

import postTransferUpload from "../../../utils/postTransferUpload";

const SUCCESS_MESSAGE =
  "You have successfully uploaded a transfer. Please continue with an option below.";
const FAIL_MESSAGE =
  "Something went wrong when attempting to upload your transfer. Please close this dialog and try again.";

type PostStatus = "pending" | "success" | "error";

export const UploadTransfer = () => {
  const [postStatus, setPostStatus] = useState<PostStatus | undefined>();

  const showModal = postStatus && ["success", "error"].includes(postStatus);

  function onHideModal() {
    setPostStatus(undefined);
  }

  async function postUpload(data: UploadTransferData) {
    setPostStatus("pending");
    try {
      const res = await postTransferUpload(data);
      if (!res) {
        throw new Error("failed to upload transfer");
      }
      setPostStatus("success");
    } catch (err) {
      console.log(err);
      setPostStatus("error");
    }
  }

  return (
    <section>
      <h1>Upload Transfer</h1>
      <div>
        <UploadTransferForm onSubmit={postUpload} />
      </div>
      <ValidationModal
        show={showModal}
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
