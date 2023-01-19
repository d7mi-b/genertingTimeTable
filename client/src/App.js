import {createBrowserRouter, RouterProvider, Route, createRoutesFromElements} from 'react-router-dom';
import AdminLayout from './Layouts/AdminLayout';
import HodLayout from './Layouts/hodLayout';
import Bulding from './pages/admin/Bulding';
import Departements from './pages/admin/Departements';
import HomeAdmin from './pages/admin/HomeAdmin';
import Users from './pages/admin/Users';
import Home from './pages/Home';
import HomeHOD from './pages/HOD/HomeHOD';

const routerHome = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Home />} />
  )
)

const routerAdmin = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<AdminLayout />}>
      <Route index element={<HomeAdmin />} />
      <Route path='users' element={<Users />} />
      <Route path='bulding' element={<Bulding />}>

      </Route>
      <Route path='departements' element={<Departements />} />
    </Route>
  )
)

const routerHOD = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<HodLayout />}>
      <Route index element={<HomeHOD />} />
    </Route>
  )
)

const routerSecretary = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<HodLayout />}>
      <Route index element={<HomeAdmin />} />
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={routerHOD} />
  );
}

export default App;
