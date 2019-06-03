import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import fetcher from '../../utils/fetcher'


const columns = [{
  dataField: 'uid',
  text: 'UID',
  hidden: true
}, {
  dataField: 'active',
  text: 'Active',
  sort: true,
  formatter: (cell) => cell ? 'Active' : 'Inactive'
}, {
  dataField: 'source',
  text: 'Source',
  sort: true
}, {
  dataField: 'source_mapping',
  text: 'Source Mapping',
  sort: false
}, {
  dataField: 'destination',
  text: 'Destination',
  sort: true
}, {
  dataField: 'destination_mapping',
  text: 'Destination Mapping',
  sort: false
}, {
  dataField: 'frequency',
  text: 'Frequency'
}, {
  dataField: 'start_datetime',
  text: 'Start Date',
  sort: true
}, {
  dataField: 'uid',
  text: 'Edit',
  formatter: (cell) => <a href="#route-to-transfer">Edit</a>
}];

class ViewTransfers extends React.Component {
  constructor () {
    super()

    this.state = {
      data: []
    }
  }

  componentDidMount () {
    fetcher('transfers').then(data => {
      this.setState({ data })
    })
  }

  render() {
    return (
      <div>
        <h1>Scheduled Transfers</h1>
        <BootstrapTable
          bootstrap4
          keyField='uid'
          data={ this.state.data }
          columns={ columns }
        />
      </div>
    );
  }
}

export default ViewTransfers;
