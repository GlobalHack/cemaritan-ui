import React, {useState} from "react";
import TransferForm from './TransferForm';

import poster from '../../utils/poster';
import {Banner} from '../../styled-variables';

function CreateTransfer() {
  const [postStatus, setPostStatus] = useState();

  const postTransfer = (data) => {
    // TODO: organization, we won't need... will be handled by the backend ...
    // TODO: need to attach created_by from global context?...
    data.organization = 'OLI';
    data.created_by = 1;
    // {"name": "new", "source_uid": 3, "source_mapping_uid":2, "destination_uid": 4, "destination_mapping_uid": 3, "active": "FALSE",  "start_datetime": "2019-03-13 20:42:03", "frequency": "1 day"}

    console.log(data);
    setPostStatus('pending');

    poster('transfers', data).then(res => {
        console.log(res);
        // TODO: fake out success message here
        setPostStatus('success');
    });
  };

  return (
    <section>
      <h1>Create Transfers</h1>
      <div>
        {postStatus === 'success' &&
          <Banner>Successfully created transfer.</Banner>
        }
        {postStatus === 'error' && (
          <Banner>Error creating transfer. Try Again.</Banner>
        )}
        <TransferForm
          initialValues={{
            name: '',
            source_uid: '',
            source_mapping_uid: '',
            destination_uid: '',
            destination_mapping_uid: '',
            frequency: '',
            active: false
          }}
          onSubmit={postTransfer}
        />
      </div>
    </section>
  );
}

export default CreateTransfer;
