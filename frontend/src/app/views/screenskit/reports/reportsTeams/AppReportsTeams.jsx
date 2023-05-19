import styled from "@emotion/styled";
import { Divider } from "@mui/material";
import Breadcrumb from "app/components/Breadcrumb";
import FormTeam from "./FormTeam";

export default function AppReportsTeams() {
    return (<ContainerRoot>
        <div className="breadcrumb" style={{ marginBottom: "25px" }}>
            <Breadcrumb
                routeSegments={[
                    { name: "Resultados" },
                    { lastName: "Classificação Final Por Equipes" },
                    { name: "Relatórios" },
                ]}
            />
        </div>
        <Divider variant="fullWidth" />
        <FormTeam />
    </ContainerRoot>)
}

const ContainerRoot = styled("div")(() => ({
    margin: "30px",
}));
