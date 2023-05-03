import { Card, Table, TableBody, TableCell, TableRow } from "@mui/material";
import styled from "@emotion/styled";

export default function TableTournament({ detailsTournament }) {
    return (
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
                            {detailsTournament.name}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">Estado</TableCell>
                        <TableCell align="center">
                            {detailsTournament.state}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">Cidade</TableCell>
                        <TableCell align="center">
                            {detailsTournament.city}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">Data Início</TableCell>
                        <TableCell align="center">
                            {detailsTournament.start_date}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">Data Fim</TableCell>
                        <TableCell align="center">
                            {detailsTournament.end_date}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </StyledTable>
        </Card>
    );
}

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
