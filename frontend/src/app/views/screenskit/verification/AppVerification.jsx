import Breadcrumb from "app/components/Breadcrumb";
import appInstance from "api/appInstance";
import React, { useEffect, useMemo, useState } from "react";
import styled from "@emotion/styled";
import TableUtils from "app/utils/TableUtils";
import ButtonsActions from "./ButtonsActions";

export default function AppVerification() {
    const [results, setResults] = useState(null);
    const [modificationVerification, setModificationVerification] =
        useState(false);

    const [rowSelected, setRowSelected] = useState(false);

    localStorage.setItem(
        "rowSelected",
        rowSelected ? JSON.stringify(rowSelected) : null
    );

    const columns = useMemo(
        () => [
            {
                field: "id",
                headerName: "Resultado Nº",
                width: 120,
                disableClickEventBubbling: true,
            },
            {
                field: "team_id",
                headerName: "Equipe Nº",
                width: 110,
                disableClickEventBubbling: true,
            },
            {
                field: "name",
                headerName: "Nome",
                width: 200,
                disableClickEventBubbling: true,
                valueGetter: (params) => {
                    return `${params?.row.team.name}`;
                },
            },
            {
                field: "total_points",
                headerName: "Pontos",
                width: 130,
                disableClickEventBubbling: true,
            },
            {
                headerName: "Ações",
                width: 90,
                flex: 1,
                renderCell: (params) => (
                    <ButtonsActions
                        {...{
                            params,
                            modificationVerification,
                            setModificationVerification,
                        }}
                    />
                ),

                sortable: false,
                filterable: false,
                disableClickEventBubbling: true,
            },
        ],
        [modificationVerification]
    );

    useEffect(() => {
        const promise = appInstance.get("/results");
        promise
            .then((res) => {
                setResults(res.data.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, [modificationVerification]);
    return (
        <ContainerRoot>
            <div className="breadcrumb" style={{ marginBottom: "25px" }}>
                <Breadcrumb
                    routeSegments={[
                        { name: "Lista de Apurações" },
                        { name: "Apurações" },
                    ]}
                />
            </div>
            {results ? (
                <TableUtils
                    dataContent={results}
                    columns={columns}
                    setModification={setModificationVerification}
                    setRowSelected={setRowSelected}
                    path="/dashboard/apuracoes/cadastrar"
                    titleToolTip="Cadastrar Apuração"
                />
            ) : null}
        </ContainerRoot>
    );
}

const ContainerRoot = styled("div")(() => ({
    margin: "30px",
}));
