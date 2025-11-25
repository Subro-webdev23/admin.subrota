import { createBrowserRouter } from "react-router";
import Root from "./layout/Root";
import AddProject from "./pages/AddProject";
import Dashboard from "./pages/Dashboard";
import AllProjects from "./pages/AllProjects";
import SignIn from "./pages/SignIn";

export const router = createBrowserRouter([
    {
        path: "/auth",
        element: <SignIn />,
    },
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
                element: <AllProjects />,
            },
            {
                index: true,
                element: <Dashboard />,
            },
        ],
    },
]);