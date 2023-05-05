import { Stack } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Create } from "@mui/icons-material";

export default function ButtonActions({
    edit,
    setEdit,
    deleteRow,
    setDeleteRow,
}) {
    return (
        <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton aria-label="delete" size="medium">
                <Create fontSize="inherit" />
            </IconButton>
            <IconButton aria-label="delete" size="medium">
                <DeleteIcon fontSize="inherit" />
            </IconButton>
        </Stack>
    );
}
