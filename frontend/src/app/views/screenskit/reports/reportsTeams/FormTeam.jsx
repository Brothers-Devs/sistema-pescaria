import {
    Box,
    Button,
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Tooltip,
    Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import { useEffect, useMemo, useState } from "react";
import { FcPrint } from "react-icons/fc";
import appInstance from "api/appInstance";
import TableTeams from "./TableTeams";
import { Link } from "react-router-dom";
import Notiflix from "notiflix";
import CircularProgress from "@mui/material/CircularProgress";

const types = [
    {
        "id": 0,
        "name": "GERAL",
        "description": "GERAL",
    },
    {
        "id": 1,
        "name": "DUPLA",
        "description": "EQUIPE DUPLA",
    },
    {
        "id": 2,
        "name": "TRIO",
        "description": "EQUIPE TRIO",
    }
];

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
    const [alterCategory, setAlterCategory] = useState(false)
    const [resultsCategories, setResultsCategories] = useState([])
    const [valuesInputs, setValuesInputs] = useState({
        tournament_id: 1,
        category: "",
        type: "",
    });
    const [loading, setLoading] = useState(false);

    let filter = "";
    if (valuesInputs.type?.name && valuesInputs.type.name !== "GERAL") {
        filter = `?type=${valuesInputs.type.name}`;
    }

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

    const fetchTeamRanking = async (type) => {
        try {
            setLoading(true);
            const {data} = await appInstance.get(`/results/teams-ranking${filter}`);
            setResultsCategories(data);
        } catch (err) {
            const errorMessage = err.response?.status === 422
                ? err.response.data.message
                : "Ocorreu um erro ao tentar carregar o relatório de classificação!";
            Notiflix.Notify.failure(errorMessage);
            console.log(err.response);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (valuesInputs.type) {
            fetchTeamRanking(valuesInputs.type);
        }
    }, [alterCategory]);

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

    function handleOnChange(value, key) {
        if (key === "type") {
            setAlterCategory(!alterCategory)
            setValuesInputs({ ...valuesInputs, [key]: { name: value } });
        }
    }

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
                        Classificação final de equipes
                    </Typography>
                </Box>
                <Divider variant="fullWidth" />

                <Box
                    sx={{
                        marginTop: 3,
                        paddingLeft: 6,
                        width: 500,
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column"
                    }}
                >
                    <Typography variant="subtitle1" sx={{mb: 2}}>Selecione o tipo de classificação</Typography>
                    <FormControl required sx={{width: 400}}>
                        <InputLabel id="types">Tipo</InputLabel>
                        <Select
                            labelId="types"
                            id="select-type"
                            label="Tipos"
                            value={valuesInputs?.type !== "" ? valuesInputs.type.name : ""}
                            onChange={(e) =>
                                handleOnChange(e.target.value, "type")
                            }
                        >
                            {types.map((type) => (
                                <MenuItem key={type.name} value={type.name}>
                                    {type.description}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                {valuesInputs.type !== "" ?
                    <>
                        <Box sx={{display: "flex", width: 1, justifyContent: "flex-end", pr: 6, mb: 3, mt: 3}}>
                            <Link
                                to={`${process.env.REACT_APP_BASE_URL_REPORTS}/teams-ranking${filter}`}
                                target="_blank">
                                <Tooltip
                                    title="Baixar Relatório de Classificação">
                                    <Button size="large" variant="contained">
                                        <FcPrint size={30}/>
                                        <Typography variant="subtitle1" sx={{ml: 1}}>Download (.pdf)</Typography>
                                    </Button>
                                </Tooltip>
                            </Link>
                        </Box>

                        {loading ? (
                            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4}}>
                                <CircularProgress/>
                                <Typography variant="subtitle1" sx={{mt: 2}}>
                                    Carregando...
                                </Typography>
                            </Box>
                        ) : (
                            <TableTeams
                                dataContent={resultsCategories}
                                columns={columns}
                                nameClass="style-rows"
                            />
                        )}

                    </> : null}
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
