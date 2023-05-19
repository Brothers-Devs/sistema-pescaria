import { Box, Button, Tooltip } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function ButtonUtils({ functionButton, path, titleToolTip }) {
    return (
        <Box
            sx={{
                width: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
            }}
        >
            <div style={{ width: "15px", height: "15px" }}></div>
            <Tooltip title={titleToolTip}>
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
            </Tooltip>
        </Box>
    );
}
