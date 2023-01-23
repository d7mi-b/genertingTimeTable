import { lazy, Suspense } from 'react';
import {createBrowserRouter, RouterProvider, Route, createRoutesFromElements} from 'react-router-dom';

const AdminLayout = lazy( () => import('./Layouts/AdminLayout'));
const HodLayout = lazy( () => import('./Layouts/hodLayout'));
const Bulding = lazy( () => import('./pages/admin/Bulding'));
const Departements = lazy( () => import('./pages/admin/Departements'));
const HomeAdmin = lazy( () => import('./pages/admin/HomeAdmin'));
const Users = lazy( () => import('./pages/admin/Users'));
const Home = lazy( () => import('./pages/Home'));
const HomeHOD = lazy( () => import('./pages/HOD/HomeHOD'));
const LecturersHOD = lazy( () => import('./pages/HOD/LecturersHOD'));
const HallsHOD = lazy(() => import('./pages/HOD/HallsHOD'));
const Review_Requests = lazy(() => import('./pages/HOD/ReviewRequestsHOD'));
const Sudents_Groups = lazy(() => import('./pages/HOD/StudentsGroupsHOD'));

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
      <Route path='lecturers' element={<LecturersHOD/>} />
      <Route path='halls' element={<HallsHOD/>} />
      <Route path='review_requests' element={<Review_Requests/>} />
      <Route path='students_groups' element={<Sudents_Groups/>} />
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
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={routerHOD} />
    </Suspense>
  );
}

export default App;
