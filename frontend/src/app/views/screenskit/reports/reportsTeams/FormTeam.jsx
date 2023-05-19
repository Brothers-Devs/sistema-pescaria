import {
    Box,
    Button,
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import { useMemo, useState } from "react";
import { FcPrint } from "react-icons/fc";
import TableTeams from "./TableTeams";
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




export default function FormTeam() {
    const [rowSelected, setRowSelected] = useState(false);
    const [alterCategory, setAlterCategory] = useState(false)
    const [valuesInputs, setValuesInputs] = useState({
        tournament_id: 1,
        category: "",
    });
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
            },
            {
                field: "name",
                headerName: "N°",
                width: 210,
                disableClickEventBubbling: true,
                sortable: false,
                headerClassName: 'super-app-theme--header',
                headerAlign: 'center',
            },
            {
                field: "type",
                headerName: "Equipe",
                width: 150,
                headerAlign: 'center',
                sortable: false,
                headerClassName: 'super-app-theme--header',
                disableClickEventBubbling: true,
            },
            {
                field: "fishermen",
                headerName: "Pescadores",
                width: 400,
                disableClickEventBubbling: true,
                headerClassName: 'super-app-theme--header',
                headerAlign: 'center',
                sortable: false,
                valueGetter: (params) => {
                    return `${params?.row.category.name}`;
                },
            },
            {
                field: "category",
                headerName: "Pontuação",
                flex: 1,
                headerClassName: 'super-app-theme--header',
                disableClickEventBubbling: true,
                sortable: false
            },

        ],
        [rowSelected]
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
                <Box sx={{ display: "flex", width: 1, justifyContent: "flex-end", pr: 6, position: "relative", top: 85 }}>
                    <Button size="large" variant="contained">
                        <FcPrint size={30} />
                        <Typography variant="subtitle1" sx={{ ml: 1 }}>Download (.pdf)</Typography>
                    </Button>
                </Box>
                <Box
                    sx={{
                        width: '100%',
                        '& .super-app-theme--header': {
                            backgroundColor: '#D3D3D9',
                        },
                    }}
                >
                    <TableTeams dataContent={[]} columns={columns} />
                </Box>
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