import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';

const products = [
  {
    id: 1,
    date: '2019-03-25',
    name: 'Case-Worthy-To-HUD',
    type: 'Transfer',
    source: {name: 'Case Worthy'},
    destination: {name: 'HUD'}
  }
];

const columns = [{
  dataField: 'date',
  text: 'Date'
}, {
  dataField: 'name',
  text: 'Name'
}, {
  dataField: 'type',
  text: 'Type'
}, {
  dataField: 'source.name',
  text: 'Source'
}, {
  dataField: 'destination.name',
  text: 'Destination'
}];

class History extends React.Component {

  render () {
    return (
      <div>
        <h1>History</h1>
        <BootstrapTable keyField='date' data={ products } columns={ columns } />
      </div>
    )
  }
}

export default History
