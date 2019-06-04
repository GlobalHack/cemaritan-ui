import React from "react";
import fetcher from '../../utils/fetcher'
import TransferForm from './TransferForm';

class EditTransfer extends React.Component {
  constructor(props) {
    super();

    this.state = {
      transferId: props.match.params.transferId,
      initialValues: null
    };
  }

  componentDidMount() {
    fetcher('transfers', this.state.transferId).then(data => {
      // TODO: need to use id value for select fields ... when available in api
      // const initialValues = {
      //   source_uid: data.source,
      //   source_mapping_uid: data.source_mapping,
      //   destination_uid: data.destination,
      //   destination_mapping_uid: data.destination_mapping,
      //   frequency: data.frequency,
      //   active: data.active
      // };
      this.setState({ initialValues: data });
    });
  }

  render () {
    return (
      <section>
        <h1>Edit Transfers</h1>
        <div>
          {this.state.initialValues &&
            <TransferForm
              initialValues={this.state.initialValues}
              onSubmit={(values) => {
                console.log(values);
              }}
            />
          }
        </div>
      </section>
    );
  }
}

export default EditTransfer;
