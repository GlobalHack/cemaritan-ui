import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import fetcher from '../utils/fetcher'

const startDownload = (e) => {
  e.preventDefault();
  const downloadId = e.currentTarget.getAttribute('data-download-id');
  console.log(`start download with id: ${downloadId}`);
}

const downloadsColumn = (cell) => (
  <a href="#link-to-start-download" onClick={startDownload} data-download-id={cell}>Download</a>
);

const columns = [{
  dataField: 'createddate',
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
  constructor () {
    super()

    this.state = {
      data: []
    }
  }

  componentDidMount () {
    // TODO update this to downloads endpoint once it exists
    fetcher('connections').then(data => {
      this.setState({ data })
    })
  }

  render () {
    return (
      <div>
        <h1>Downloads</h1>
        <BootstrapTable
          bootstrap4
          keyField='date'
          data={ this.state.data }
          columns={ columns }
        />
      </div>
    )
  }
}

export default Downloads
