import { createBrowserRouter } from "react-router";
import Root from "./layout/Root";
import AddProject from "./pages/AddProject";
import Dashboard from "./pages/Dashboard";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "dashboard",
                element: <Dashboard />,
            },
            {
                path: "addProject",
                element: <AddProject />,
            },
            {
                path: "allProject",
                element: <h1>All Projects Page</h1>,
            },
            {
                index: true,
                element: <Dashboard />,
            },
        ],
    },
]);