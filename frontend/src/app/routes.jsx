import { Navigate } from "react-router-dom";
import MatxLayout from "./components/MatxLayout/MatxLayout";
import dashboardRoutes from "./views/dashboard/DashboardRoutes";
import materialRoutes from "./views/screenskit/MaterialRoutes";

const routes = [
    {
        element: <MatxLayout />,
        children: [...dashboardRoutes, ...materialRoutes],
    },
    { path: "/", element: <Navigate to="/dashboard/inicio" /> },
    // { path: "*", element: <NotFound /> },
];

export default routes;
