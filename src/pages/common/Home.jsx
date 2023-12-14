import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../logo.png';
import { useMediaQuery  } from '@mui/material'

function Home() {
  sessionStorage.clear();
  const isExtraSmallScreen = useMediaQuery('(max-width: 600px)');
  const logoSize = isExtraSmallScreen ? '80vw' : '40vw';
  return (
    <div>
      <img src={logo} alt="Logo" style={{ width: logoSize}}/><br/><br/>
      <Button variant="contained" sx={{ marginRight: 2,marginBottom: 2 }}><Link to='/login' >Login</Link> </Button>
      <Button variant="contained" sx={{ marginRight: 2,marginBottom: 2 }}><Link to='/signup'>Signup</Link> </Button>
    </div>
    
  )
}

export default Home