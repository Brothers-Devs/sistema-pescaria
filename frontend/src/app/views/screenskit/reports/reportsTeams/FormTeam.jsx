import { Box, Button, Divider, Tooltip, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { useEffect, useMemo, useState } from "react";
import { FcPrint } from "react-icons/fc";
import instance from "../../../../../axios";
import TableTeams from "./TableTeams";
import { Link } from "react-router-dom";
import Notiflix from "notiflix";

function CellNames({ params }) {
    return (
        <Box
            sx={{
                display: "flex",
                width: 1,
                flexDirection: "column",
                justifyContent: "center",
            }}
        >
            {params.formattedValue.map((value, i) => {
                return (
                    <li style={{ listStyle: "none" }} key={i}>
                        {value.name}
                    </li>
                );
            })}
        </Box>
    );
}

export default function FormTeam() {
    const [resultsCategories, setResultsCategories] = useState([]);

    const addRatingToResults = resultsCategories?.map((result, i) => {
        return {
            classification: `${i + 1}º`,
            ...result,
            fishermen: result?.fishermen.map((fisherman, i) => {
                return {
                    name: `${i + 1} - ${fisherman.name} (N°${fisherman.id})`,
                };
            }),
            name: `${result.name} (N° ${result.id})`,
        };
    });

    useEffect(() => {
        // MUDAR A URL PARA CHAMADA DE RELATÓRIOS FINAL POR EQUIPE
        const promise = instance.get(`/results/teams-ranking`);
        promise
            .then((res) => {
                const resultCategorie = res.data;
                setResultsCategories(resultCategorie);
            })
            .catch((err) => {
                Notiflix.Notify.failure(
                    "Ocorreu um erro ao tentar carregar o relatório dessa categoria!"
                );
                console.log(err.response);
            });
    }, []);

    const columns = useMemo(
        () => [
            {
                field: "classification",
                headerName: "Class.°",
                width: 100,
                align: "center",
                headerAlign: "center",
                sortable: false,
                disableClickEventBubbling: true,
                headerClassName: "super-app-theme--header",
            },
            {
                field: "name",
                headerName: "Equipe",
                align: "center",
                width: 200,
                headerAlign: "center",
                sortable: false,
                headerClassName: "super-app-theme--header",
                disableClickEventBubbling: true,
            },
            {
                field: "fishermen",
                headerName: "Pescadores",
                width: 400,
                align: "center",
                disableClickEventBubbling: true,
                headerClassName: "super-app-theme--header",
                headerAlign: "center",
                sortable: false,
                renderCell: (params) => (
                    <CellNames
                        {...{
                            params,
                        }}
                    />
                ),
            },
            {
                field: "total_points",
                headerName: "Pontuação",
                flex: 1,
                headerAlign: "center",
                align: "center",
                headerClassName: "super-app-theme--header",
                disableClickEventBubbling: true,
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
                        Classificação final por equipes
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
                            <Tooltip title="Baixar Relatório Classificação Final por Equipes">
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

                    <TableTeams
                        dataContent={addRatingToResults}
                        columns={columns}
                        nameClass="style-rows"
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
