import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import CModal from '../components/Modal';

import fetcher from '../utils/fetcher'

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
}];

class Downloads extends React.Component {
  constructor () {
    super()

    const downloadColumn = {
      dataField: 'uid',
      text: 'Download',
      formatter: (cell) => (
        <button onClick={this.getDownloadLink} data-download-id={cell}>Download</button>
      )
    };

    columns.push(downloadColumn);

    this.state = {
      columns: columns,
      data: []
    }

    this.getDownloadLink = this.getDownloadLink.bind(this);
    this.clearDownload = this.clearDownload.bind(this);
  }

  componentDidMount () {
    fetcher('downloads').then(data => {
      this.setState({ data })
    })
  }

  getDownloadLink (e) {
    e.preventDefault();
    const downloadId = e.currentTarget.getAttribute('data-download-id');

    fetcher('downloads', `${downloadId}/link`).then((res) => {
      if (res.download_link) {
        this.setState({
          downloadLink: res.download_link,
          downloadLinkExpiration: res.expiration
        });
      }
    });
  }

  clearDownload () {
    this.setState({downloadLink: null, downloadLinkExpiration: null});
  }

  render () {
    return (
      <div>
        <CModal
          show={Boolean(this.state.downloadLink)}
          onHide={this.clearDownload}
          title="Start Download"
        >
            <p>Click <a href={this.state.downloadLink} target="_blank" rel="noopener noreferrer">here</a> to start your file download.</p>
            <p>{`This link will expire in ${this.state.downloadLinkExpiration} seconds.`}</p>
        </CModal>

        <h1>Downloads</h1>
        <BootstrapTable
          bootstrap4
          keyField='uid'
          data={ this.state.data }
          columns={ this.state.columns }
        />
    </div>
    )
  }
}

export default Downloads
