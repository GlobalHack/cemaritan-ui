import React, {useState, useEffect} from "react";

import TransferForm from './TransferForm';
import CModal from '../../components/Modal';
import fetcher from '../../utils/fetcher';
import putter from '../../utils/putter';


const EditTransfer = (props) => {
  const [initValues, setInitValues] = useState(null)
  const [transferId] = useState(props.match.params.transferId)
  const [updateStatus, setUpdateStatus] = useState()


  useEffect(() => {
    /* fetch transfers data for intial values */
    fetcher('transfers', transferId).then(data => {
      setInitValues(data)
    });
  }, []);

  const updateTransfer = (values) => {
    // data.organization = 'OLI';
    // data.created_by = 1;
    // data.start_datetime = "2019-07-13 20:42:03";

    console.log(values);
    setUpdateStatus('pending');

    putter('transfers', transferId, values).then(res => {
      console.log('reached then...');
      console.log(res);
      setUpdateStatus('success');
    }).catch(() => setUpdateStatus('error'))
  };

  /* for modal interactions */
  const showModal = () => {
    const showModalUpdateStatus = ['success', 'error'];

    return showModalUpdateStatus.includes(updateStatus);
  }

  const getModalTitle = () => {
    if (updateStatus === 'success') {
      return (
        <div className="text-success">
          <span className="oi oi-circle-check" title="success checkmark icon" aria-hidden="true"></span>
          &nbsp;&nbsp;Updated Transfer Success
        </div>
      );
    }
    if (updateStatus === 'error') {
      return (
        <div className="text-danger">
          <span className="oi oi-circle-x" title="error checkmark icon" aria-hidden="true"></span>
          &nbsp; &nbsp; Failed to Update Transfer
        </div>
      );
    }
  }

  const onHideModal = () => {
    setUpdateStatus(undefined);

    if (updateStatus === 'success') {
      // TODO: maybe navigate here or clear form?
    }
  }

  return (
    <section>
      <h1>Edit Transfers</h1>
      <div>
        {initValues &&
          <TransferForm
            initialValues={initValues}
            onSubmit={updateTransfer}
          />
        }
      </div>
      <CModal
        show={showModal()}
        onHide={onHideModal}
        title={getModalTitle()}
      >
      </CModal>
    </section>
  );
}

export default EditTransfer;
