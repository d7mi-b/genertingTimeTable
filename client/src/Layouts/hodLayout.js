import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function HodLayout () {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    )
}