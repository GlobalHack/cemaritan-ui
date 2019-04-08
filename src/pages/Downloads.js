import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';

const downloads = [
  {
    id: 1,
    date: '2019-03-25',
    name: 'CW-Weekly-190325',
    source: {name: 'Case Worthy'},
    mapping: {name: 'CW-HUD'}
  }
];

const startDownload = (e) => {
  e.preventDefault();
  const downloadId = e.currentTarget.getAttribute('data-download-id');
  console.log(`start download with id: ${downloadId}`);
}

const downloadsColumn = (cell) => (
  <a href="" onClick={startDownload} data-download-id={cell}>Download</a>
);

const columns = [{
  dataField: 'date',
  text: 'Date',
  sort: true
}, {
  dataField: 'name',
  text: 'Name',
  sort: true
},{
  dataField: 'source.name',
  text: 'Source',
  sort: true
}, {
  dataField: 'mapping.name',
  text: 'Mapping',
  sort: true
}, {
  dataField: 'id',
  text: 'Download',
  formatter: downloadsColumn
}];

class Downloads extends React.Component {
  render () {
    return (
      <div>
        <h1>Downloads</h1>
        <BootstrapTable
          bootstrap4
          keyField='date'
          data={ downloads }
          columns={ columns }
        />
      </div>
    )
  }
}

export default Downloads
