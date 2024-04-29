import {
    Box,
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import styled from "@emotion/styled";

const types = ["DUPLA", "TRIO"];

export default function FormTeam({
    typeEditOrCreateForm,
    valuesInputs,
    setValuesInputs,
}) {
    function handleOnChange(value, key) {
        setValuesInputs({ ...valuesInputs, [key]: value });
    }

    return (
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
                    {typeEditOrCreateForm.titleForm}
                </Typography>
            </Box>
            <Divider variant="fullWidth" />
            <Box
                sx={{
                    paddingLeft: 3,
                    display: "flex",
                }}
            >
                <Box
                    sx={{
                        marginTop: 3,
                        paddingLeft: 3,
                        width: 560,
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                    }}
                >
                    <Typography variant="subtitle1" sx={{ mb: 2 }}>
                        Nome
                    </Typography>
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
                        flexDirection: "column",
                    }}
                >
                    <Typography variant="subtitle1" sx={{ mb: 2 }}>
                        Tipo
                    </Typography>
                    <FormControl required sx={{ width: 190 }}>
                        <InputLabel id="type">Tipo</InputLabel>
                        <Select
                            labelId="type"
                            id="select-type"
                            value={
                                valuesInputs?.type !== ""
                                    ? valuesInputs.type
                                    : ""
                            }
                            label="Tipo"
                            onChange={(e) =>
                                handleOnChange(e.target.value, "type")
                            }
                        >
                            {types.map((type) => (
                                <MenuItem key={type} value={type}>
                                    {type}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </Box>
        </FormDetailsTeam>
    );
}

const FormDetailsTeam = styled("form")(() => ({
    marginTop: "10px",
    background: "#FFFFFF",
    width: "100%",
    height: 300,
    boxSizing: "border-box",
    boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
    borderRadius: "5px",
}));
