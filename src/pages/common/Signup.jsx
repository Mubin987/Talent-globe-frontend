import { Button,useMediaQuery  } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../logo.png';

function Signup() {
  const isExtraSmallScreen = useMediaQuery('(max-width: 600px)');
  const logoSize = isExtraSmallScreen ? '80vw' : '40vw';
  return (
    <div>
      <img src={logo} alt="Logo" style={{ width: logoSize}}/><br/><br/>
      <Button variant="contained" sx={{ marginRight: 2,marginBottom: 2 }}><Link to='/signup/employee'>Signup as Employee</Link> </Button>
      <Button variant="contained" sx={{ marginRight: 2,marginBottom: 2 }}><Link to='/signup/company'>Signup as Company</Link> </Button>
    </div>
  )
}

export default Signup