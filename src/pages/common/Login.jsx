import React,{useState} from 'react'
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage} from 'formik'
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import logo from '../../logo.png';
import { useMediaQuery  } from '@mui/material'

const Alert = React.forwardRef(function Alert(props, ref) 
{
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Login() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [alertmsg, setAlertmsg] = useState('');
    const [severity, setSeverity] = useState('');
    const isExtraSmallScreen = useMediaQuery('(max-width: 600px)');
    const logoSize = isExtraSmallScreen ? '80vw' : '40vw';
    const initialValues = {
        username:'',
        password:'',
        
    };
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('username is required '),
        password:Yup.string().required('password is required'),
        
    });
    const onSubmit = (data) =>{
        axios.post("https://talent-globe-api-mubin.up.railway.app/auth/login",data).then((response)=>{  
            console.log(response.data);
            if(response.data.message==="LOGIN SUCCESSFUL"){
                setAlertmsg(response.data.message);
                setSeverity('success');
                setOpen(true);
                sessionStorage.setItem("accessToken",response.data.accessToken)
                setTimeout(() => {
                    if(response.data.usertype === 'company'){
                        navigate('/cDashboard');
                    }else if(response.data.usertype === 'employee'){
                        navigate('/eDashboard');
                    }
                }, 2000);
            }
            else{
                setAlertmsg(response.data.error);
                setSeverity('error');
                setOpen(true);
            }
        })
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };
  return (
    <div className='LoginPage'>
        <img src={logo} alt="Logo" style={{ width: logoSize}}/><br/><br/>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form className='formContainer'>
             <label htmlFor='username'>username: 
                 <ErrorMessage name='username' component='span' />
                 <Field autoComplete='off' className='inputLoginPage' id="username" name="username" placeholder='username...' />
             </label>
             <label htmlFor='password'>password: 
                 <ErrorMessage name='description' component='span' />
                 <Field autoComplete='off' className='inputLoginPage' id="password" name="password" placeholder='password...' />
             </label>
             <button type='submit'>Log in</button>
            </Form>
        </Formik>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {alertmsg}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Login