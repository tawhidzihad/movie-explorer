import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import MovieListing from "./pages/MovieListing";

const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        children: [
            {
                index: true,
                Component: Home,
            }
        ]
    },
    {
        path: "/movies",
        Component: MovieListing
    }
]);

function Router() {
    return (
        <RouterProvider router={router} />
    )
}

export default Router
