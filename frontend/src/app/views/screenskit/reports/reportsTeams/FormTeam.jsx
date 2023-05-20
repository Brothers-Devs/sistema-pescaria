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
import instance from "../../../../../axios"
import TableTeams from "./TableTeams";
import { Link } from "react-router-dom";
import Notiflix from "notiflix";
const categorys = [
    {
        "id": 1,
        "name": "Categoria Especial - Modalidade Arremesso",
    },
    {
        "id": 2,
        "name": "Categoria Comum - Modalidade Arremesso e Corrico",

    }
];

const URL_REPORTS_CATEGORY1 = `${process.env.REACT_APP_BASE_URL_REPORTS}/categories/1`
const URL_REPORTS_CATEGORY2 = `${process.env.REACT_APP_BASE_URL_REPORTS}/categories/2`


function CellNames({ params }) {
    return <Box sx={{ display: "flex", width: 1, flexDirection: "column", justifyContent: "center" }}>
        {params.formattedValue.map((value, i) => {
            return <li style={{ listStyle: "none" }} key={i}>{value.name}</li>
        })}
    </Box>
}



export default function FormTeam() {
    const [alterCategory, setAlterCategory] = useState(false)
    const [resultsCategories, setResultsCategories] = useState([])
    const [valuesInputs, setValuesInputs] = useState({
        tournament_id: 1,
        category: "",
    });

    const addRatingToResults = resultsCategories?.map((result, i) => {
        return {
            classification: `${i + 1}º`,
            ...result,
            fishermen: result?.fishermen.map((fisherman, i) => { return { name: `${i + 1} - ${fisherman.name} (N°${fisherman.id})` } }),
            name: `${result.name} (N° ${result.id})`
        }
    })

    useEffect(() => {
        if (valuesInputs.category !== "") {
            const promise = instance.get(`/results/categories/${valuesInputs.category?.id}`)
            promise.then((res) => {
                const resultCategorie = res.data
                setResultsCategories(resultCategorie)
            }).catch((err) => {
                Notiflix.Notify.failure("Ocorreu um erro ao tentar carregar o relatório dessa categoria!")
                console.log(err.response)
            })
        }
    }, [alterCategory])

    const columns = useMemo(
        () => [
            {
                field: "classification",
                headerName: "Class.°",
                width: 100,
                align: "center",
                headerAlign: 'center',
                sortable: false,
                disableClickEventBubbling: true,
                headerClassName: 'super-app-theme--header',
            },
            {
                field: "name",
                headerName: "Equipe",
                align: "center",
                width: 200,
                headerAlign: 'center',
                sortable: false,
                headerClassName: 'super-app-theme--header',
                disableClickEventBubbling: true,

            },
            {
                field: "fishermen",
                headerName: "Pescadores",
                width: 400,
                align: "center",
                disableClickEventBubbling: true,
                headerClassName: 'super-app-theme--header',
                headerAlign: 'center',
                sortable: false,
                renderCell: (params) => (
                    <CellNames {...{
                        params
                    }} />
                ),
            },
            {
                field: "total_points",
                headerName: "Pontuação",
                flex: 1,
                headerAlign: 'center',
                align: "center",
                headerClassName: 'super-app-theme--header',
                disableClickEventBubbling: true,
                sortable: false
            },

        ],
        []
    );
    function handleOnChange(value, key) {
        if (key === "category") {
            if (value === "Categoria Especial - Modalidade Arremesso") {
                setAlterCategory(!alterCategory)
                setValuesInputs({ ...valuesInputs, [key]: { id: 1, name: value } });
            } else {
                setAlterCategory(!alterCategory)
                setValuesInputs({ ...valuesInputs, [key]: { id: 2, name: value } });
            }
        }
    }

    return (
        <>
            <FormDetailsTeam >
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
                    <Typography variant="subtitle1" sx={{ mb: 2 }}>Selecione a categoria</Typography>
                    <FormControl required sx={{ width: 400 }}>
                        <InputLabel id="category">Categoria</InputLabel>
                        <Select
                            labelId="category"
                            id="select-category"
                            label="Categoria"
                            value={valuesInputs?.category !== "" ? valuesInputs.category.name : ""}
                            onChange={(e) =>
                                handleOnChange(e.target.value, "category")
                            }
                        >
                            {categorys.map((category) => (
                                <MenuItem key={category.name} value={category.name}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                {valuesInputs.category !== "" ?
                    <>
                        <Box sx={{ display: "flex", width: 1, justifyContent: "flex-end", pr: 6, mb: 3 }}>
                            <Link to={valuesInputs.category?.id === 1 ? URL_REPORTS_CATEGORY1 : URL_REPORTS_CATEGORY2} target="_blank">
                                <Tooltip title={valuesInputs.category?.id === 1 ? "Baixar Relatório Categoria Especial" : "Baixar Relatório Categoria Comum"}>
                                    <Button size="large" variant="contained">
                                        <FcPrint size={30} />
                                        <Typography variant="subtitle1" sx={{ ml: 1 }}>Download (.pdf)</Typography>
                                    </Button>
                                </Tooltip>
                            </Link>
                        </Box>

                        <TableTeams dataContent={addRatingToResults} columns={columns} nameClass="style-rows" />

                    </> : null}
            </FormDetailsTeam >

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