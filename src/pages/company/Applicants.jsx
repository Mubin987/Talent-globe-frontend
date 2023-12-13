import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import  Table  from './../../components/Table';

function Applicants() {
    const { id } = useParams();
    const [listofApplicants,setlistofApplicants] = useState([]);
    useEffect(()=>{
        axios.get(`https://talent-globe-api-mubin.up.railway.app/applications/byJobid/${id}`,{headers:{accessToken:sessionStorage.getItem("accessToken"),},}).then((response)=>{  
          if(response.data.error){
            alert(response.data.error);
        }else{
          setlistofApplicants(response.data);
        }
        });
      },[id]);
    return (
        <div>
            <div>Applications</div>
            <Table array={listofApplicants} />
            {/* {listofApplicants && listofApplicants.map((value,index)=>{
                 return(
                        <div>{value.name}</div>
                    )
            })} */}
        </div>
    )
}

export default Applicants