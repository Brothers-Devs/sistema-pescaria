import { useRoutes } from "react-router-dom";
import { MatxTheme } from "./components";
import { SettingsProvider } from "./contexts/SettingsContext";

import routes from "./routes";

const App = () => {
    const content = useRoutes(routes);
    console.log(content);
    return (
        <SettingsProvider>
            <MatxTheme>{content}</MatxTheme>
        </SettingsProvider>
    );
};

export default App;
