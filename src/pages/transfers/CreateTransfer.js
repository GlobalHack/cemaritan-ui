import React from "react";
import TransferForm from './TransferForm';

function CreateTransfer() {

  return (
    <section>
      <h1>Create Transfers</h1>
      <div>
        <TransferForm
          initialValues={{
            source: '',
            source_mapping: '',
            destination: '',
            destination_mapping: '',
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
