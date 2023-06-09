import Breadcrumb from "app/components/Breadcrumb";
import instance from "../../../../axios";
import React, { useEffect, useMemo, useState } from "react";
import styled from "@emotion/styled";
import TableUtils from "app/utils/TableUtils";
import ButtonsActions from "./ButtonsActions";

const URL_REPORTS_FISHERMEN = `${process.env.REACT_APP_BASE_URL_REPORTS}/teams`


export default function AppTeams() {
    const [allTeams, setAllTeams] = useState([]);
    const [modification, setModification] = useState(false);
    const [rowSelected, setRowSelected] = useState(false);
    const type = "relatorio-equipes"

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
                field: "type",
                headerName: "Tipo",
                width: 150,
                disableClickEventBubbling: true,
            },
            {
                field: "category",
                headerName: "Categoria",
                width: 400,
                disableClickEventBubbling: true,
                valueGetter: (params) => {
                    return `${params?.row.category.name}`;
                },
            },
            {
                headerName: "Ações",
                width: 90,
                renderCell: (params) => (
                    <ButtonsActions
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
        [rowSelected, modification]
    );

    useEffect(() => {
        const promise = instance.get("/teams");
        promise
            .then((res) => {
                setAllTeams(res.data.data);
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
                        { name: "Lista de Equipes" },
                        { name: "Equipes" },
                    ]}
                />
            </div>

            <TableUtils
                dataContent={allTeams}
                columns={columns}
                setModification={setModification}
                setRowSelected={setRowSelected}
                path="/dashboard/equipes/cadastrar"
                type={type}
                titleToolTip="Cadastrar Equipe"
                title="Baixar Relatório de Equipes"
                linkReports={URL_REPORTS_FISHERMEN}
            />
        </ContainerRoot>
    );
}

const ContainerRoot = styled("div")(() => ({
    margin: "30px",
}));
