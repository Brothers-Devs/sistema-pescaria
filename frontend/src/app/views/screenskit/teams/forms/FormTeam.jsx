import {
    Box,
    Button,
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import styled from "@emotion/styled";

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
const types = [
    "DUPLA",
    "TRIO",
];


export default function FormTeam({ typeEditOrCreateForm, valuesInputs, setValuesInputs }) {


    function handleOnChange(value, key) {
        if (key === "category") {
            if (value === "Categoria Especial - Modalidade Arremesso") {
                setValuesInputs({ ...valuesInputs, [key]: { id: 1, name: value } });
            } else {
                setValuesInputs({ ...valuesInputs, [key]: { id: 2, name: value } });
            }
        } else {
            setValuesInputs({ ...valuesInputs, [key]: value });
        }
    }

    return (
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
                    {typeEditOrCreateForm.titleForm}
                </Typography>
            </Box>
            <Divider variant="fullWidth" />
            <Box sx={{
                paddingLeft: 3,
                display: "flex",
            }}>
                <Box
                    sx={{
                        marginTop: 3,
                        paddingLeft: 3,
                        width: 560,
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column"
                    }}
                >
                    <Typography variant="subtitle1" sx={{ mb: 2 }}>Nome</Typography>
                    <TextField
                        sx={{ width: 250 }}
                        value={valuesInputs?.name}
                        onChange={(e) => handleOnChange(e.target.value, "name")}
                        type="text"
                        name="Nome"
                        label="Nome"
                        required
                    />
                </Box>
                <Box
                    sx={{
                        marginTop: 3,
                        paddingLeft: 3,
                        width: 500,
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column"
                    }}
                >
                    <Typography variant="subtitle1" sx={{ mb: 2 }}>Tipo</Typography>
                    <FormControl required sx={{ width: 190 }}>
                        <InputLabel id="type">Tipo</InputLabel>
                        <Select
                            labelId="type"
                            id="select-type"
                            value={
                                valuesInputs.type !== "" ? valuesInputs.type : ""
                            }
                            label="Tipo"
                            onChange={(e) =>
                                handleOnChange(e.target.value, "type")
                            }
                        >
                            {types.map((type) => <MenuItem
                                key={type}
                                value={type}
                            >
                                {type}
                            </MenuItem>)}
                        </Select>
                    </FormControl>
                </Box>
            </Box>
            <Divider variant="fullWidth" sx={{ mt: 3, mb: 3 }} />
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
                <Typography variant="subtitle1" sx={{ mb: 2 }}>Categoria</Typography>
                <FormControl required sx={{ width: 400 }}>
                    <InputLabel id="category">Categoria</InputLabel>
                    <Select
                        labelId="category"
                        id="select-category"
                        label="Categoria"
                        value={valuesInputs.category !== "" ? valuesInputs.category.name : ""}
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
        </FormDetailsTeam >
    );
}

const FormDetailsTeam = styled("form")(() => ({
    marginTop: "10px",
    background: "#FFFFFF",
    width: "100%",
    height: 400,
    boxSizing: "border-box",
    boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
    borderRadius: "5px",
}));