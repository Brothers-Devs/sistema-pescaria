import Breadcrumb from "app/components/Breadcrumb";
import appInstance from "api/appInstance";
import React, { useEffect, useMemo, useState } from "react";
import styled from "@emotion/styled";
import TableUtils from "app/utils/TableUtils";
import ButtonActions from "app/views/screenskit/fishermen/ButtonsActions";

const URL_REPORTS_FISHERMEN = `${process.env.REACT_APP_BASE_URL_REPORTS}/fishermen`;

export default function AppFisherman() {
    const [allFisherMen, setAllFisherMen] = useState([]);
    const [modification, setModification] = useState(false);
    const [rowSelected, setRowSelected] = useState(false);
    const type = "relatorio-pescadores";

    localStorage.setItem(
        "rowSelected",
        rowSelected ? JSON.stringify(rowSelected) : null
    );

    const columns = useMemo(
        () => [
            {
                field: "id",
                headerName: "ID",
                width: 80,
                disableClickEventBubbling: true,
            },
            {
                field: "name",
                headerName: "Nome",
                width: 210,
                disableClickEventBubbling: true,
            },
            {
                field: "team_name",
                headerName: "Equipe",
                width: 150,
                headerAlign: "center",
                align: "center",
                headerClassName: "super-app-theme--header",
                disableClickEventBubbling: true,
                valueGetter: (params) => {
                    if (params?.row?.teams?.length > 0) {
                        return params.row.teams[0].name;
                    }
                    return "SEM EQUIPE";
                },
            },
            {
                field: "cpf",
                headerName: "CPF",
                width: 150,
                disableClickEventBubbling: true,
            },
            {
                field: "phone",
                headerName: "Telefone",
                width: 160,
                disableClickEventBubbling: true,
            },
            {
                field: "city",
                headerName: "Cidade",
                width: 160,
                disableClickEventBubbling: true,
            },
            {
                field: "state",
                headerName: "Estado",
                width: 90,
                disableClickEventBubbling: true,
            },
            {
                headerName: "Ações",
                width: 90,
                renderCell: (params) => (
                    <ButtonActions
                        {...{
                            params,
                            modification,
                            setModification,
                        }}
                    />
                ),

                sortable: false,
                filterable: false,
                disableClickEventBubbling: true,
            },
        ],
        [modification]
    );

    useEffect(() => {
        const promise = appInstance.get("/fishermen");
        promise
            .then((res) => {
                setAllFisherMen(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [modification]);
    return (
        <ContainerRoot>
            <div className="breadcrumb" style={{ marginBottom: "25px" }}>
                <Breadcrumb
                    routeSegments={[
                        { name: "Lista de Pescadores" },
                        { name: "Pescadores" },
                    ]}
                />
            </div>

            <TableUtils
                dataContent={allFisherMen}
                columns={columns}
                setModification={setModification}
                setRowSelected={setRowSelected}
                path="/dashboard/pescadores/cadastrar"
                type={type}
                title="Baixar Relatório de Pescadores"
                linkReports={URL_REPORTS_FISHERMEN}
            />
        </ContainerRoot>
    );
}

const ContainerRoot = styled("div")(() => ({
    margin: "30px",
}));
