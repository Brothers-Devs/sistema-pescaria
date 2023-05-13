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
import { useState } from "react";
import { mask } from "remask";
import { NavLink, useNavigate } from "react-router-dom";
import Notiflix from "notiflix";
import styled from "@emotion/styled";

const MASK_INPUT_CPF = ["999.999.999-99"];
const MASK_INPUT_PHONE = ["(99) 9 9999-9999"];
const onlyNumbers = async (str) => str.replace(/[^0-9]/g, "");

const countrys = ["Brasil"];
const states = [
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MT",
    "MS",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RS",
    "RO",
    "RR",
    "SC",
    "SP",
    "SE",
    "TO",
];

export default function FormCreateOrEditFisherman({ typeEditOrCreateForm }) {
    const dataFisherMan = JSON.parse(localStorage.getItem("dataFormFisherMan"));

    const [onSubmit, setOnSubmit] = useState(false);
    const [valuesInputs, setValuesInputs] = useState({
        name: dataFisherMan.name,
        cpf: dataFisherMan.cpf,
        phone: dataFisherMan.phone,
        email: dataFisherMan.email,
        country: dataFisherMan.country,
        state: dataFisherMan.state,
        city: dataFisherMan.city,
    });

    const navigate = useNavigate();

    async function submitCreateOurUpdateFisherMen(event) {
        event.preventDefault();
        const dataConfig = {
            name: valuesInputs.name,
            cpf: await onlyNumbers(valuesInputs.cpf),
            email: valuesInputs.email,
            phone: await onlyNumbers(valuesInputs.phone),
            country: valuesInputs.country,
            state: valuesInputs.state,
            city: valuesInputs.city,
        };

        setOnSubmit(true);
        const promise = typeEditOrCreateForm.method(dataConfig);
        promise
            .then((_) => {
                Notiflix.Notify.success(
                    typeEditOrCreateForm.notificationSuccess
                );
                localStorage.removeItem("dataFormFisherMan");
                navigate("/dashboard/pescadores");
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
        setValuesInputs({ ...valuesInputs, [key]: value });
    }

    return (
        <FormFisherMan onSubmit={submitCreateOurUpdateFisherMen}>
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
                    marginTop: 3,
                    paddingLeft: 3,
                    width: 560,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography variant="subtitle1">Nome</Typography>
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
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography variant="subtitle1">CPF</Typography>
                <TextField
                    value={valuesInputs.cpf}
                    onChange={(e) =>
                        handleOnChange(
                            mask(e.target.value, MASK_INPUT_CPF),
                            "cpf"
                        )
                    }
                    type="text"
                    name="CPF"
                    label="CPF"
                    required
                />
            </Box>
            <Box
                sx={{
                    marginTop: 3,
                    paddingLeft: 3,
                    width: 500,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography variant="subtitle1">Telefone</Typography>
                <TextField
                    value={valuesInputs.phone}
                    onChange={(e) =>
                        handleOnChange(
                            mask(e.target.value, MASK_INPUT_PHONE),
                            "phone"
                        )
                    }
                    type="text"
                    name="Telefone"
                    label="Telefone"
                />
            </Box>
            <Box
                sx={{
                    marginTop: 3,
                    paddingLeft: 3,
                    width: 560,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography variant="subtitle1">Email</Typography>
                <TextField
                    sx={{ width: 250 }}
                    value={valuesInputs.email}
                    onChange={(e) => handleOnChange(e.target.value, "email")}
                    type="email"
                    name="Email"
                    label="Email"
                />
            </Box>
            <Box
                sx={{
                    marginTop: 3,
                    paddingLeft: 3,
                    width: 500,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography variant="subtitle1">País</Typography>
                <FormControl required sx={{ width: 190 }}>
                    <InputLabel id="country">País</InputLabel>
                    <Select
                        defaultValue={"Brasil"}
                        labelId="country"
                        id="select-country"
                        value={
                            valuesInputs.country === ""
                                ? "Brasil"
                                : valuesInputs.country
                        }
                        label="País"
                        onChange={(e) =>
                            handleOnChange(e.target.value, "country")
                        }
                    >
                        <MenuItem
                            defaultValue={valuesInputs.country}
                            key={
                                valuesInputs
                                    ? valuesInputs.country
                                    : countrys[0]
                            }
                            value={
                                valuesInputs.country === ""
                                    ? "Brasil"
                                    : valuesInputs.country
                            }
                        >
                            {valuesInputs.country === ""
                                ? "Brasil"
                                : valuesInputs.country}
                        </MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box
                sx={{
                    marginTop: 3,
                    paddingLeft: 3,
                    width: 500,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography variant="subtitle1">Estado</Typography>
                <FormControl required sx={{ width: 190 }}>
                    <InputLabel id="state">Estado</InputLabel>
                    <Select
                        defaultValue={"PA"}
                        labelId="state"
                        id="select-state"
                        label="Estado"
                        value={valuesInputs.state}
                        onChange={(e) =>
                            handleOnChange(e.target.value, "state")
                        }
                    >
                        {states?.map((state) => (
                            <MenuItem key={state} value={state}>
                                {state}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <Box
                sx={{
                    marginTop: 3,
                    marginBottom: 4,
                    paddingLeft: 3,
                    width: 500,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography variant="subtitle1">Cidade</Typography>
                <TextField
                    value={valuesInputs.city}
                    onChange={(e) => handleOnChange(e.target.value, "city")}
                    type="text"
                    name="Cidade"
                    label="Cidade"
                />
            </Box>
            <Button
                disabled={onSubmit}
                size="large"
                sx={{ marginLeft: 2 }}
                variant="contained"
                type="submit"
                onClick={submitCreateOurUpdateFisherMen}
            >
                Salvar
            </Button>
            <NavLink to="/dashboard/pescadores">
                <StyledButton
                    variant="contained"
                    color="inherit"
                    size="large"
                    onClick={() => localStorage.removeItem("dataFormFisherMan")}
                    disableElevation
                >
                    Cancelar
                </StyledButton>
            </NavLink>
        </FormFisherMan>
    );
}

const FormFisherMan = styled("form")(() => ({
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
