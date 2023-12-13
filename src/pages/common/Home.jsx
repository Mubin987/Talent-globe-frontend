import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography';

function Home() {
  sessionStorage.clear();
  return (
    <div>
      <Typography variant="h2" component="div" align="center" color="textPrimary" sx={{ marginBottom: 6 }}>
        Talent Globe
      </Typography>
      <Button variant="contained" sx={{ marginRight: 2 }}><Link to='/login' >Login</Link> </Button>
      <Button variant="contained"><Link to='/signup'>Signup</Link> </Button>
    </div>
    
  )
}

export default Home