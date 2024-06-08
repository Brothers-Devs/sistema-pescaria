import {
    Autocomplete,
    Box,
    Divider,
    TextField,
    Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import instance from "../../../../../api/appInstance";
import { useEffect, useState } from "react";
import FormsTable from "./FormsTable";

export default function CreationContent({ typeEditOrCreateForm }) {
    const [teamsAvailable, setTeamsAvailable] = useState();
    const [modificationInputTeam, setModificationInputTeamset] =
        useState(false);
    const [dataApurathion, setDataApurathion] = useState({
        team_id: "",
        name: "",
    });
    const dataTeamsAvailableCompact = teamsAvailable?.map((teamAvailable) => {
        return {
            id: teamAvailable.id,
            name: `${teamAvailable.id} - ${teamAvailable.name}`,
        };
    });

    function handleOnChange(value, key) {
        setDataApurathion({
            ...dataApurathion,
            team_id: value.id,
            [key]: value.name,
        });
        setModificationInputTeamset(!modificationInputTeam);
    }

    useEffect(() => {
        const promiseTeamsAvailable = instance.get("/teams/available");
        promiseTeamsAvailable
            .then((res) => {
                setTeamsAvailable(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [modificationInputTeam]);

    return (
        <FormVerification>
            <Box
                sx={{
                    paddingTop: 3,
                    paddingLeft: 3,
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 3,
                }}
            >
                <Typography variant="h6">Registrar Nova Apuração</Typography>
            </Box>
            <Divider variant="fullWidth" />
            <Box
                sx={{
                    marginTop: 5,
                    paddingLeft: 3,
                    paddingBottom: 5,
                }}
            >
                <Typography variant="subtitle2" sx={{ mb: 2 }}>
                    Obs: Aqui são listadas somente as equipes que ainda não
                    possuem apurações cadastradas.
                </Typography>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                    Selecione a Equipe:
                </Typography>
                <Autocomplete
                    disableClearable
                    noOptionsText="Sem Registro"
                    id="combo-box-demo"
                    options={dataTeamsAvailableCompact || [{ name: "" }]}
                    value={dataApurathion}
                    onChange={(_, newValue) => handleOnChange(newValue, "name")}
                    getOptionLabel={(option) =>
                        option.name || dataApurathion.name
                    }
                    renderOption={(props, option) => (
                        <li {...props} key={option.name}>
                            {option.name}
                        </li>
                    )}
                    sx={{ width: 400 }}
                    isOptionEqualToValue={(option, value) =>
                        value === undefined ||
                        value === "" ||
                        value.name === option.name
                    }
                    renderInput={(params) => (
                        <TextField {...params} label="Equipe" />
                    )}
                />
            </Box>
            {dataApurathion.name !== "" ? (
                <FormsTable
                    typeEditOrCreateForm={typeEditOrCreateForm}
                    dataApurathion={dataApurathion}
                    setDataApurathion={setDataApurathion}
                    modificationInputTeam={modificationInputTeam}
                />
            ) : null}
        </FormVerification>
    );
}

const FormVerification = styled("form")(() => ({
    marginTop: "10px",

    background: "#FFFFFF",
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
    borderRadius: "5px",
}));
