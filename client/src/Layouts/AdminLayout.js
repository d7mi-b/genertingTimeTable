import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function AdminLayout () {
    return (
        <div className='layout'>
            <Sidebar />
            <Outlet />
        </div>
    )
}