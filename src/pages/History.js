import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';

const history = [
  {
    id: 1,
    date: '2019-03-25',
    name: 'Case-Worthy-To-HUD',
    type: 'Transfer',
    source: {name: 'Case Worthy'},
    destination: {name: 'HUD'}
  },
  {
    id: 2,
    date: '2019-03-29',
    name: 'Case-Worthy-To-HUD',
    type: 'Transfer',
    source: {name: 'Case Worthy'},
    destination: {name: 'HUD'}
  }
];

const columns = [{
  dataField: 'date',
  text: 'Date',
  sort: true
}, {
  dataField: 'name',
  text: 'Name',
  sort: true
}, {
  dataField: 'type',
  text: 'Type',
  sort: true
}, {
  dataField: 'source.name',
  text: 'Source',
  sort: true
}, {
  dataField: 'destination.name',
  text: 'Destination',
  sort: true
}];

class History extends React.Component {

  render () {
    return (
      <div>
        <h1>History</h1>
        <BootstrapTable
          bootstrap4
          keyField='date'
          data={ history }
          columns={ columns }
        />
      </div>
    )
  }
}

export default History
