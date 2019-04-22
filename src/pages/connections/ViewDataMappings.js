import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';

const mappings = [
  {
    "UID": 1,
    "Organization": 1,
    "Name": "SF to HUD",
    "StartFormat": "csv",
    "EndFormat": "json",
    "NumOfTransfers": 1,
    "MappingInfo": "{}"
  }, {
    "UID": 2,
    "Organization": 1,
    "Name": "CW to HUD",
    "StartFormat": "csv",
    "EndFormat": "json",
    "NumOfTransfers": 1,
    "MappingInfo": "{}"
  }, {
    "UID": 6,
    "Organization": 1,
    "Name": "new_mapping",
    "StartFormat": "csv",
    "EndFormat": "json",
    "NumOfTransfers": 1,
    "MappingInfo": "blahdiblah"
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
  dataField: 'StartFormat',
  text: 'Start Format',
  sort: false
}, {
 dataField: 'EndFormat',
 text: 'End Format',
 sort: false
}, {
 dataField: 'NumOfTransfers',
 text: '# of Transfers',
 sort: false
}];

class ViewConnections extends React.Component {
  render () {
    return (
      <div>
        <h1>View Data Mappings</h1>
        <BootstrapTable
          bootstrap4
          keyField='UID'
          data={ mappings }
          columns={ columns }
        />
      </div>
    )
  }
}

export default ViewConnections
