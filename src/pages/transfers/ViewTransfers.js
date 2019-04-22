import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import fetcher from '../../utils/fetcher'


const transfers = [
  {
    "UID": 1,
    "Name": "CW to SF",
    "CreatedDate": "2019-03-20 20:42:03",
    "CreatedBy": 1,
    "Organization": 1,
    "Source": {
      "UID": 2,
      "Name": "SalesForce"
    },
    "SourceMapping": 2,
    "Destination": {
      "UID": 1,
      "Name": 'CW'
    },
    "DestinationMapping": 1,
    "StartDateTime": "2019-03-13 20:42:03",
    "Frequency": "1 day",
    "RecordFilter": "filter a",
    "Active": 1
  }, {
    "UID": 2,
    "Name": "SF to CW",
    "CreatedDate": "2019-03-13 20:42:03",
    "CreatedBy": 1,
    "Organization": 1,
    "Source": {
      "UID": 1,
      "Name": 'CW'
    },
    "SourceMapping": 1,
    "Destination": {
      "UID": 2,
      "Name": 'SalesForce'
    },
    "DestinationMapping": 2,
    "StartDateTime": "2019-03-13 20:42:03",
    "Frequency": "1 hour",
    "RecordFilter": "filter b",
    "Active": 0
  }
];

const columns = [{
  dataField: 'UID',
  text: 'UID',
  hidden: true
}, {
  dataField: 'Active',
  text: 'Active',
  sort: true,
  formatter: (cell) => cell ? 'Active' : 'Inactive'
}, {
  dataField: 'Source',
  text: 'Source',
  sort: true
},{
  dataField: 'Destination',
  text: 'Destination',
  sort: true
}, {
  dataField: 'Frequency',
  text: 'Frequency'
}, {
  dataField: 'StartDateTime',
  text: 'Start Date',
  sort: true
}, {
  dataField: 'UID',
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
          keyField='UID'
          data={ this.state.data }
          columns={ columns }
        />
      </div>
    );
  }
}

export default ViewTransfers;
