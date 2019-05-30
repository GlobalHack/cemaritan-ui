import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import fetcher from '../../utils/fetcher'


const columns = [{
  dataField: 'uid',
  text: 'UID',
  hidden: true
}, {
  dataField: 'name',
  text: 'Name',
  sort: true
}, {
  dataField: 'type',
  text: 'Type',
  sort: true
},{
  dataField: 'created_datetime',
  text: 'Created',
  sort: true
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
          keyField='uid'
          data={ this.state.data }
          columns={ columns }
        />
      </div>
    )
  }
}

export default ViewConnections
