import React from 'react';
import { Button } from '@mui/material';
import axios from 'axios';

const Table = ({ array }) => {
    const Approve = (applicationid) => {
        const data = {application_id:applicationid};
        axios.post("http://localhost:3001/applications/approve", data, {headers:{accessToken:sessionStorage.getItem("accessToken"),},}).then((response) => {
            if (response.data.error) {
              alert(response.data.error);
            }else{
                alert('Approved');
            }
        });
    }
  return (
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          <th style={tableHeaderStyle}>NAME</th>
          <th style={tableHeaderStyle}>CV Link</th>
          <th style={tableHeaderStyle}>Contact No.</th>
          <th style={tableHeaderStyle}>EMAIL</th>
          <th style={tableHeaderStyle}>STATUS</th>
          <th style={tableHeaderStyle}></th>
        </tr>
      </thead>
      <tbody>
        {array.map((row, index) => (
          <tr key={row.id} style={(index % 2 === 0) ? tableRowEvenStyle : tableRowOddStyle}>
            <td style={tableCellStyle}>{row.name}</td>
            <td style={tableCellStyle}>{row.cvlink}</td>
            <td style={tableCellStyle}>{row.contactno}</td>
            <td style={tableCellStyle}>{row.email}</td>
            <td style={tableCellStyle}>
                {row.Applications.map((application) => (
                <div key={application.application_id}>
                    {application.status} &nbsp;
                    <Button variant="contained" onClick={()=>Approve(application.application_id)}>Approve</Button>
                </div>
                ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const tableHeaderStyle = {
  borderBottom: '2px solid #ddd',
  padding: '8px',
  textAlign: 'left',
};

const tableRowEvenStyle = {
  backgroundColor: '#f2f2f2',
};

const tableRowOddStyle = {
  backgroundColor: '#fff',
};

const tableCellStyle = {
  borderBottom: '1px solid #ddd',
  padding: '8px',
  textAlign: 'left',
};

export default Table;
