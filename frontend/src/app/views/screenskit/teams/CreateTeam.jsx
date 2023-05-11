import { Divider } from "@mui/material";
import instance from "../../../../axios";
import Breadcrumb from "app/components/Breadcrumb";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import FormTeam from "./forms/FormTeam";
import FormSelectFishermen from "./forms/FormSelectFishermen";

export default function CreateTeam() {
    const [valuesInputs, setValuesInputs] = useState({
        tournament_id: 1,
        name: "",
        type: "",
        category_id: "",
        fishermen: [],
    });
    const [fishermenAvailable, setFishermenAvailable] = useState()

    useEffect(() => {
        const promise = instance.get("/fishermen/available")
        promise.then((res) => {
            let dataFishermenAvailable = res.data.data
            setFishermenAvailable(dataFishermenAvailable)
        }).catch((error) => {
            console.log(error)
        })


    }, [])

    const typeCreateForm = {
        method: (dataConfig) => instance.post("/teams", dataConfig),
        notificationSuccess: "Equipe cadastrada com sucesso!",
        titleForm: `Detalhes da Equipe`,
    };

    localStorage.removeItem("dataFormTeam");
    localStorage.setItem("dataFormTeam", JSON.stringify(valuesInputs));
    return (
        <ContainerRoot>
            <div className="breadcrumb" style={{ marginBottom: "25px" }}>
                <Breadcrumb
                    routeSegments={[
                        {
                            name: "Lista de Equipes",
                            path: "/dashboard/equipes",
                        },
                        { lastName: "Cadastrar Equipe" },
                        { name: "Equipes" },
                    ]}
                />
            </div>
            <Divider variant="fullWidth" />
            <FormTeam typeEditOrCreateForm={typeCreateForm} valuesInputs={valuesInputs} setValuesInputs={setValuesInputs} />
            <FormSelectFishermen
                typeEditOrCreateForm={typeCreateForm}
                valuesInputs={valuesInputs}
                setValuesInputs={setValuesInputs}
                fishermenAvailable={fishermenAvailable} />
        </ContainerRoot>
    );
}

const ContainerRoot = styled("div")(() => ({
    margin: "30px",
}));
