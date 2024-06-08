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
import { useParams } from "react-router-dom";
import Notiflix from "notiflix";

export default function EditContent({
    typeEditOrCreateForm,
    updateOrCreateFisherman,
    setUpdateOrCreateFisherman,
}) {
    const { id } = useParams();
    const [teamSelected, setTeamSelected] = useState(null);

    const [dataTeamSelected, setDataTeamSelected] = useState({
        team_id: "",
        name: "",
        nameCompacted: "",
    });

    useEffect(() => {
        const promiseTeamsAvailable = instance.get(`/results/${id}`);
        promiseTeamsAvailable
            .then((res) => {
                const dataTeamSelec = res.data.data;
                setDataTeamSelected({
                    team_id: dataTeamSelec?.team_id,
                    name: dataTeamSelec.team.name,
                    nameCompacted: `${dataTeamSelec.team_id} - ${dataTeamSelec.team.name}`,
                });
                setTeamSelected(res.data.data);
            })
            .catch((err) => {
                const errors = err.response.data.errors;
                Object.keys(errors).forEach((message) => {
                    Notiflix.Notify.failure(`${errors[message][0]}`);
                });
            });
    }, [id]);

    return (
        <>
            {teamSelected ? (
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
                        <Typography variant="h6">
                            Editar Apuração da Equipe Nº{" "}
                            {teamSelected?.team_id || ""} -{" "}
                            {dataTeamSelected?.name || ""}
                        </Typography>
                    </Box>
                    <Divider variant="fullWidth" />
                    <Box
                        sx={{
                            marginTop: 5,
                            paddingLeft: 3,
                            paddingBottom: 5,
                        }}
                    >
                        <Typography variant="subtitle1" sx={{ mb: 2 }}>
                            Equipe
                        </Typography>
                        <Autocomplete
                            disableClearable
                            freeSolo
                            disabled={true}
                            noOptionsText="Sem Registro"
                            options={[]}
                            id="combo-box-demo"
                            value={dataTeamSelected?.nameCompacted}
                            sx={{ width: 400 }}
                            renderInput={(params) => (
                                <TextField {...params} label="Equipe" />
                            )}
                        />
                    </Box>
                    <FormsTable
                        typeEditOrCreateForm={typeEditOrCreateForm}
                        dataTeamSelected={dataTeamSelected}
                        setDataTeamSelected={setDataTeamSelected}
                        teamSelected={teamSelected}
                        updateOrCreateFisherman={updateOrCreateFisherman}
                        setUpdateOrCreateFisherman={setUpdateOrCreateFisherman}
                    />
                </FormVerification>
            ) : null}
        </>
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
