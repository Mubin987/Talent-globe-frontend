import React from 'react'
import axios from 'axios';
import { useEffect,useState } from 'react';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

function Jobs() {
  const navigate = useNavigate();  //has a function "push"
  //wait for request to be done then execute then as it is a promise
  const [listofJobs,setlistofJobs] = useState([]);
  // const [companyName,setcompanyName] = useState('');
  // const [id,setid] = useState('');
  useEffect(()=>{
    axios.get("https://talent-globe-api-mubin.up.railway.app/jobs").then((response)=>{  
      setlistofJobs(response.data);    //access data inside response
    });
  },[]);
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  // const fetchCompanyName = async (companyId) => {
  //   try {
  //     const response = await axios.get(`https://talent-globe-api-mubin.up.railway.app/companies/${companyId}`);
  //     console.log(response.data);
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error fetching company name:', error);
  //     return '';
  //   }
  // };
  return (
    <div>
      <Button variant="contained" className="buttonMargin" onClick={() => {navigate(`/jobs/byCountry/${1}`);}}>Goto Jobs by countries</Button>
      <div>
      {listofJobs.map((value,index)=>{
        // let companyName = await fetchCompanyName(value.company_Id);
      return( 
        <div className='post' key={value.job_id} onClick={() => {navigate(`/jobs/${value.job_id}`);}}> 
          <div className='title'>
            {value.title}
            <div><DateRangeIcon fontSize="small" />{formatDate(value.createdAt)}</div>
          </div>
          <div className='body'>{value.description}</div>
          <div className='footer'>Posted by {value.Company.name}</div>
        </div>
      )
    })}</div></div>
  )
}

export default Jobs