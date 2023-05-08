import Breadcrumb from "app/components/Breadcrumb";
import instance from "../../../../axios";
import React, { useEffect, useMemo, useState } from "react";
import styled from "@emotion/styled";
import TableUtils from "app/utils/TableUtils";
import ButtonActions from "app/utils/ButtonsActions";

export default function AppAnglers() {
    const [allFisherMen, setAllFisherMen] = useState([]);
    const [rowId, setRowId] = useState(null);
    const [modification, setModification] = useState(false);

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
                renderCell: (params) => (
                    <ButtonActions
                        {...{
                            params,
                            rowId,
                            setRowId,
                            modification,
                            setModification,
                        }}
                    />
                ),
                sortable: false,
                filterable: false,
            },
        ],
        [rowId]
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
                setRowId={setRowId}
                setModification={setModification}
            />
        </ContainerRoot>
    );
}

const ContainerRoot = styled("div")(() => ({
    margin: "30px",
}));
