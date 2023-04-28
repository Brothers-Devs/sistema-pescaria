import { Navigate } from "react-router-dom";
import MatxLayout from "./components/MatxLayout/MatxLayout";
import dashboardRoutes from "./views/dashboard/DashboardRoutes";

const routes = [
    {
        element: <MatxLayout />,
        children: [...dashboardRoutes],
    },
    { path: "/", element: <Navigate to="dashboard/default" /> },
    // { path: "*", element: <NotFound /> },
];

export default routes;
