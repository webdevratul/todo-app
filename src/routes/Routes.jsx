import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";

// Create a BrowserRouter with routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Render App component for the root route
    children: [
      {
        path: "/", // Child route for the root route
        element: <Home />, // Render Home component for the root route
      },
    ],
  },
]);

export default router;
