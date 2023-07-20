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
const SearchTimetable = lazy(() => import('./pages/SearchTimetable'));
const NotFound = lazy(() => import("./pages/NotFound"));
const ErrorElement = lazy(() => import("./components/ErrorElement"));

const HomeLayout = lazy(() => import("./Layouts/HomeLayout"));
const AdminLayout = lazy(() => import("./Layouts/AdminLayout"));
const HodLayout = lazy(() => import("./Layouts/hodLayout"));
const SecretaryLayout = lazy(() => import("./Layouts/SecretaryLayout"));
const PageLayout = lazy(() => import("./Layouts/PageLayout"));

const Colleges = lazy(() => import("./pages/admin/Colleges"));
const College = lazy(() => import("./pages/admin/College"));
const Buldings = lazy(() => import("./pages/admin/Buldings"));
const Building = lazy(() => import("./pages/admin/Building"));
const Departements = lazy(() => import("./pages/admin/Departements"));
const Department = lazy(() => import("./pages/admin/Department"));
const HomeAdmin = lazy(() => import("./pages/admin/HomeAdmin"));
const Users = lazy(() => import("./pages/admin/Users"));
const HallType = lazy(() => import("./pages/admin/HallType"));
const SystemState = lazy(() => import("./pages/admin/SystemState"));

const HomeHOD = lazy(() => import("./pages/HOD/HomeHOD"));
const LecturersHOD = lazy(() => import("./pages/HOD/LecturersHOD"));
const HallsHOD = lazy(() => import("./pages/HOD/HallsHOD"));
const ReviewRequests = lazy(() => import("./pages/HOD/ReviewRequestsHOD"));
const SudentsGroups = lazy(() => import("./pages/HOD/StudentsGroupsHOD"));
const Courses = lazy(() => import("./pages/HOD/CoursesHOD"));
const CreateTable = lazy(() => import("./pages/HOD/CreateTableHOD"));

const HomeSecretary = lazy(() => import("./pages/secretary/HomeSecretary"));
const CreateScheduleSecretary = lazy(() =>
  import("./pages/secretary/CreateScheduleSecretary")
);
const DepartmentsSecretary = lazy(() =>
  import("./pages/secretary/DepartmentsSecretary")
);
const LapsSecretary = lazy(() => import("./pages/secretary/LabsSecretary"));
const LecturersSecretary = lazy(() =>
  import("./pages/secretary/LecturersSecretary")
);
const RequestManagementSecretary = lazy(() =>
  import("./pages/secretary/RequestManagementSecretary")
);

const routerHome = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HomeLayout />}>
      <Route index element={<Home />} />
      <Route path="timetables" element={<SearchTimetable />} />
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
        path="colleges"
        element={<PageLayout />}
        errorElement={<ErrorElement />}
      >
        <Route index element={<Colleges />} />
        <Route path=":College_ID" element={<PageLayout />}>
          <Route index element={<College />} />
          <Route path="department/:Department_ID" element={<Department />} />
        </Route>
      </Route>

      <Route
        path="bulding"
        element={<PageLayout />}
        errorElement={<ErrorElement />}
      >
        <Route index element={<Buldings />} />
        <Route path=":Building_ID" element={<Building />} />
        <Route path="hallType" element={<HallType />} />
      </Route>

      <Route path="timetables" element={<SearchTimetable />} />

      <Route
        path="departements"
        element={<PageLayout />}
        errorElement={<ErrorElement />}
      >
        <Route index element={<Departements />} />
        {/* <Route path=":Department_ID" element={<Department />} /> */}
      </Route>

      <Route path="systemState" element={<SystemState />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

const routerHOD = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HodLayout />}>
      <Route index element={<HomeHOD />} />
      <Route path="lecturers" element={<LecturersHOD />} />
      <Route path="halls" element={<HallsHOD />} />
      <Route path="requests" element={<ReviewRequests />} />
      <Route path="students_groups" element={<SudentsGroups />} />
      <Route path="courses" element={<Courses />} />
      <Route path="create_table" element={<CreateTable />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

const routerSecretary = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<SecretaryLayout />}>
      <Route index element={<HomeSecretary />} />
      <Route path="createTable" element={<CreateScheduleSecretary />} />
      <Route path="halls" element={<LapsSecretary />} />
      <Route path="departments" element={<DepartmentsSecretary />} />
      <Route path="requests" element={<RequestManagementSecretary />} />
      <Route path="lecturers" element={<LecturersSecretary />} />
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
