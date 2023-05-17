import Notiflix from "notiflix";
import instance from "../../../../../axios"

const { Modal, Box, Typography, Stack, Button } = require("@mui/material");


const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    width: 500,
    height: 230,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};
export default function ModalDelete({
    handleClose,
    open,
    rowId,
    setUpdateOrCreateFisherman
}) {
    function submitDeletion() {
        setUpdateOrCreateFisherman(true)
        const promise = instance.delete(`/fishing/${rowId}`);
        promise
            .then((_) => {
                setUpdateOrCreateFisherman(false);
                Notiflix.Notify.success("Excluído com sucesso!");
            })
            .catch((err) => {
                const errors = err.response.data.errors;
                Object.keys(errors).forEach((message) => {
                    Notiflix.Notify.failure(`${errors[message][0]}`);
                });
            });
    }



    return (
        <Modal
            open={open}
            keepMounted
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
        >
            <Box sx={style}>
                <Typography
                    id="keep-mounted-modal-title"
                    variant="h6"
                    component="h2"
                >
                    Excluir Registro
                </Typography>
                <Typography
                    id="keep-mounted-modal-description"
                    variant="subtitle1"
                    component="h2"
                    sx={{ mt: 2 }}
                >
                    {`Tem certeza que deseja excluir o item Nº ${rowId}?`}
                </Typography>
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={4}
                    sx={{ mt: 5 }}
                >
                    <Button
                        color="success"
                        size="large"
                        variant="outlined"
                        sx={{ borderRadius: 20, width: 100 }}
                        onClick={submitDeletion}
                    >
                        Sim
                    </Button>
                    <Button
                        color="warning"
                        size="large"
                        variant="outlined"
                        sx={{ borderRadius: 20, width: 100 }}
                        onClick={handleClose}
                    >
                        Não
                    </Button>
                </Stack>
            </Box>
        </Modal>
    );
}
