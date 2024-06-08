import { useParams } from "react-router-dom";
import appInstance from "api/appInstance";
import styled from "@emotion/styled";
import Breadcrumb from "app/components/Breadcrumb";
import { useEffect, useState } from "react";
import { Divider } from "@mui/material";
import FormCreateOrEditFisherman from "./FormCreateOrEditFisherman";

export default function EditFisherman() {
    const { id } = useParams();
    const [dataFisherMan, setDataFisherMan] = useState(null);
    const typeEditForm = {
        method: (dataConfig) => appInstance.put(`/fishermen/${id}`, dataConfig),
        notificationSuccess: "Atualizado com sucesso!",
        titleForm: `Registro Nº ${id} - ${dataFisherMan?.name}`,
    };

    useEffect(() => {
        const promise = appInstance.get(`/fishermen/${id}`);
        promise
            .then((res) => {
                localStorage.setItem(
                    "dataFormFisherMan",
                    JSON.stringify(res.data.data)
                );
                setDataFisherMan(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    return (
        <>
            {dataFisherMan ? (
                <ContainerRoot>
                    <div
                        className="breadcrumb"
                        style={{ marginBottom: "25px" }}
                    >
                        <Breadcrumb
                            routeSegments={[
                                {
                                    name: "Lista de Pescadores",
                                    path: "/dashboard/pescadores",
                                },
                                { lastName: "Editar Pescador" },
                                { name: "Pescadores" },
                            ]}
                        />
                    </div>
                    <Divider variant="fullWidth" />
                    <FormCreateOrEditFisherman
                        typeEditOrCreateForm={typeEditForm}
                    />
                </ContainerRoot>
            ) : null}
        </>
    );
}

const ContainerRoot = styled("div")(() => ({
    margin: "30px",
}));
