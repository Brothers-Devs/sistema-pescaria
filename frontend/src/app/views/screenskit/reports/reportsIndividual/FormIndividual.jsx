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
import instance from "../../../../../axios"
import { FcPrint } from "react-icons/fc";
import TableIndividual from "./TableIndividual";
import { Link } from "react-router-dom";
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

const URL_REPORTS_CATEGORY1 = `${process.env.REACT_APP_BASE_URL_REPORTS}/categories/1/individual`
const URL_REPORTS_CATEGORY2 = `${process.env.REACT_APP_BASE_URL_REPORTS}/categories/2/individual`

export default function FormIndividual() {
    const [alterCategory, setAlterCategory] = useState(false)
    const [resultsCategories, setResultsCategories] = useState([])
    const [valuesInputs, setValuesInputs] = useState({
        tournament_id: 1,
        category: "",
    });
    const addRatingToResults = resultsCategories?.map((result, i) => {
        return {
            ...result,
            city_state: `${result.city}/${result.state}`,
            id: `${i + 1}º`
        }
    })


    useEffect(() => {
        if (valuesInputs.category !== "") {
            const promise = instance.get(`/results/categories/${valuesInputs.category?.id}/individual`)
            promise.then((res) => {
                const resultCategorie = res.data
                setResultsCategories(resultCategorie)
            }).catch((err) => {
                console.log(err.response)
            })
        }
    }, [alterCategory])



    const columns = useMemo(
        () => [
            {
                field: "id",
                headerName: "Class.°",
                width: 100,
                sortable: false,
                disableClickEventBubbling: true,
                headerClassName: 'super-app-theme--header',
                headerAlign: 'center',
                align: "center",
            },
            {
                field: "name",
                headerName: "Pescador",
                width: 300,
                headerAlign: 'center',
                align: "center",
                disableClickEventBubbling: true,
                sortable: false,
                headerClassName: 'super-app-theme--header',
            },
            {
                field: "team_name",
                headerName: "Equipe",
                width: 150,
                headerAlign: 'center',
                align: "center",
                sortable: false,
                headerClassName: 'super-app-theme--header',
                disableClickEventBubbling: true,
            },
            {
                field: "city_state",
                headerName: "Cidade",
                width: 400,
                disableClickEventBubbling: true,
                flex: 1,
                headerClassName: 'super-app-theme--header',
                headerAlign: 'center',
                align: "center",
                sortable: false,
            },
            {
                field: "size",
                headerName: "Comprimento (cm)",
                flex: 1,
                headerClassName: 'super-app-theme--header',
                disableClickEventBubbling: true,
                headerAlign: 'center',
                align: "center",
                rowAlign: "center",
                sortable: false
            },

        ],
        []
    );
    function handleOnChange(value, key) {
        if (value === "Categoria Especial - Modalidade Arremesso") {
            setAlterCategory(!alterCategory)
            setValuesInputs({ ...valuesInputs, [key]: { id: 1, name: value } });
        } else {
            setAlterCategory(!alterCategory)
            setValuesInputs({ ...valuesInputs, [key]: { id: 2, name: value } });
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
                        Classificação final individual maior peixe
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
                {valuesInputs.category === "" ? null :
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

                        <TableIndividual dataContent={addRatingToResults} columns={columns} />

                    </>}
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
