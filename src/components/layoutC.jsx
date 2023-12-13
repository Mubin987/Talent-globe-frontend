import HeaderC from './headerC'
import Footer from './footer'
import { Outlet } from 'react-router-dom'

const LayoutC = () => {
    return(
        <>
            <HeaderC />
            <Outlet />
            <Footer />
        </>
    )
} 

export default LayoutC