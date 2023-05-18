import { useEffect, useState } from "react";
import {
    Box,
    Button,
    Typography,
} from "@mui/material";

import { NavLink, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import Inputs from "./Inputs";
import instance from "../../../../../axios"
import Notiflix from "notiflix";

const SIZE_INPUTS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

export default function FormsTable({ typeEditOrCreateForm, dataApurathion, setDataApurathion, modificationInputTeam }) {
    const [onSubmit, setOnSubmit] = useState(false);
    const [fihsermenOfTeam, setFihsermenOfTeam] = useState(null)
    const [valuesInputs, setValuesInputs] = useState([])

    let calculate = 0
    valuesInputs?.map(value => {
        if (value.points === "") {
            return calculate += 0
        } else {
            return calculate += parseFloat(value.points)
        }
    })

    const navigate = useNavigate();
    useEffect(() => {
        const promise = instance.get(`/teams/${dataApurathion?.team_id}/fishermen`)
        promise.then((res) => {
            let allFihsermenOfTeam = res.data.data
            setFihsermenOfTeam(allFihsermenOfTeam)
        }).catch((error) => {
            console.log(error.response.data)
        })
    }, [modificationInputTeam])

    async function submitCreateOrEditVerification(event) {
        event.preventDefault();
        const transform = valuesInputs.map(value => {
            return { ...value, size: parseFloat(value.size).toFixed(2), points: parseFloat(value.points).toFixed(2) }
        })

        const data = {
            team_id: dataApurathion.team_id,
            fisheries: transform
        }
        setOnSubmit(true);
        const promise = typeEditOrCreateForm.method(data);
        promise
            .then((_) => {
                Notiflix.Notify.success(
                    typeEditOrCreateForm.notificationSuccess
                );
                localStorage.removeItem("dataFormTeam");
                navigate("/dashboard/apuracoes");
            })
            .catch((err) => {

                setOnSubmit(false);
                const errors = err.response.data.errors;
                Object.keys(errors).forEach((message) => {
                    Notiflix.Notify.failure(`${errors[message][0]}`);
                });
            });
    }

    return <>
        <Box sx={{ width: 1 }}>
            <Box
                alignItems="center" sx={{ width: 1, height: 1, display: "flex", justifyContent: "space-between", alignContent: "center", paddingTop: 3, paddingBottom: 3, paddingLeft: 8, paddingRight: 13, backgroundColor: "#D3D3D9" }}>
                <Typography variant="subtitle2" >#</Typography>
                <Typography variant="subtitle2" >Pescador</Typography>
                <Typography variant="subtitle2" >Comprimento (cm)</Typography>
                <Typography variant="subtitle2" >Pontos</Typography>
            </Box>
        </Box>
        {fihsermenOfTeam ? SIZE_INPUTS.map((_, i) => <Inputs key={i} fihsermenOfTeam={fihsermenOfTeam} idLine={i + 1} valuesInputs={valuesInputs} setValuesInputs={setValuesInputs} index={i} />) : null}
        <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end", alignItems: "center", mt: 5, mb: 3 }}>
            <Typography variant="h6" sx={{ marginRight: 10 }}>Total de pontos: {calculate.toFixed(1)}</Typography>
        </Box>
        <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
            <Box sx={{ paddingLeft: 5 }}>
                <Button
                    disabled={onSubmit}
                    size="large"
                    variant="contained"
                    type="submit"
                    onClick={submitCreateOrEditVerification}
                >
                    Salvar
                </Button>
                <NavLink to="/dashboard/apuracoes" style={{ textDecoration: "none" }}>
                    <StyledButton
                        variant="text"
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
