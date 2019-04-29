import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import fetcher from '../../utils/fetcher';


const columns = [{
  dataField: 'uid',
  text: 'UID',
  hidden: true
}, {
  dataField: 'name',
  text: 'Name',
  sort: true
}, {
  dataField: 'startformat',
  text: 'Start Format',
  sort: false
}, {
 dataField: 'endformat',
 text: 'End Format',
 sort: false
}, {
 dataField: 'numoftransfers',
 text: '# of Transfers',
 sort: false
}];

class ViewConnections extends React.Component {
  constructor () {
    super();

    this.state = {
      data: []
    }
  }

  componentDidMount () {
    fetcher('mappings').then(data => {
      console.log(data);
      this.setState({ data })
    })
  }

  render () {
    return (
      <div>
        <h1>View Data Mappings</h1>
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
