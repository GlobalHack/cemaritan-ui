import React, {useContext, useState, useEffect} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';

import { AuthContext } from '../../context/AuthContext';
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

const ViewConnections = () => {
  const {auth} = useContext(AuthContext);
  const [data, setData] = useState();

  useEffect(() => {
    fetcher('connections', auth).then(data => {
      setData(data);
    })
  });

  return (
    <div>
      <h1>View Connections</h1>
      <BootstrapTable
        bootstrap4
        keyField='uid'
        data={ data }
        columns={ columns }
      />
    </div>
  )
}

export default ViewConnections
