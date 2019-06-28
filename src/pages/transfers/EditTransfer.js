import React, {useState, useEffect} from "react";

import TransferForm from './TransferForm';
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
      {updateStatus === 'success' && (
        <div>Updated Transfer Success</div>
      )}
      {updateStatus === 'error' && (
        <div>Failed to Update Transfer</div>
      )}
    </section>
  );
}

export default EditTransfer;
