import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import fetcher from '../../utils/fetcher'

const connections = [
  {
    "UID": 1,
    "Organization": 1,
    "Name": "SF",
    "CreatedDate": "2019-03-09 20:42:03",
    "CreatedBy": 1,
    "Type": "A",
    "ConnectionInfo": "{conn string}"
  }, {
    "UID": 2,
    "Organization": 1,
    "Name": "CW",
    "CreatedDate": "2019-03-10 04:42:03",
    "CreatedBy": 1,
    "Type": "B",
    "ConnectionInfo": "{conn string}"
  }, {
    "UID": 6,
    "Organization": 1,
    "Name": "Secure Download",
    "CreatedDate": "2019-03-23 20:42:03",
    "CreatedBy": 0,
    "Type": "F",
    "ConnectionInfo": 0
  }
];

const columns = [{
  dataField: 'UID',
  text: 'UID',
  hidden: true
}, {
  dataField: 'Name',
  text: 'Name',
  sort: true
}, {
  dataField: 'Type',
  text: 'Type',
  sort: true
},{
  dataField: 'CreatedDate',
  text: 'Created',
  sort: true
}, {
  dataField: 'UID',
  text: 'Edit',
  formatter: (cell) => <a href="#route-to-connection">Edit</a>
}];

class ViewConnections extends React.Component {
  constructor () {
    super()

    this.state = {
      data: []
    }
  }

  componentDidMount () {
    fetcher('connections').then(data => {
      this.setState({ data })
    })
  }

  render () {
    return (
      <div>
        <h1>View Connections</h1>
        <BootstrapTable
          bootstrap4
          keyField='UID'
          data={ this.state.data }
          columns={ columns }
        />
      </div>
    )
  }
}

export default ViewConnections
