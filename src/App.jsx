import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import './App.css'
import Home from './pages/common/Home'
import LayoutE from './components/layoutE'
import LayoutC from './components/layoutC'
import Jobs from './pages/employee/Jobs'
import CreatePost from './pages/company/CreatePost'
import Job from './pages/employee/Job'
import JobByCountry from './pages/employee/JobByCountry'
import Login from './pages/common/Login'
import Signup from './pages/common/Signup'
import Esignup from './pages/common/Esignup'
import Csignup from './pages/common/Csignup'
import Dashboard from './pages/common/Dashboard'
import ManageJobs from './pages/company/ManageJobs'
import Applicants from './pages/company/Applicants'
import Viewapplied from './pages/employee/Viewapplied'

const router = createBrowserRouter([
  {
    element:<LayoutE />,
    children:[
      {
        path:'/eDashboard',
        element:<Dashboard />
      },
      {
        path:'/jobs',
        element:<Jobs />
      },
      {
        path:'/jobs/:id',
        element:<Job />
      },
      {
        path:'/jobs/byCountry/:countryId',
        element:<JobByCountry />
      },
      {
        path:'/viewappliedjobs',
        element:<Viewapplied />
      },
    ],
  },
  {
    element:<LayoutC />,
    children:[
      {
        path:'/cDashboard',
        element:<Dashboard />
      },
      {
        path:'/managejobs',
        element:<ManageJobs />
      },
      {
        path:'/applicants/:id',
        element:<Applicants />
      },
      {
        path:'/createpost',
        element:<CreatePost />
      },
    ],
  },
  {
    path:'/',
    element:<Home />
  },
  {
    path:'/login',
    element:<Login />
  },
  {
    path:'/signup',
    element:<Signup />
  },
  {
    path:'/signup/employee',
    element:<Esignup />
  },
  {
    path:'/signup/company',
    element:<Csignup />
  },
  
])


function App() {
  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
