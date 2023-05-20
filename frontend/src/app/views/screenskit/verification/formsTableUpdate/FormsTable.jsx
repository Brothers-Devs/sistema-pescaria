import { useEffect, useState } from "react";
import {
    Box,
    Button,
    Typography,
} from "@mui/material";
import Inputs from "./Inputs";
import instance from "../../../../../axios";
import { NavLink } from "react-router-dom";
import styled from "@emotion/styled";
import Notiflix from "notiflix";
const SIZE_INPUTS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

export default function FormsTable({ typeEditOrCreateForm, dataTeamSelected, teamSelected, updateOrCreateFisherman, setUpdateOrCreateFisherman }) {
    const [fihsermenOfTeam, setFihsermenOfTeam] = useState(null)
    const [valuesInputs, setValuesInputs] = useState([...teamSelected?.fisheries])

    let calculate = 0
    valuesInputs?.map(value => {
        if (value.points === "") {
            return calculate += 0
        } else {
            return calculate += parseFloat(value.points)
        }
    })

    useEffect(() => {
        const promise = instance.get(`/teams/${dataTeamSelected?.team_id}/fishermen`)
        promise.then((res) => {
            let allFihsermenOfTeam = res.data.data
            setFihsermenOfTeam(allFihsermenOfTeam)
        }).catch((err) => {
            const errors = err.response.data.errors;
            Object.keys(errors).forEach((message) => {
                Notiflix.Notify.failure(`${errors[message][0]}`);
            });
        })
    }, [])

    return <>
        <Box sx={{ width: 1, mt: 5 }}>
            <Box
                alignItems="center" sx={{ width: 1, height: 1, display: "flex", justifyContent: "space-between", alignContent: "center", paddingTop: 3, paddingBottom: 3, paddingLeft: 8, paddingRight: 13, backgroundColor: "#D3D3D9" }}>
                <Typography variant="subtitle2" >#</Typography>
                <Typography variant="subtitle2" >Pescador</Typography>
                <Typography variant="subtitle2" >Comprimento (cm)</Typography>
                <Typography variant="subtitle2" >Pontos</Typography>
                <Typography variant="subtitle2" >Ações</Typography>
            </Box>
        </Box>
        {fihsermenOfTeam !== null ? SIZE_INPUTS.map((_, i) => {
            return <Inputs key={i}
                dataTeamSelected={dataTeamSelected}
                fihsermenOfTeam={fihsermenOfTeam}
                teamSelected={teamSelected}
                idLine={i + 1}
                index={i}
                valuesInputs={valuesInputs}
                setValuesInputs={setValuesInputs}
                updateOrCreateFisherman={updateOrCreateFisherman}
                setUpdateOrCreateFisherman={setUpdateOrCreateFisherman}
            />
        }) : null}
        <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end", alignItems: "center", mt: 5, mb: 3 }}>
            <Typography variant="h6" sx={{ marginRight: 10 }}>Total de pontos: {calculate.toFixed(1)}</Typography>
        </Box>
        <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
            <Box sx={{ paddingLeft: 5 }}>
                <NavLink to="/dashboard/apuracoes" style={{ textDecoration: "none" }}>
                    <StyledButton
                        variant="contained"
                        color="inherit"
                        size="large"
                        onClick={() => localStorage.removeItem("dataFormVerification")}
                        disableElevation
                    >
                        Cancelar
                    </StyledButton>
                </NavLink>
            </Box>
        </Box>
    </>
}


const StyledButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(2),
    fontSize: 16
}));
