import { useNavigate, useParams } from "react-router-dom";
import appInstance from "api/appInstance";
import styled from "@emotion/styled";
import Breadcrumb from "app/components/Breadcrumb";
import { useEffect, useState } from "react";
import { Divider } from "@mui/material";
import FormTeam from "./forms/FormTeam";
import FormSelectFishermen from "./forms/FormSelectFishermen";
import Notiflix from "notiflix";

export default function EditTeam() {
    const { id } = useParams();
    const [valuesInputs, setValuesInputs] = useState(null);
    const navigate = useNavigate();

    const typeEditForm = {
        method: (dataConfig) => appInstance.put(`/teams/${id}`, dataConfig),
        notificationSuccess: "Atualizado com sucesso!",
        type: "editar",
        titleForm: `Registro Nº ${id} - ${valuesInputs?.name}`,
    };

    useEffect(() => {
        const promise = appInstance.get(`/teams/${id}`);
        promise
            .then((res) => {
                const detailsAllTeam = res.data.data;
                localStorage.setItem(
                    "dataFormTeam",
                    JSON.stringify(detailsAllTeam)
                );
                const fishermenTransform = detailsAllTeam?.fishermen.map(
                    (fisherman) => {
                        return {
                            id: fisherman.id,
                            name: `${fisherman.id} - ${fisherman.name} (${fisherman.cpf})`,
                        };
                    }
                );

                setValuesInputs({
                    ...detailsAllTeam,
                    fishermen: fishermenTransform,
                });
            })
            .catch((error) => {
                Notiflix.Notify.failure("Registro não encontrado!");
                navigate("/dashboard/equipes");
                console.log(error.response);
            });
    }, [id, navigate]);

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
                    <FormTeam
                        typeEditOrCreateForm={typeEditForm}
                        valuesInputs={valuesInputs}
                        setValuesInputs={setValuesInputs}
                    />
                    <FormSelectFishermen
                        typeEditOrCreateForm={typeEditForm}
                        valuesInputs={valuesInputs}
                        setValuesInputs={setValuesInputs}
                    />
                </ContainerRoot>
            ) : null}
        </>
    );
}

const ContainerRoot = styled("div")(() => ({
    margin: "30px",
}));
