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
import instance from "../../../../axios";
import { useState } from "react";
import { mask } from "remask";
import { NavLink, useNavigate } from "react-router-dom";
import Notiflix, { Notify } from "notiflix";
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

export default function FormCreateFisherMan() {
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [country, setCountry] = useState("Brasil");
    const [state, setState] = useState("PA");
    const [city, setCity] = useState("");
    const [onSubmit, setOnSubmit] = useState(false);

    const navigate = useNavigate();

    async function submitCreateFisherMen(event) {
        event.preventDefault();
        const dataConfig = {
            name,
            cpf: await onlyNumbers(cpf),
            email,
            phone: await onlyNumbers(phone),
            country,
            state,
            city,
        };

        setOnSubmit(true);
        const promise = instance.post("/fishermen", dataConfig);
        promise
            .then((_) => {
                Notify.success("Cadastrado com sucesso!");
                navigate("/dashboard/pescadores");
            })
            .catch((err) => {
                setOnSubmit(false);
                const arrayMessage = [];
                Object.keys(err.response.data.errors).forEach((message) => {
                    arrayMessage.push(
                        `${err.response.data.errors[message][0]}\n`
                    );
                });

                Notiflix.Notify.failure(
                    `${arrayMessage.map((message) => message)}`
                );
            });
    }

    return (
        <FormFisherMan onSubmit={submitCreateFisherMen}>
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
                <Typography variant="h6">Adiciona Novo Registro</Typography>
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    value={cpf}
                    onChange={(e) =>
                        setCpf(mask(e.target.value, MASK_INPUT_CPF))
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
                    value={phone}
                    onChange={(e) =>
                        setPhone(mask(e.target.value, MASK_INPUT_PHONE))
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                        value={country}
                        label="País"
                        onChange={(e) => setCountry(e.target.value)}
                    >
                        <MenuItem
                            defaultValue={"Brasil"}
                            key={countrys[0]}
                            value={"Brasil"}
                        >
                            Brasil
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
                        value={state}
                        onChange={(e) => setState(e.target.value)}
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
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
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
                onClick={submitCreateFisherMen}
            >
                Salvar
            </Button>
            <NavLink to="/dashboard/pescadores">
                <StyledButton
                    variant="contained"
                    color="inherit"
                    size="large"
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
