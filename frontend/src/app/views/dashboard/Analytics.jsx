import { Grid, styled } from "@mui/material";
import { Fragment } from "react";
import BannerTopam from "../../assets/images/banner-topam.jpeg";

const ContentBox = styled("div")(({ theme }) => ({
    zIndex: -1,
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
}));

const Title = styled("span")(() => ({
    fontSize: "2.3rem",
    fontWeight: "500",
    marginTop: "26px",
    marginRight: ".5rem",
}));

const Analytics = () => {
    return (
        <Fragment>
            <ContentBox className="analytics">
                <Grid
                    container
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    <Title>Seja Bem Vindo ao TOPAM</Title>
                    <Grid item lg={30} md={30} sm={12} xs={12} marginTop={5}>
                        <img
                            src={BannerTopam}
                            style={{ width: "100%", height: "450px" }}
                            alt="Banner-TOPAM"
                        />
                    </Grid>
                </Grid>
            </ContentBox>
        </Fragment>
    );
};

export default Analytics;
