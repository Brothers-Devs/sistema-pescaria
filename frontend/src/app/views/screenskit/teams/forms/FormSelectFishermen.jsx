import {
    Autocomplete,
    Box,
    Button,
    Divider,
    TextField,
    Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import { NavLink, useNavigate } from "react-router-dom";
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Notiflix from "notiflix";
import instance from "../../../../../axios"
import { useEffect, useState } from "react";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function FormSelectFishermen({ typeEditOrCreateForm, valuesInputs, setValuesInputs }) {
    const [fishermenAvailable, setFishermenAvailable] = useState()
    const dataTeam = JSON.parse(localStorage.getItem("dataFormTeam"))
    const [onSubmit, setOnSubmit] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const promiseFishermenAvailable = instance.get("/fishermen/available")
        promiseFishermenAvailable.then((res) => {
            let dataFishermenAvailable = res.data.data
            setFishermenAvailable([...dataTeam.fishermen, ...dataFishermenAvailable])
        }).catch((error) => {
            console.log(error.response)
        })
    }, [])

    const dataFishermenAvailableCompact = fishermenAvailable?.map(fisherman => {
        return { id: fisherman.id, name: `${fisherman.id} - ${fisherman.name} (${fisherman.cpf})` }
    })

    async function submitCreateOrEditTeam(event) {
        event.preventDefault();
        const idsFishermen = valuesInputs.fishermen.map(fisherman => fisherman.id)

        const dataTeamEdited = {
            ...valuesInputs, category_id: valuesInputs.category.id, fishermen: idsFishermen

        }
        setOnSubmit(true);

        const promise = typeEditOrCreateForm.method(dataTeamEdited);
        promise
            .then((_) => {
                Notiflix.Notify.success(
                    typeEditOrCreateForm.notificationSuccess
                );
                localStorage.removeItem("dataFormTeam");
                navigate("/dashboard/equipes");
            })
            .catch((err) => {

                setOnSubmit(false);
                const errors = err.response.data.errors;
                Object.keys(errors).forEach((message) => {
                    Notiflix.Notify.failure(`${errors[message][0]}`);
                });
            });
    }


    function handleOnChange(value, key) {
        // if (typeEditOrCreateForm.type === "cadastrar") {
        //     setValuesInputs({ ...valuesInputs, [key]: value });
        // } else {
        setValuesInputs({ ...valuesInputs, [key]: value });
        // }
    }

    return (
        <FormFisherMen >
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
                    Vincular Pescadores
                </Typography>
            </Box>
            <Divider variant="fullWidth" />
            <Box sx={{
                marginTop: 5,
                paddingLeft: 3,
            }}>
                <Autocomplete
                    multiple
                    id="checkboxes-tags-demo"
                    options={dataFishermenAvailableCompact ? dataFishermenAvailableCompact : [{ name: "" }]}
                    value={valuesInputs.fishermen}
                    disableCloseOnSelect
                    noOptionsText="Sem pescadores disponíveis"
                    onChange={(_, newValue) => handleOnChange(newValue, "fishermen")}
                    getOptionLabel={(option) => option.name}
                    renderOption={(props, option, { selected }) => (
                        <li {...props}>
                            <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{ marginRight: 8 }}
                                checked={selected}
                            />
                            {option.name}
                        </li>
                    )}
                    isOptionEqualToValue={(option, value) =>
                        value === undefined || value === "" || option.id === value.id
                    }
                    style={{ width: 500 }}
                    renderInput={(params) => (
                        <TextField {...params} label="Selecionar pescadores" placeholder="selecionados" />
                    )}
                />
            </Box>
            <Box sx={{ mt: 3, paddingLeft: 3 }}>
                <Button
                    disabled={onSubmit}
                    size="large"
                    variant="contained"
                    type="submit"
                    onClick={submitCreateOrEditTeam}
                >
                    Salvar
                </Button>
                <NavLink to="/dashboard/equipes">
                    <StyledButton
                        variant="contained"
                        color="inherit"
                        size="large"
                        onClick={() => localStorage.removeItem("dataFormTeam")}
                        disableElevation
                    >
                        Cancelar
                    </StyledButton>
                </NavLink>
            </Box>
        </FormFisherMen >
    );
}

const FormFisherMen = styled("form")(() => ({
    marginTop: "10px",
    background: "#FFFFFF",
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
    borderRadius: "5px",
}));

const StyledButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(2),
}));