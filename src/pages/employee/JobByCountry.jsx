import React from 'react'
import axios from 'axios';
import { useEffect,useState } from 'react';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { Link, useNavigate, useParams  } from 'react-router-dom';
import { Button } from '@mui/material';

function JobByCountry() {
  const { countryId } = useParams();
  const navigate = useNavigate();  //has a function "push"
  //wait for request to be done then execute then as it is a promise
  const [listofJobs,setlistofJobs] = useState([]);
  const [countries, setCountries] = useState([]);
  useEffect(()=>{
    axios.get(`http://localhost:3001/jobs/byCountry/${countryId}`).then((response)=>{  
      setlistofJobs(response.data);    //access data inside response
    });
    axios.get("http://localhost:3001/countries").then((response) => {
      setCountries(response.data);
    });
  },[countryId]);
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  return (
    <div><div>
      <div>
        {countries.map((value,key)=>{
            return(
                <Button variant="contained" className="buttonMargin" onClick={() => {navigate(`/jobs/byCountry/${key+1}`);}}>{value.country_name}</Button>
            )
        })}
      </div>
    </div>
    <div>{listofJobs.map((value,key)=>{
      return( 
        <div className='post' key={value.job_id} onClick={() => {navigate(`/jobs/${value.job_id}`);}}> 
          <div className='title'>
            {value.title}
            <div><DateRangeIcon fontSize="small" />{formatDate(value.createdAt)}</div>
          </div>
          <div className="body">{value.description}</div>
          <div className="footer">Posted by company {value.Company.name}</div>
        </div>
      )
    })}</div></div>
  )
}

export default JobByCountry