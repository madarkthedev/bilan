import Login from "./roots/Login";

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  useNavigate,
  Navigate,


} from "react-router-dom";


import RootLayout, { loader as loginLoader } from "./components/RootLayout";
import AddUser, { action as addUserAction } from "./roots/AddUser";
import EditUser, { action as editAction, loader as editLoader } from "./roots/EditUser";
import DeleteUser, { action as deleteUserAction } from "./roots/DeleteUser";
import ErrorPage from "./roots/ErrorPage";
import Users, { loader as usersLoader } from "./roots/Users";


export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Login />} errorElement={<ErrorPage />} />
        <Route path="/root" element={<RootLayout />} loader={loginLoader} errorElement={<ErrorPage />}  >
          <Route path="users" element={<Users />} loader={usersLoader}  errorElement={<ErrorPage />} />
          <Route path="users/add" element={<AddUser />} action={addUserAction} errorElement={<ErrorPage />} />
          <Route path="users/:id" element={<EditUser />} loader={editLoader} action={editAction} errorElement={<ErrorPage />} />
          <Route path="users/delete/:id" element={<DeleteUser />} action={deleteUserAction} />
        </Route>
      </>


    )
  );
  return (<> <RouterProvider router={router} />

  </>)
}
