import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home/Home";
import Menu from "./pages/Menu/Menu";
import About from "./pages/About/About";
import RootLayout from "./pages/RootLayout";
import NotFound from "./pages/NotFound/NotFound";

const router = createBrowserRouter([
    {
    path: "/",
    element: <RootLayout />,
    children:[  {
    path: "/",
    element: <Home />,
  },
  {
    path: "menu",
    element: <Menu />,
  },
  {
    path: "about",
    element: <About />,
  },
  {
    path:"*",
    element:<NotFound />
  }
] },

]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
