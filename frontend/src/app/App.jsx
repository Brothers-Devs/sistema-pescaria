import { useRoutes } from "react-router-dom";
import { MatxTheme } from "./components";
import { SettingsProvider } from "./contexts/SettingsContext";

import routes from "./routes";
import Notiflix from "notiflix";

const App = () => {
    const content = useRoutes(routes);
    return (
        <SettingsProvider>
            <MatxTheme>{content}</MatxTheme>
        </SettingsProvider>
    );
};

Notiflix.Notify.init({
    width: "350px",
    position: "right-top",
    distance: "10px",
    opacity: 1,
    borderRadius: "5px",
    rtl: false,
    timeout: 3000,
    messageMaxLength: 900,
    backOverlay: false,
    backOverlayColor: "rgba(0,0,0,0.5)",
    plainText: true,
    showOnlyTheLastOne: false,
    clickToClose: true,
    pauseOnHover: true,
    ID: "NotiflixNotify",
    className: "notiflix-notify",
    zindex: 4001,
    fontFamily: "Quicksand",
    fontSize: "13px",
    cssAnimation: true,
    cssAnimationDuration: 400,
    cssAnimationStyle: "fade",
    closeButton: true,
    useIcon: true,
    useFontAwesome: false,
    fontAwesomeIconStyle: "basic",
    fontAwesomeIconSize: "34px",
    failure: {
        background: "#ff5549",
        textColor: "#fff",
        childClassName: "notiflix-notify-failure",
        notiflixIconColor: "rgba(0,0,0,0.2)",
        fontAwesomeClassName: "fas fa-times-circle",
        fontAwesomeIconColor: "rgba(0,0,0,0.2)",
        backOverlayColor: "rgba(255,85,73,0.2)",
    },
});

export default App;
