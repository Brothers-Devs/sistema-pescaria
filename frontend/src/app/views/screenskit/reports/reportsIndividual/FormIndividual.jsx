import { Box, Button, Divider, Tooltip, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { useEffect, useMemo, useState } from "react";
import instance from "../../../../../axios";
import { FcPrint } from "react-icons/fc";
import TableIndividual from "./TableIndividual";
import { Link } from "react-router-dom";

export default function FormIndividual() {
    const [resultsCategories, setResultsCategories] = useState([]);

    const addRatingToResults = resultsCategories?.map((result, i) => {
        return {
            ...result,
            city_state: `${result.city}/${result.state}`,
            id: `${i + 1}º`,
        };
    });

    useEffect(() => {
        // MUDAR A URL PARA CHAMADA DE RELATÓRIOS INDIVIDUAL POR EQUIPE
        const promise = instance.get(`/results/individual-ranking`);
        promise
            .then((res) => {
                const resultCategorie = res.data;
                setResultsCategories(resultCategorie);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, []);

    const columns = useMemo(
        () => [
            {
                field: "id",
                headerName: "Class.°",
                width: 100,
                sortable: false,
                disableClickEventBubbling: true,
                headerClassName: "super-app-theme--header",
                headerAlign: "center",
                align: "center",
            },
            {
                field: "name",
                headerName: "Pescador",
                width: 300,
                headerAlign: "center",
                align: "center",
                disableClickEventBubbling: true,
                sortable: false,
                headerClassName: "super-app-theme--header",
            },
            {
                field: "team_name",
                headerName: "Equipe",
                width: 150,
                headerAlign: "center",
                align: "center",
                sortable: false,
                headerClassName: "super-app-theme--header",
                disableClickEventBubbling: true,
            },
            {
                field: "city_state",
                headerName: "Cidade",
                width: 400,
                disableClickEventBubbling: true,
                flex: 1,
                headerClassName: "super-app-theme--header",
                headerAlign: "center",
                align: "center",
                sortable: false,
            },
            {
                field: "size",
                headerName: "Comprimento (cm)",
                flex: 1,
                headerClassName: "super-app-theme--header",
                disableClickEventBubbling: true,
                headerAlign: "center",
                align: "center",
                rowAlign: "center",
                sortable: false,
            },
        ],
        []
    );

    return (
        <>
            <FormDetailsTeam>
                <Box
                    sx={{
                        paddingTop: 3,
                        paddingLeft: 3,
                        display: "flex",
                        textAlign: "center",
                        width: 1,
                        marginBottom: 3,
                    }}
                >
                    <Typography variant="h6">
                        Classificação final individual maior peixe
                    </Typography>
                </Box>
                <Divider variant="fullWidth" />
                <>
                    <Box
                        sx={{
                            display: "flex",
                            width: 1,
                            justifyContent: "flex-end",
                            pr: 6,
                            mb: 3,
                            mt: 3,
                        }}
                    >
                        {/* // MUDAR O LINK DE DOWNLOAD DO RELATÓRIO */}
                        <Link to={""} target="_blank">
                            <Tooltip title="Baixar Relatório Classificação Final Individual">
                                <Button size="large" variant="contained">
                                    <FcPrint size={30} />
                                    <Typography
                                        variant="subtitle1"
                                        sx={{ ml: 1 }}
                                    >
                                        Download (.pdf)
                                    </Typography>
                                </Button>
                            </Tooltip>
                        </Link>
                    </Box>

                    <TableIndividual
                        dataContent={addRatingToResults}
                        columns={columns}
                    />
                </>
            </FormDetailsTeam>
        </>
    );
}

const FormDetailsTeam = styled("form")(() => ({
    marginTop: "10px",
    background: "#FFFFFF",
    zIndex: 90,
    width: "100%",
    height: 280,
    boxSizing: "border-box",
    boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
    borderRadius: "5px",
}));
