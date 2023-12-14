import React,{useState} from 'react'
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage} from 'formik'
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import logo from '../../logo.png';
import { useMediaQuery  } from '@mui/material'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Esignup() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [alertmsg, setAlertmsg] = useState('');
    const [severity, setSeverity] = useState('');
    const isExtraSmallScreen = useMediaQuery('(max-width: 600px)');
    const logoSize = isExtraSmallScreen ? '80vw' : '40vw';
    const initialValues = {
        name:'',
        username:'',
        contactno:'',
        cvlink: '',
        email:'',
        password: ''
    };
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        username: Yup.string().required('username is required'),
        contactno: Yup.number().required('contactno is required'),
        cvlink: Yup.string().required("CV is required"),
        email: Yup.string().required('email is required'),
        password: Yup.string().min(8, 'password must be at least 8 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]+$/,
          'password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character'
        ).required('password is required')
    });
    const onSubmit = (data) =>{
        axios.post("https://talent-globe-api-mubin.up.railway.app/auth/signup/employee",data).then((response)=>{ 
            console.log(response.data);
            if(response.data.message==="Signup Success"){
                setAlertmsg(response.data.message);
                setSeverity('success');
                setOpen(true);
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            }else{
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
    <div className='Signup'>
        <img src={logo} alt="Logo" style={{ width: logoSize}}/><br/><br/>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form className='formContainer'>
             <label htmlFor='name'>Name: 
                 <ErrorMessage name='name' component='span' />
                 <Field autoComplete='off' className='Signup' id="name" name="name" placeholder='Name...' />
             </label>
             <label htmlFor='username'>Username: 
                 <ErrorMessage name='username' component='span' />
                 <Field autoComplete='off' className='Signup' id="username" name="username" placeholder='username...' />
             </label>
             <label htmlFor='contactno'>contactno:
                 <ErrorMessage name='contactno' component='span' />
                 <Field autoComplete='off' className='Signup' id="contactno" name="contactno" placeholder='contactno...' />
             </label>
             <label htmlFor='cvlink'>cvlink: 
                 <ErrorMessage name='cvlink' component='span' />
                 <Field autoComplete='off' className='Signup' id="cvlink" name="cvlink" placeholder='cvlink...' />
             </label>
             <label htmlFor='email'>email: 
                 <ErrorMessage name='email' component='span' />
                 <Field autoComplete='off' className='Signup' id="email" name="email" placeholder='email...' />
             </label>
             <label htmlFor='password'>Password: 
                 <ErrorMessage name='password' component='span' />
                 <Field autoComplete='off' className='Signup' id="password" name="password" placeholder='password...' />
             </label>
             <button type='submit'>Sign up</button>
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

export default Esignup