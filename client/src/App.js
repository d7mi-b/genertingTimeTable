import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import Loading from "./components/Loading";
import { useAuthContext } from "./hooks/useAuthContext";

const Home = lazy(() => import("./pages/Home"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ErrorElement = lazy(() => import("./components/ErrorElement"));

const AdminLayout = lazy(() => import("./Layouts/AdminLayout"));
const HodLayout = lazy(() => import("./Layouts/hodLayout"));
const SecretaryLayout = lazy(() => import("./Layouts/SecretaryLayout"));
const DepartmentLayout = lazy(() => import("./Layouts/DepartmentLayout"));

const Buldings = lazy(() => import("./pages/admin/Buldings"));
const Building = lazy(() => import("./pages/admin/Building"));
const Departements = lazy(() => import("./pages/admin/Departements"));
const Department = lazy(() => import("./pages/admin/Department"));
const HomeAdmin = lazy(() => import("./pages/admin/HomeAdmin"));
const Users = lazy(() => import("./pages/admin/Users"));
const HallType = lazy(() => import("./pages/admin/HallType"));

const HomeHOD = lazy(() => import("./pages/HOD/HomeHOD"));
const LecturersHOD = lazy(() => import("./pages/HOD/LecturersHOD"));
const HallsHOD = lazy(() => import("./pages/HOD/HallsHOD"));
const Review_Requests = lazy(() => import("./pages/HOD/ReviewRequestsHOD"));
const Sudents_Groups = lazy(() => import("./pages/HOD/StudentsGroupsHOD"));
const Courses = lazy(() => import("./pages/HOD/CoursesHOD"));
const CreateTable = lazy(() => import("./pages/HOD/CreateTableHOD"));

const SecretaryHome = lazy(() => import("./pages/secretary/SecretaryHome"));
const SecretaryCreateSchedule = lazy(() =>
  import("./pages/secretary/SecretaryCreateSchedule")
);
const SecretaryDepartments = lazy(() =>
  import("./pages/secretary/SecretaryStudents")
);
const SecretaryLaps = lazy(() => import("./pages/secretary/SecretaryLabs"));
const SecretaryLecturers = lazy(() =>
  import("./pages/secretary/SecretaryLeacturers")
);
const SecretaryRequestManager = lazy(() =>
  import("./pages/secretary/SecretaryRequestManager")
);

const routerHome = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Home />}>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

const routerAdmin = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AdminLayout />}>
      <Route index element={<HomeAdmin />} />
      <Route path="users" element={<Users />} />
      <Route
        path="bulding"
        element={<DepartmentLayout />}
        errorElement={<ErrorElement />}
      >
        <Route index element={<Buldings />} />
        <Route path=":Building_ID" element={<Building />} />
        <Route path="hallType" element={<HallType />} />
      </Route>
      <Route
        path="departements"
        element={<DepartmentLayout />}
        errorElement={<ErrorElement />}
      >
        <Route index element={<Departements />} />
        <Route path=":Department_ID" element={<Department />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

const routerHOD = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HodLayout />}>
      <Route index element={<HomeHOD />} />
      <Route path='lecturers' element={<LecturersHOD/>} />
      <Route path='halls' element={<HallsHOD/>} />
      <Route path='review_requests' element={<Review_Requests/>} />
      <Route path='students_groups' element={<Sudents_Groups/>} />
      <Route path='courses' element={<Courses/>} />
      <Route path='create_table' element={<CreateTable/>} />
      <Route path='*' element={<NotFound />} />
    </Route>
  )
);

const routerSecretary = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<SecretaryLayout />}>
      <Route index element={<SecretaryHome />} />
      <Route path="createTable" element={<SecretaryCreateSchedule />} />
      <Route path="laps" element={<SecretaryLaps />} />
      <Route path="departments" element={<SecretaryDepartments />} />
      <Route path="requests" element={<SecretaryRequestManager />} />
      <Route path="lecturesrs" element={<SecretaryLecturers />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  const { user } = useAuthContext();

  return (
    <Suspense fallback={<Loading />}>
      {!user && <RouterProvider router={routerHome} />}

      {user && user.type === 1 && <RouterProvider router={routerAdmin} />}

      {user && user.type === 2 && <RouterProvider router={routerSecretary} />}

      {user && user.type === 3 && <RouterProvider router={routerHOD} />}
    </Suspense>
  );
}

export default App;
