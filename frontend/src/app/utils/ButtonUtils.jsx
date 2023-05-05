import { Box, Button } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function ButtonUtils({ functionButton, path }) {
    return (
        <Box
            sx={{
                height: 1,
                width: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
            }}
        >
            <div style={{ width: "15px", height: "15px" }}></div>
            <NavLink to={path}>
                <Button
                    variant="contained"
                    color="success"
                    size="large"
                    sx={{ background: "#256640" }}
                >
                    {functionButton}
                </Button>
            </NavLink>
        </Box>
    );
}
