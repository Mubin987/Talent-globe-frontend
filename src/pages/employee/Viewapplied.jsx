import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DateRangeIcon from '@mui/icons-material/DateRange';

function Viewapplied() {
    const [appliedJobs,setAppliedJobs] = useState([]);
    useEffect(()=>{
        axios.get('https://talent-globe-api-mubin.up.railway.app/applications/myapplications',{headers:{accessToken:sessionStorage.getItem("accessToken"),},}).then((response)=>{  
            if(response.data.error){
                alert(response.data.error);
            }else{
                setAppliedJobs(response.data);
            }
        });
      },[]);
      const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
      };
  return (
    <div>
      <div>Applied Jobs</div>
      <div>
      {appliedJobs && appliedJobs.map((value,index)=>{
        return( 
        <div className='post' key={index}> 
          <div className='title'>
            {value.Job && value.Job.title}
            <div>
                {/* {value.Applications.map((application) => (
                <div key={application.application_id}> */}
                    <DateRangeIcon fontSize="small" />Applied:&nbsp;{formatDate(value.createdAt)}
                    <br/>Status:&nbsp;{value.status}
                {/* </div>
                ))} */}
            </div>
          </div>
          <div className='body'>{value.Job && value.Job.description}</div>
          <div className='footer'>Posted by company {value.Job && value.Job.Company.name}</div>
        </div>
        )
      })}</div>
    </div>
  )
}

export default Viewapplied