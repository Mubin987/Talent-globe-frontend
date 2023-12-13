import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Dashboard() {
    const [username,setUsername] = useState('');
    const [usertype,setUsertype] = useState('');
    useEffect(()=>{
        const data = {};
        axios.post("http://localhost:3001/auth/dashboard",data,{headers:{accessToken:sessionStorage.getItem("accessToken"),},}).then((response)=>{ 
            if(response.data.error === "User not logged in"){
                alert(response.data.error);
            }else{
                setUsername(response.data.username);
                setUsertype(response.data.usertype);
            }
        })
    },[]);
  return (
    <div>{usertype} dashboard ...<br /><br /> Hi {username}</div>
  )
}

export default Dashboard