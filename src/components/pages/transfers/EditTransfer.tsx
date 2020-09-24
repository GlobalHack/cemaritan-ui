import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "../../../utils/axios";
import { Transfer } from "../../../types";
import ValidationModal from "../../ValidationModal";
import TransferForm, { TransferFormData } from "../../forms/TransferForm";
import useStoreState from "../../../hooks/useStoreState";

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
  const { user } = useStoreState();

  const [transfer, setTransfer] = useState<Transfer>();

  const [updateStatus, setUpdateStatus] = useState<UPDATE_STATUS>();
  const showModalUpdateStatus = ["success", "error"];
  const showModal: boolean = Boolean(
    updateStatus && showModalUpdateStatus.includes(updateStatus)
  );

  useEffect(() => {
    let mounted = true;
    /* fetch transfers data for intial values */
    function fetchTransfer() {
      axios
        .get(`/organizations/${user.organization}/transfers/${transferId}`)
        .then((res) => {
          console.log("res", res);
          if (res && mounted) {
            const initTransfer: Transfer = res.data;
            setTransfer(initTransfer);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
    fetchTransfer();

    return () => {
      mounted = false;
    };
  }, [transferId, user.organization]);

  const updateTransfer = (formTransfer: TransferFormData) => {
    if (transfer) {
      const updatedTransfer: Transfer = {
        ...transfer,
        ...formTransfer,
      };
      setUpdateStatus("pending");
      axios
        .put(
          `/organizations/${transfer.organization}/transfers/${transfer.uid}`,
          JSON.stringify(updatedTransfer)
        )
        .then(() => {
          setUpdateStatus("success");
        })
        .catch(() => setUpdateStatus("error"));
    }
  };

  const onHideModal = () => {
    setUpdateStatus(undefined);
  };

  return (
    <section>
      <h1>Edit Transfers</h1>
      <div>
        {transfer && (
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
