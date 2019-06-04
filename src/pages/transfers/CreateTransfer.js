import React from "react";
import TransferForm from './TransferForm';

function CreateTransfer() {

  return (
    <section>
      <h1>Create Transfers</h1>
      <div>
        <TransferForm
          initialValues={{
            source_uid: '',
            source_mapping_uid: '',
            destination_uid: '',
            destination_mapping_uid: '',
            frequency: '',
            active: false
          }}
          onSubmit={(values) => {
            console.log(values);
          }}
        />
      </div>
    </section>
  );
}

export default CreateTransfer;
