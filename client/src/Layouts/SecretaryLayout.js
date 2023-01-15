import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function SecretaryLayout () {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    )
}