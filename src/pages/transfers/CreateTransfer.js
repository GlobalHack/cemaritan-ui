import React, {useState} from "react";
import {Link} from 'react-router-dom';

import CModal from '../../components/Modal';
import TransferForm from './TransferForm';
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

  const getModalTitle = () => {
    if (postStatus === 'success') {
      return 'Successfully Created Transfer';
    }
    if (postStatus === 'error') {
      return 'Error Creating Transfer';
    }
  }

  const onHideModal = () => {
    setPostStatus(undefined);

    if (postStatus === 'success') {
      // TODO: maybe navigate here or clear form?
    }
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
      <CModal
        show={showModal()}
        onHide={onHideModal}
        title={getModalTitle()}
      >
        {postStatus === 'success' &&
          <div>To view your new transfer navigate to the <Link to="/transfers">View Transfer Page</Link>. Or <Link to="/transfers/create">create another transfer</Link></div>
        }
        {postStatus === 'error' && (
          <div>Something went wrong when attempting to create your transfer. Please close this dialog and try again.</div>
        )}
      </CModal>
    </section>
  );
}

export default CreateTransfer;
