import React , { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { Button } from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

function Job() {
    const { id } = useParams();
    const [job,setJob] = useState([]);

    useEffect(()=>{
        axios.get(`http://localhost:3001/jobs/${id}`).then((response)=>{  
            setJob(response.data);    //access data inside response
        });
    },[]);

    const apply = () => {
      const data = { status: 'pending', job_Id: id };
      axios.post("http://localhost:3001/applications", data, {headers:{accessToken:sessionStorage.getItem("accessToken"),},}).then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          alert('Application sent ✅');
        }
      });
    };

  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title"> {job.title} </div>
          <div className="body">{job.description}</div>
          {job.Company && (
            <div className="footer">Created by {job.Company.name}</div>
          )}
        </div>
      </div>
      <div className="rightSide"><Button variant="contained" onClick={apply}> Apply &nbsp; <RocketLaunchIcon/> </Button></div>
    </div>
  );
}

export default Job