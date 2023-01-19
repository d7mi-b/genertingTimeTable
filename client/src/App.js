import { lazy, Suspense } from 'react';
import {createBrowserRouter, RouterProvider, Route, createRoutesFromElements} from 'react-router-dom';
import NotFound from './pages/NotFound';

const AdminLayout = lazy( () => import('./Layouts/AdminLayout'));
const HodLayout = lazy( () => import('./Layouts/hodLayout'));
const Bulding = lazy( () => import('./pages/admin/Bulding'));
const Departements = lazy( () => import('./pages/admin/Departements'));
const HomeAdmin = lazy( () => import('./pages/admin/HomeAdmin'));
const Users = lazy( () => import('./pages/admin/Users'));
const Home = lazy( () => import('./pages/Home'));
const HomeHOD = lazy( () => import('./pages/HOD/HomeHOD'));

const routerHome = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Home />}>
      <Route path='*' element={<NotFound />} />
    </Route>
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
      <Route path='*' element={<NotFound />} />
    </Route>
  )
)

const routerHOD = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<HodLayout />}>
      <Route index element={<HomeHOD />} />
      <Route path='*' element={<NotFound />} />
    </Route>
  )
)

const routerSecretary = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<HodLayout />}>
      <Route index element={<HomeAdmin />} />
      <Route path='*' element={<NotFound />} />
    </Route>
  )
)

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={routerHOD} />
    </Suspense>
  );
}

export default App;
