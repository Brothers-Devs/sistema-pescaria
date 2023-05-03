import Breadcrumb from "app/components/Breadcrumb";
import instance from "../../../../axios";
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Box, Card, Divider, Grid } from "@mui/material";
import ImageTorneio from "../../../assets/images/logo_topam.jpeg";
import TableTournament from "./TableTournament";
import CircularProgress from "@mui/material/CircularProgress";

function AppTournaments() {
    const [detailsTournament, setDetailsTournament] = useState();
    useEffect(() => {
        let promiseTournaments = instance.get("/tournaments/1");
        promiseTournaments
            .then((res) => {
                setDetailsTournament(res.data.data);
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
            {detailsTournament ? (
                <Grid
                    item
                    lg={4}
                    md={4}
                    sm={12}
                    xs={12}
                    marginTop={3}
                    width={500}
                >
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
                    <TableTournament detailsTournament={detailsTournament} />
                </Grid>
            ) : (
                <Box
                    sx={{
                        width: "100%",
                        height: "500px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <CircularProgress color="success" size={70} />
                </Box>
            )}
        </ContainerRoot>
    );
}

const ContainerRoot = styled("div")(() => ({
    margin: "30px",
}));

export default React.memo(AppTournaments);
