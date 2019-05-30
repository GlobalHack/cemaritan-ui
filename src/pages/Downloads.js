import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import fetcher from '../utils/fetcher'

const startDownload = (e) => {
  e.preventDefault();
  const downloadId = e.currentTarget.getAttribute('data-download-link');
  console.log(`start download with link: ${downloadId}`);
}

const downloadsColumn = (cell) => (
  <a href="#link-to-start-download" onClick={startDownload} data-download-link={cell}>Download</a>
);

const columns = [{
  dataField: 'uid',
  text: 'UID',
  hidden: true
}, {
  dataField: 'expiration_datetime',
  text: 'Expiration Date',
  sort: true
}, {
  dataField: 'name',
  text: 'Name',
  sort: true
},{
  dataField: 'transfer_name',
  text: 'Transfer Name',
  sort: true
}, {
  dataField: 'file_location_info',
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
    fetcher('downloads').then(data => {
      this.setState({ data })
    })
  }

  render () {
    return (
      <div>
        <h1>Downloads</h1>
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

export default Downloads
