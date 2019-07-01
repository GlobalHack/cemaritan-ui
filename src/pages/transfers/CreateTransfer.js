import React, {useState} from "react";

import TransferForm from './TransferForm';
import ValidationModal from '../../components/ValidationModal';
import poster from '../../utils/poster';

const initValues = {
  name: '',
  source_uid: '',
  source_mapping_uid: '',
  destination_uid: '',
  destination_mapping_uid: '',
  frequency: '',
  active: false
};

const SUCCESS_MESSAGE = 'You have successfully created a new transfer. Please continue with an option below.';
const FAIL_MESSAGE = 'Something went wrong when attempting to create your transfer. Please close this dialog and try again.';


function CreateTransfer() {
  const [postStatus, setPostStatus] = useState();

  const postTransfer = (data) => {
    // TODO: organization, we won't need... will be handled by the backend ...
    // TODO: need to attach created_by from global context?...
    // TODO: add datetimepicker
    data.organization = 'OLI';
    data.created_by = 1;
    data.start_datetime = "2019-07-13 20:42:03";

    setPostStatus('pending');

    poster('transfers', data).then(res => {
        if (res) {
            setPostStatus('success');
        } else {
          setPostStatus('error');
        }
    }).catch(() => setPostStatus('error'));
  };

  const showModal = () => {
    const showModalPostStatus = ['success', 'error'];

    return showModalPostStatus.includes(postStatus);
  }

  const onHideModal = () => {
    setPostStatus(undefined);
  }

  return (
    <section>
      <h1>Create Transfers</h1>
      <div>
        <TransferForm
          initialValues={initValues}
          onSubmit={postTransfer}
        />
      </div>
      <ValidationModal
        show={showModal()}
        onHide={onHideModal}
        title={postStatus === 'success' ? 'Create Transfer Success' : 'Failed to Create Transfer'}
        text={postStatus === 'success' ? SUCCESS_MESSAGE : FAIL_MESSAGE}
        success={postStatus === 'success'}
        successActions={[
          {link: '/transfers', label: 'View Transfers'},
          {onClick: onHideModal, label: 'Create Another Transfer'}
        ]}
      />
    </section>
  );
}

export default CreateTransfer;
