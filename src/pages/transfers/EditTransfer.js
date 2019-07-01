import React, {useState, useEffect} from "react";

import TransferForm from './TransferForm';
import ValidationModal from '../../components/ValidationModal';

import fetcher from '../../utils/fetcher';
import putter from '../../utils/putter';

const SUCCESS_MESSAGE = 'You have successfully updated your transfer. Please continue with an option below.';
const FAIL_MESSAGE = 'Something went wrong when trying to update your transfer. Please close this dialog and try again.';


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

    setUpdateStatus('pending');

    putter('transfers', transferId, values).then(res => {
      setUpdateStatus('success');
    }).catch(() => setUpdateStatus('error'))
  };

  /* for modal interactions */
  const showModal = () => {
    const showModalUpdateStatus = ['success', 'error'];

    return showModalUpdateStatus.includes(updateStatus);
  }

  const onHideModal = () => {
    setUpdateStatus(undefined);
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
      <ValidationModal
        show={showModal()}
        onHide={onHideModal}
        title={updateStatus === 'success' ? 'Update Transfer Success' : 'Failed to Update Transfer'}
        text={updateStatus === 'success' ? SUCCESS_MESSAGE : FAIL_MESSAGE}
        success={updateStatus === 'success'}
        successActions={[
          {link: '/transfers', label: 'View Transfers'},
          {onClick: onHideModal, label: 'Keep Editing Transfer'}
        ]}
      />
    </section>
  );
}

export default EditTransfer;
