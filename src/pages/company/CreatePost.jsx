import React,{useState} from 'react'
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage} from 'formik'
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CreatePost() {
    const [open, setOpen] = useState(false);
    const initialValues = {
        title:'',
        description:'',
    };
    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is a required to fill field'),
        description: Yup.string().required(),
    });
    const onSubmit = (data) =>{
        axios.post("https://talent-globe-api-mubin.up.railway.app/jobs",data,{headers:{accessToken:sessionStorage.getItem("accessToken"),},}).then((response)=>{ 
            if(response.data.error){
                alert(response.data.error);
            }else{
                console.log("Job posted");    
                setOpen(true);                  //now show alert
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
    <div className='createPostPage'>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form className='formContainer'>
             <label htmlFor='title'>Job Title: 
                 <ErrorMessage name='title' component='span' />
                 <Field autoComplete='off' className='inputCreatePost' id="title" name="title" placeholder='title...' />
             </label>
             <label htmlFor='description'>Job Description: 
                 <ErrorMessage name='description' component='span' />
                 <Field autoComplete='off' className='inputCreatePost' id="description" name="description" placeholder='job description...' />
             </label>
             <button type='submit'>Create Job Post</button>
            </Form>
        </Formik>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Job successfully posted!
        </Alert>
      </Snackbar>
    </div>
  )
}

export default CreatePost