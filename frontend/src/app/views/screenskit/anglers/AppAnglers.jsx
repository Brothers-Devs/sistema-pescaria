import Breadcrumb from "app/components/Breadcrumb";
import instance from "../../../../axios";
import React, { useEffect, useMemo, useState } from "react";
import styled from "@emotion/styled";
import TableUtils from "app/utils/TableUtils";
import ButtonActions from "app/utils/ButtonsActions";

export default function AppTournaments() {
    const [allFisherMen, setAllFisherMen] = useState([]);
    const [edit, setEdit] = useState(false);
    const [deleteRow, setDeleteRow] = useState(false);

    const columns = useMemo(
        () => [
            { field: "id", headerName: "ID", width: 80 },
            { field: "name", headerName: "Nome", width: 210 },
            { field: "cpf", headerName: "CPF", width: 150 },
            { field: "phone", headerName: "Telefone", width: 160 },
            { field: "city", headerName: "Cidade", width: 160 },
            { field: "state", headerName: "Estado", width: 90 },
            {
                headerName: "Ações",
                width: 90,
                renderCell: () => (
                    <ButtonActions
                        edit={edit}
                        setEdit={setEdit}
                        deleteRow={deleteRow}
                        setDeleteRow={setDeleteRow}
                    />
                ),
                sortable: false,
                filterable: false,
            },
        ],
        []
    );

    useEffect(() => {
        const promise = instance.get("/fishermen");
        promise
            .then((res) => {
                setAllFisherMen(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    console.log(allFisherMen);
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

            <TableUtils dataContent={allFisherMen} columns={columns} />
        </ContainerRoot>
    );
}

const ContainerRoot = styled("div")(() => ({
    margin: "30px",
}));
