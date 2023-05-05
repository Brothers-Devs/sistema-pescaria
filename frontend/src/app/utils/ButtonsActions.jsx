import { Stack, Tooltip } from "@mui/material";
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
            <Tooltip title="Editar">
                <IconButton aria-label="delete" size="medium" color="primary">
                    <Create fontSize="inherit" />
                </IconButton>
            </Tooltip>
            <Tooltip title="Deletar">
                <IconButton aria-label="delete" size="medium" color="error">
                    <DeleteIcon fontSize="inherit" />
                </IconButton>
            </Tooltip>
        </Stack>
    );
}
