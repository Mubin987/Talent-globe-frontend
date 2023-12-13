import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DateRangeIcon from '@mui/icons-material/DateRange';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ManageJobs() {
  const [listofJobs,setlistofJobs] = useState([]);
  const navigate = useNavigate();
  useEffect(()=>{
    axios.get("http://localhost:3001/jobs/by/company",{headers:{accessToken:sessionStorage.getItem("accessToken"),},}).then((response)=>{  
      if(response.data.error === "User not logged in"){
        alert(response.data.error);
    }else{
      setlistofJobs(response.data);
    }
    })
  },[]);
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const confirmDelete = (jobId) => {
    const userConfirmed = window.confirm("Are you sure you want to delete this job?");
    if (userConfirmed) {
      deleteJob(jobId);
    } else {
      // User cancelled the deletion
      console.log("Deletion cancelled");
    }
  };  
  const deleteJob = (jobId) => {
    const data = {jobId:jobId};
    axios.post("http://localhost:3001/jobs/delete", data, {headers:{accessToken:sessionStorage.getItem("accessToken"),},}).then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        }else{
            alert(response.data.message);
        }
    });
  }
  return (
    <div>
      <div>Posted Jobs</div>
      <div>
      {listofJobs && listofJobs.map((value,index)=>{
        return( 
        <div className='post' key={index}> 
          <div className='title'>
            {value.title}
            <div><DateRangeIcon fontSize="small" />{formatDate(value.createdAt)}</div>
          </div>
          <div className='body'>{value.description}</div>
          <div className='footer'>Posted by {
            value.Company.name
          }</div>
          <Button variant="contained" onClick={() => {navigate(`/applicants/${value.job_id}`);}}>View Applicants </Button>
          <Button variant="contained" onClick={() => confirmDelete(value.job_id)} style={{ backgroundColor: 'rgba(255, 0, 0, 0.7)', color: 'white' }}>
            Delete Job 
          </Button>
        </div>
        )
      })}</div>
    </div>
  )
}

export default ManageJobs