import { useParams } from "react-router-dom";
import instance from "../../../../axios";
import styled from "@emotion/styled";
import Breadcrumb from "app/components/Breadcrumb";
import { useEffect, useRef, useState } from "react";
import { Divider } from "@mui/material";
import FormTeam from "./forms/FormTeam";
import FormSelectFishermen from "./forms/FormSelectFishermen";

export default function EditTeam() {
    const { id } = useParams();
    const [valuesInputs, setValuesInputs] = useState(null);

    const typeEditForm = {
        method: (dataConfig) => instance.put(`/teams/${id}`, dataConfig),
        notificationSuccess: "Atualizado com sucesso!",
        type: "editar",
        titleForm: `Registro Nº ${id} - ${valuesInputs?.name}`,
    };

    useEffect(() => {
        const promise = instance.get(`/teams/${id}`);
        promise
            .then((res) => {
                const detailsAllTeam = res.data.data
                localStorage.setItem(
                    "dataFormTeam",
                    JSON.stringify(detailsAllTeam)

                );
                const fishermenTransform = detailsAllTeam?.fishermen.map(fisherman => {
                    return { id: fisherman.id, name: `${fisherman.id} - ${fisherman.name} (${fisherman.cpf})` }
                });

                setValuesInputs({ ...detailsAllTeam, fishermen: fishermenTransform })

            })
            .catch((error) => {
                console.log(error.response);
            });
    }, []);

    return (
        <>
            {valuesInputs ? (
                <ContainerRoot>
                    <div
                        className="breadcrumb"
                        style={{ marginBottom: "25px" }}
                    >
                        <Breadcrumb
                            routeSegments={[
                                {
                                    name: "Lista de Equipes",
                                    path: "/dashboard/equipes",
                                },
                                { lastName: "Editar Equipe" },
                                { name: "Equipes" },
                            ]}
                        />
                    </div>
                    <Divider variant="fullWidth" />
                    <FormTeam typeEditOrCreateForm={typeEditForm} valuesInputs={valuesInputs} setValuesInputs={setValuesInputs} />
                    <FormSelectFishermen
                        typeEditOrCreateForm={typeEditForm}
                        valuesInputs={valuesInputs}
                        setValuesInputs={setValuesInputs}
                        detailsTeam={valuesInputs}
                    />
                </ContainerRoot>
            ) : null}
        </>
    );
}

const ContainerRoot = styled("div")(() => ({
    margin: "30px",
}));
