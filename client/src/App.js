import { lazy, Suspense } from 'react';
import {createBrowserRouter, RouterProvider, Route, createRoutesFromElements} from 'react-router-dom';
import Loading from './components/Loading';
import { useAuthContext } from './hooks/useAuthContext';

const Home = lazy( () => import('./pages/Home'));
const NotFound = lazy( () => import('./pages/NotFound'));
const ErrorElement = lazy( () => import('./components/ErrorElement') );

const AdminLayout = lazy( () => import('./Layouts/AdminLayout'));
const HodLayout = lazy( () => import('./Layouts/hodLayout'));
const SecretaryLayout = lazy( () => import('./Layouts/SecretaryLayout'));
const DepartmentLayout = lazy( () => import('./Layouts/DepartmentLayout') );

const Bulding = lazy( () => import('./pages/admin/Bulding'));
const Departements = lazy( () => import('./pages/admin/Departements'));
const Department = lazy( () => import('./pages/admin/Department') );
const HomeAdmin = lazy( () => import('./pages/admin/HomeAdmin'));
const Users = lazy( () => import('./pages/admin/Users'));
const HallType = lazy( () => import('./pages/admin/HallType') ); 

const HomeHOD = lazy( () => import('./pages/HOD/HomeHOD'));
const LecturersHOD = lazy( () => import('./pages/HOD/LecturersHOD'));
const HallsHOD = lazy(() => import('./pages/HOD/HallsHOD'));
const Review_Requests = lazy(() => import('./pages/HOD/ReviewRequestsHOD'));
const Sudents_Groups = lazy(() => import('./pages/HOD/StudentsGroupsHOD'));
const Courses = lazy(() => import('./pages/HOD/CoursesHOD'))
const CreateTable = lazy(() => import('./pages/HOD/CreateTableHOD'))


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
      <Route path='bulding' element={<DepartmentLayout />} errorElement={<ErrorElement />}>
        <Route index element={<Bulding />} />
        <Route path='hallType' element={<HallType />} />
        {/* <Route path=':Building_ID' element={<Halls />} /> */}
      </Route>
      <Route path='departements' element={<DepartmentLayout />} errorElement={<ErrorElement />}>
        <Route index element={<Departements />} />
        <Route path=':Department_ID' element={<Department />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Route>
  )
)

const routerHOD = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<HodLayout />}>
      <Route index element={<HomeHOD />} />
      <Route path='lecturers/:department_id' element={<LecturersHOD/>} />
      <Route path='halls/:department_id' element={<HallsHOD/>} />
      <Route path='review_requests' element={<Review_Requests/>} />
      <Route path='students_groups' element={<Sudents_Groups/>} />
      <Route path='courses' element={<Courses/>} />
      <Route path='create_table' element={<CreateTable/>} />
      <Route path='*' element={<NotFound />} />
    </Route>
  )
)

const routerSecretary = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<SecretaryLayout />}>
      <Route index element={<HomeAdmin />} />
      <Route path='*' element={<NotFound />} />
    </Route>
  )
)

function App() {
  const { user } = useAuthContext();

  return (
    <Suspense fallback={<Loading />}>
      {
        !user && <RouterProvider router={routerHome} />
      }

      {
        user && user.type === 1 && <RouterProvider router={routerAdmin} />
      }

      {
        user && user.type === 2 && <RouterProvider router={routerSecretary} />
      }

      {
        user && user.type === 3 && <RouterProvider router={routerHOD} />
      }
    </Suspense>
  );
}

export default App;
