import { Outlet, redirect, useLoaderData } from "react-router-dom";
import MainNavigation from "./MainNavigation";
import { fetchMe } from "../services/authService";


function RootLayout() {
  const me = useLoaderData()
  console.log(me)

  return (
    <>
      <MainNavigation user={me} />
      <main >
        <Outlet />
      </main>

    </>

  );
}

export default RootLayout;

export async function loader() {

  const me = await fetchMe();

  return me
}