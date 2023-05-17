import { Box, CircularProgress, Divider } from "@mui/material";
import instance from "../../../../../axios";
import Breadcrumb from "app/components/Breadcrumb";
import styled from "@emotion/styled";
import EditContent from "./EditContent";
import { useState } from "react";

export default function EditVerification() {
    const [updateOrCreateFisherman, setUpdateOrCreateFisherman] = useState(false)

    const typeEditForm = {
        method: (dataConfig) => instance.post("/results", dataConfig),
        type: "Editar",
        notificationSuccess: "Editado com sucesso!",
        titleForm: `Adiciona Novo Registro`,
    };
    return (<>
        {updateOrCreateFisherman ? <Box sx={{ display: 'flex', width: 1, justifyContent: "center", alignItems: "center", height: 1 }}>
            <CircularProgress size={55} />
        </Box> : <ContainerRoot>
            <div className="breadcrumb" style={{ marginBottom: "25px" }}>
                <Breadcrumb
                    routeSegments={[
                        {
                            name: "Lista de Apurações",
                            path: "/dashboard/apuracoes",
                        },
                        { lastName: "Editar Apuração" },
                        { name: "Apurações" },
                    ]}
                />
            </div>
            <Divider variant="fullWidth" />
            <EditContent
                typeEditOrCreateForm={typeEditForm}
                updateOrCreateFisherman={updateOrCreateFisherman}
                setUpdateOrCreateFisherman={setUpdateOrCreateFisherman} />
        </ContainerRoot>}
    </>
    );
}

const ContainerRoot = styled("div")(() => ({
    margin: "30px",
}));
