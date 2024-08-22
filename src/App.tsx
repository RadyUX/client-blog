
import { createBrowserRouter, RouterProvider
  , Outlet
 } from "react-router-dom"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import "./index.css"
import Write from "./pages/Write";
import Single from "./pages/Single";
import authService from "./service/authService";
import { useEffect } from "react";
const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/write",
        element: <Write/>,
      },
      {
        path: "/post/:id",
        element: <Single/>,
      },
  
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  
]);
function App() {

  
  useEffect(() => {
    testGetCurrentUser();
  }, []);

  function testGetCurrentUser() {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      console.log("Utilisateur :", currentUser.user);
      console.log("isAdmin:", currentUser.decodedToken.isAdmin);
      
      if (currentUser.decodedToken.isAdmin !== undefined) {
        console.log("Statut isAdmin :", currentUser.decodedToken.isAdmin ? "Administrateur" : "Non administrateur");
      } else {
        console.log("Statut isAdmin non défini dans le token.");
      }
    } else {
      console.log("Aucun utilisateur n'est actuellement connecté.");
    }
  }
  return (
    <div className="w-full app ">
      <div className="w-full ">
        <RouterProvider router={router} />
      </div>
    </div>
  )
}

export default App
