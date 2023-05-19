import styled from "@emotion/styled";
import { Divider } from "@mui/material";
import Breadcrumb from "app/components/Breadcrumb";
import FormIndividual from "./FormIndividual";

export default function AppReportsIndividual() {
    return (<ContainerRoot>
        <div className="breadcrumb" style={{ marginBottom: "25px" }}>
            <Breadcrumb
                routeSegments={[
                    { name: "Resultados" },
                    { lastName: "Classificação Final Individual" },
                    { name: "Relatórios" },
                ]}
            />
        </div>
        <Divider variant="fullWidth" />
        <FormIndividual />
    </ContainerRoot>)
}

const ContainerRoot = styled("div")(() => ({
    margin: "30px",
}));
