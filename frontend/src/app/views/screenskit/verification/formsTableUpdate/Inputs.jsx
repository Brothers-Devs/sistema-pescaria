import { Autocomplete, Box, Divider, IconButton, Stack, TextField, Tooltip, Typography } from "@mui/material";
import { mask, unMask } from "remask";
import { useState } from "react";
import { Create } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import ModalDelete from "./Modal";
import instance from "../../../../../axios";
import { useParams } from "react-router-dom";
import Notiflix from "notiflix";

const MASK_INPUT_LENGTH_OR_WEIGTH = ["99.99", "999.99"];

export default function Inputs({ _, dataTeamSelected, fihsermenOfTeam, teamSelected, idLine, index, valuesInputs, setValuesInputs, updateOrCreateFisherman, setUpdateOrCreateFisherman }) {
    const [onHandleUpdate, setOnHandleUpdate] = useState(false)
    const [handleRegister, setHandleRegister] = useState(false)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { id } = useParams()

    const fishermanSelectedDefault = teamSelected?.fisheries[index] !== undefined ? { ...teamSelected?.fisheries[index] } : ""
    const nameFishermanCompact = teamSelected?.fisheries[index] !== undefined ? `${fishermanSelectedDefault?.fisherman.id} - ${fishermanSelectedDefault?.fisherman.name} (${fishermanSelectedDefault?.fisherman.cpf})` : ""

    const [dataInputs, setDataInputs] = useState({
        fishing_id: fishermanSelectedDefault?.id || "",
        team_id: dataTeamSelected?.team_id || "",
        result_id: fishermanSelectedDefault?.result_id || "",
        fisherman_id: fishermanSelectedDefault?.fisherman_id || "",
        fisherman: nameFishermanCompact || "",
        size: fishermanSelectedDefault?.size || "",
        points: fishermanSelectedDefault?.points || ""
    })

    const dataFihsermenOfTeamCompact = fihsermenOfTeam?.fishermen.map(fisherman => {
        return { id: fisherman.id, name: `${fisherman.id} - ${fisherman.name} (${fisherman.cpf})` }
    })

    function handleOnChange(value, key) {
        if (key === "fisherman") {
            setDataInputs({ ...dataInputs, fisherman_id: value ? value.id : "", [key]: value ? value.name : "" })
        } else {
            setDataInputs({ ...dataInputs, [key]: value })
            setValuesInputs({ ...valuesInputs, points: value !== "" ? parseFloat(value).toFixed(2) : "" })
        }
    }
    function handleUpdate() {
        setOnHandleUpdate(!onHandleUpdate)
    }
    function openHandleRegister() {
        setHandleRegister(true)
        setOnHandleUpdate(!onHandleUpdate)
    }

    function submitUpdate() {
        setUpdateOrCreateFisherman(true)
        const dataUpdate = {
            tournament_id: 1,
            team_id: dataInputs.team_id,
            result_id: dataInputs.result_id,
            fisherman_id: dataInputs.fisherman_id,
            size: parseFloat(dataInputs.size).toFixed(2),
            points: parseFloat(dataInputs.points).toFixed(2)
        }
        const promiseUpdate = instance.put(`/fishing/${dataInputs.fishing_id}`, dataUpdate)

        promiseUpdate.then((_) => {
            Notiflix.Notify.success("Atualizado com sucesso!")
            setUpdateOrCreateFisherman(false)
        }).catch((err) => {
            const errors = err.response.data.errors;
            setUpdateOrCreateFisherman(false)
            Object.keys(errors).forEach((message) => {
                Notiflix.Notify.failure(`${errors[message][0]}`);
            });
        })

    }

    function closeUpdate() {
        setUpdateOrCreateFisherman(true)
        setTimeout(() => {
            setUpdateOrCreateFisherman(false)
        }, 500);
    }

    function submitRegister() {
        setUpdateOrCreateFisherman(true)
        const dataRegister = {
            tournament_id: 1,
            team_id: dataInputs.team_id,
            result_id: id,
            fisherman_id: dataInputs.fisherman_id,
            size: parseFloat(dataInputs.size).toFixed(2),
            points: parseFloat(dataInputs.points).toFixed(2)
        }

        const promiseRegister = instance.post("/fishing", dataRegister)
        promiseRegister.then((_) => {
            setUpdateOrCreateFisherman(false)
            Notiflix.Notify.success("Cadastrado com sucesso!")
        }).catch((err) => {
            const errors = err.response.data.errors;
            setUpdateOrCreateFisherman(false)
            Object.keys(errors).forEach((message) => {
                Notiflix.Notify.failure(`${errors[message][0]}`);
            });
        })
    }

    return (<>
        <Box sx={{ width: 1, display: "flex", justifyContent: "space-around", alignItems: "center", padding: 2 }}>
            <Typography variant="subtitle1" >{idLine}</Typography>
            <Autocomplete
                noOptionsText="Sem Registro"
                id="pescadores"
                disabled={!onHandleUpdate}
                options={dataFihsermenOfTeamCompact || [{ name: "" }]}
                value={dataInputs.fisherman || ""}
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
                disabled={!onHandleUpdate}
                onChange={(e) => handleOnChange(mask(unMask(e.target.value), MASK_INPUT_LENGTH_OR_WEIGTH), "size")}
                label="Tamanho"
                variant="outlined"
                sx={{ mr: 16, width: 120 }} />
            <TextField
                id="input-peso"
                value={dataInputs?.points}
                disabled={!onHandleUpdate}
                onChange={(e) => handleOnChange(mask(unMask(e.target.value), MASK_INPUT_LENGTH_OR_WEIGTH), "points")}
                label="Pontos"
                variant="outlined"
                sx={{ width: 120 }} />
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}
            >
                {teamSelected?.fisheries[index] !== undefined ?
                    <>
                        {!onHandleUpdate ?
                            <>
                                <Tooltip title="Editar pescaria" >
                                    <IconButton onClick={handleUpdate} aria-label="edit" size="medium" color="primary">
                                        <Create fontSize="inherit" />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Excluir pescaria">
                                    <IconButton
                                        aria-label="delete"
                                        size="medium"
                                        color="error"
                                        onClick={handleOpen}
                                    >
                                        <DeleteIcon fontSize="inherit" />
                                    </IconButton>
                                </Tooltip>
                            </> :
                            <>
                                <Tooltip title="Salvar edição" >
                                    <IconButton onClick={submitUpdate} aria-label="check" size="medium" color="success">
                                        <CheckIcon fontSize="inherit" />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Cancelar edição">
                                    <IconButton
                                        aria-label="cancelar"
                                        size="medium"
                                        onClick={closeUpdate}
                                    >
                                        <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                </Tooltip>
                            </>}
                    </> : <>

                        {!handleRegister ? <Tooltip title="Cadastrar pescaria">
                            <IconButton
                                aria-label="singup"
                                size="medium"
                                color="success"
                                onClick={openHandleRegister}
                            >
                                <SaveIcon fontSize="inherit" />
                            </IconButton>
                        </Tooltip> :
                            <Tooltip title="Confirmar pescaria">
                                <IconButton
                                    aria-label="singup"
                                    size="medium"
                                    color="success"
                                    onClick={submitRegister}
                                >
                                    <SaveIcon fontSize="inherit" />
                                </IconButton>
                            </Tooltip>}
                        <Box sx={{ width: 40 }}>
                        </Box>
                    </>}

                {open ? (
                    <ModalDelete
                        handleClose={handleClose}
                        open={open}
                        rowId={idLine}
                        setUpdateOrCreateFisherman={setUpdateOrCreateFisherman}
                    />) : null}
            </Stack>
        </Box>
        <Divider variant="fullWidth" />
    </>)

}