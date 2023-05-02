import { useRoutes } from "react-router-dom";
import { MatxTheme } from "./components";
import { SettingsProvider } from "./contexts/SettingsContext";

import routes from "./routes";

{
    /* <bra>
    <Routes>
        <Route path:"/home"  element: <Home />/>
    </Routes>
</bra>; */
}

const App = () => {
    const content = useRoutes(routes);
    return (
        <SettingsProvider>
            <MatxTheme>{content}</MatxTheme>
        </SettingsProvider>
    );
};

export default App;
