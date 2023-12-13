import HeaderE from './headerE'
import Footer from './footer'
import { Outlet } from 'react-router-dom'

const LayoutE = () => {
    return(
        <>
            <HeaderE />
            <Outlet />
            <Footer />
        </>
    )
} 

export default LayoutE