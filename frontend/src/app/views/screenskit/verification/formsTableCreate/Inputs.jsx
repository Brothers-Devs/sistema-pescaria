import { Autocomplete, Box, Divider, TextField, Typography } from "@mui/material";
import { mask, unMask } from "remask";
import { useState } from "react";
const MASK_INPUT_LENGTH_OR_WEIGTH = ["99.9", "999.9"];
const MASK_INPUT_LENGTH = ["99.99", "999.99"];

export default function Inputs({ fihsermenOfTeam, idLine, valuesInputs, setValuesInputs, index }) {
    const [dataInputs, setDataInputs] = useState({
        fisherman_id: "",
        fisherman: "",
        size: "",
        points: ""
    })

    const dataFihsermenOfTeamCompact = fihsermenOfTeam?.fishermen.map(fisherman => {
        return { id: fisherman.id, name: `${fisherman.id} - ${fisherman.name} (${fisherman.cpf})` }
    })


    function handleOnChange(value, key) {
        if (key === "fisherman") {
            setDataInputs({ ...dataInputs, fisherman_id: value ? value.id : "", [key]: value ? value.name : "" })
            valuesInputs[index] = { ...dataInputs, fisherman_id: value ? value.id : "", [key]: value ? value.name : "" }
            setValuesInputs([...valuesInputs])
        } else {
            setDataInputs({ ...dataInputs, [key]: value })
            valuesInputs[index] = { ...dataInputs, [key]: value }
            setValuesInputs([...valuesInputs])
        }
    }

    return <>
        <Box sx={{ width: 1, display: "flex", justifyContent: "space-around", alignItems: "center", padding: 2 }}>
            <Typography variant="subtitle1" >{idLine}</Typography>
            <Autocomplete
                noOptionsText="Sem Registro"
                id="pescadores"
                options={dataFihsermenOfTeamCompact || [{ name: "" }]}
                value={dataInputs?.fisherman}
                onChange={(_, newValue) => {
                    return handleOnChange(newValue, "fisherman", dataInputs?.fisherman_id)
                }}
                getOptionLabel={(option) => {
                    return option.name || dataInputs.fisherman || ""
                }}
                renderOption={(props, option) => (
                    <li {...props} key={option.name}>
                        {option.name}
                    </li>
                )}
                sx={{ width: 400 }}
                renderInput={(params) =>
                    < TextField {...params} label="Pescador" placeholder="selecione o pescador" />
                }
                isOptionEqualToValue={(option, value) => {
                    return value === option.name || value === undefined
                }}

            />
            <TextField
                id="input-comprimento"
                value={dataInputs?.size}
                onChange={(e) => handleOnChange(mask(unMask(e.target.value), MASK_INPUT_LENGTH), "size")}
                label="Tamanho"
                variant="outlined"
                sx={{ mr: 16, width: 120 }} />
            <TextField
                id="input-peso"
                value={dataInputs?.points}
                onChange={(e) => handleOnChange(mask(unMask(e.target.value), MASK_INPUT_LENGTH_OR_WEIGTH), "points")}
                label="Pontos"
                variant="outlined"
                sx={{ width: 120 }} />
        </Box>
        <Divider variant="fullWidth" />
    </>

}