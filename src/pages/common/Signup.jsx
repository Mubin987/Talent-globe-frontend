import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography';

function Signup() {
  return (
    <div>
      <Typography variant="h2" component="div" align="center" color="textPrimary" sx={{ marginBottom: 6 }}>
        Talent Globe
        </Typography>
      <Button variant="contained" sx={{ marginRight: 2 }}><Link to='/signup/employee'>Signup as Employee</Link> </Button>
      <Button variant="contained"><Link to='/signup/company'>Signup as Company</Link> </Button>
    </div>
  )
}

export default Signup