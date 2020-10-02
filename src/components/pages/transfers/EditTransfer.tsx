import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { Transfer, TransferData } from "../../../types";
import ValidationModal from "../../ValidationModal";
import TransferForm from "../../forms/TransferForm";
import { useTransfer } from "../../../hooks/useTransfer";
import { putTransfer } from "../../../utils/putTransfer";

const SUCCESS_MESSAGE =
  "You have successfully updated your transfer. Please continue with an option below.";
const FAIL_MESSAGE =
  "Something went wrong when trying to update your transfer. Please close this dialog and try again.";

type UPDATE_STATUS = "success" | "pending" | "error" | undefined;

interface EditTransferParams {
  transferId: string;
}

export const EditTransfer = () => {
  const { transferId } = useParams<EditTransferParams>();
  const { transfer, fetching, error } = useTransfer(parseInt(transferId, 10));

  const [updateStatus, setUpdateStatus] = useState<UPDATE_STATUS>();
  const showModalUpdateStatus = ["success", "error"];
  const showModal: boolean = Boolean(
    updateStatus && showModalUpdateStatus.includes(updateStatus)
  );

  function updateTransfer(formTransfer: TransferData) {
    if (transfer) {
      const updatedTransfer: Transfer = {
        ...transfer,
        ...formTransfer,
      };
      setUpdateStatus("pending");
      putTransfer(updatedTransfer)
        .then(() => {
          setUpdateStatus("success");
        })
        .catch(() => setUpdateStatus("error"));
    }
  }

  function onHideModal() {
    setUpdateStatus(undefined);
  }

  return (
    <section>
      <h1>Edit Transfers</h1>
      <div>
        {transfer && !fetching && !error && (
          <TransferForm initialValues={transfer} onSubmit={updateTransfer} />
        )}
      </div>
      <ValidationModal
        show={showModal}
        onHide={onHideModal}
        title={
          updateStatus === "success"
            ? "Update Transfer Success"
            : "Failed to Update Transfer"
        }
        text={updateStatus === "success" ? SUCCESS_MESSAGE : FAIL_MESSAGE}
        success={updateStatus === "success"}
        successActions={[
          { link: "/transfers", label: "View Transfers" },
          { onClick: onHideModal, label: "Keep Editing Transfer" },
        ]}
      />
    </section>
  );
};
