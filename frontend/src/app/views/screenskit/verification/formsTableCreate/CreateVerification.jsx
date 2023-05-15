import { Divider } from "@mui/material";
import instance from "../../../../../axios";
import Breadcrumb from "app/components/Breadcrumb";
import styled from "@emotion/styled";
import CreationContent from "./CreationContent";

export default function CreateVerification() {
    const typeCreateForm = {
        method: (dataConfig) => instance.post("/fishermen", dataConfig),
        type: "cadastro",
        notificationSuccess: "Cadastrado com sucesso!",
        titleForm: `Adiciona Novo Registro`,
    };
    return (
        <ContainerRoot>
            <div className="breadcrumb" style={{ marginBottom: "25px" }}>
                <Breadcrumb
                    routeSegments={[
                        {
                            name: "Lista de Apurações",
                            path: "/dashboard/apuracoes",
                        },
                        { lastName: "Cadastrar Apuração" },
                        { name: "Apurações" },
                    ]}
                />
            </div>
            <Divider variant="fullWidth" />
            <CreationContent typeEditOrCreateForm={typeCreateForm} />
        </ContainerRoot>
    );
}

const ContainerRoot = styled("div")(() => ({
    margin: "30px",
}));
