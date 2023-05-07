import { Divider } from "@mui/material";

import Breadcrumb from "app/components/Breadcrumb";
import styled from "@emotion/styled";
import FormCreateFisherMan from "./FormFisherMan";

export default function ScreenFishermanRegistry() {
    return (
        <ContainerRoot>
            <div className="breadcrumb" style={{ marginBottom: "25px" }}>
                <Breadcrumb
                    routeSegments={[
                        {
                            name: "Lista de Pescadores",
                            path: "/dashboard/pescadores",
                        },
                        { lastName: "Cadastrar Pescador" },
                        { name: "Pescadores" },
                    ]}
                />
            </div>
            <Divider variant="fullWidth" />
            <FormCreateFisherMan />
        </ContainerRoot>
    );
}

const ContainerRoot = styled("div")(() => ({
    margin: "30px",
}));
