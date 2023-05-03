import Breadcrumb from "app/components/Breadcrumb";
import instance from "../../../../axios";
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import {
    Card,
    Divider,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@mui/material";
import ImageTorneio from "../../../assets/images/logo_topam.jpeg";

function AppTournaments() {
    const [tournaments, setTournaments] = useState();
    useEffect(() => {
        let promiseTournaments = instance.get("/tournaments/1");
        promiseTournaments
            .then((res) => {
                setTournaments(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <ContainerRoot>
            <div className="breadcrumb" style={{ marginBottom: "25px" }}>
                <Breadcrumb
                    routeSegments={[
                        { subName: "Detalhes do Torneio" },
                        { name: "Torneios" },
                    ]}
                />
            </div>
            <Divider variant="fullWidth" />
            <Grid item lg={4} md={4} sm={12} xs={12} marginTop={3} width={500}>
                <Card
                    sx={{
                        borderRadius: 0,
                        px: 3,
                        width: "500px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <img
                        src={ImageTorneio}
                        alt="foto-do-torneio"
                        style={{
                            width: "200px",
                            height: "200px",
                            borderRadius: "50%",
                            marginBottom: "20px",
                        }}
                    />
                </Card>
                <Divider />
                <Card
                    sx={{
                        borderRadius: 0,
                        width: "500px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <StyledTable>
                        <TableBody>
                            <TableRow>
                                <TableCell align="left">Nome</TableCell>
                                <TableCell align="center">
                                    {tournaments?.name}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left">Estado</TableCell>
                                <TableCell align="center">
                                    {tournaments?.state}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left">Cidade</TableCell>
                                <TableCell align="center">
                                    {tournaments?.city}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left">Data Início</TableCell>
                                <TableCell align="center">
                                    {tournaments?.start_date}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left">Data Fim</TableCell>
                                <TableCell align="center">
                                    {tournaments?.end_date}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </StyledTable>
                </Card>
            </Grid>
        </ContainerRoot>
    );
}

const ContainerRoot = styled("div")(() => ({
    margin: "30px",
}));

const StyledTable = styled(Table)(({ theme }) => ({
    whiteSpace: "pre",
    "& tbody": {
        "& tr": {
            "& td": {
                paddingLeft: 10,
                textTransform: "capitalize",
                fontSize: 17,
            },
        },
    },
}));

export default React.memo(AppTournaments);
