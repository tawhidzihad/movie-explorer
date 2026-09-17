import { Outlet } from 'react-router';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';

const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;