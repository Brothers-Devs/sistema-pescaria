import { Divider } from "@mui/material";
import instance from "../../../../axios";
import Breadcrumb from "app/components/Breadcrumb";
import styled from "@emotion/styled";
import FormCreateOrEditFisherman from "./FormCreateOrEditFisherman";

export default function CreateFisherman() {
    const typeCreateForm = {
        method: (dataConfig) => instance.post("/fishermen", dataConfig),
        notificationSuccess: "Cadastrado com sucesso!",
        titleForm: `Adiciona Novo Registro`,
    };
    const valuesInputs = {
        name: "",
        cpf: "",
        phone: "",
        email: "",
        country: "Brasil",
        state: "PA",
        city: "",
    };

    localStorage.removeItem("dataFormFisherMan");
    localStorage.setItem("dataFormFisherMan", JSON.stringify(valuesInputs));
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
            <FormCreateOrEditFisherman typeEditOrCreateForm={typeCreateForm} />
        </ContainerRoot>
    );
}

const ContainerRoot = styled("div")(() => ({
    margin: "30px",
}));
