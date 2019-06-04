import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import fetcher from '../utils/fetcher';


const columns = [{
  dataField: 'datetime',
  text: 'Date',
  sort: true
}, {
  dataField: 'type',
  text: 'Type',
  sort: true
}, {
  dataField: 'action',
  text: 'Action',
  sort: true
}];

class History extends React.Component {
  constructor () {
    super()

    this.state = {
      data: []
    }
  }

  componentDidMount () {
    fetcher('histories').then(data => {
      this.setState({ data })
    })
  }

  render () {
    return (
      <div>
        <h1>History</h1>
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

export default History
