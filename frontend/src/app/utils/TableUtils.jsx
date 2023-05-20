import * as React from "react";
import Box from "@mui/material/Box";
import {
    DataGrid,
    GridToolbarQuickFilter,
    GridLogicOperator,
} from "@mui/x-data-grid";
import { AiOutlineInbox } from "react-icons/ai";
import ButtonUtils from "./ButtonUtils";
import { Button, CircularProgress, Tooltip, Typography } from "@mui/material";
import { FcPrint } from "react-icons/fc";
import { Link } from "react-router-dom";
function QuickSearchToolbar() {
    return (
        <Box
            sx={{
                p: 1,
                pb: 0,
                mb: 3,
            }}
        >
            <GridToolbarQuickFilter
                sx={{
                    border: "1px lightgray solid",
                    borderRadius: 3,
                    p: 1,
                }}
                placeholder="Pesquisar. . ."
                quickFilterParser={(searchInput) =>
                    searchInput
                        .split(",")
                        .map((value) => value.trim())
                        .filter((value) => value !== "")
                }
            />
        </Box>
    );
}

function CustomNoRowsOverlay() {
    return (
        <Box
            sx={{
                width: 1,
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <AiOutlineInbox size={100} style={{ marginBottom: "15px" }} />
            <Typography variant="h6">Sem Registros</Typography>
        </Box>
    );
}

function CustomNoRows() {
    return (
        <Box
            sx={{
                width: 1,
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <CircularProgress />
        </Box>
    );
}

export default function TableUtils({ dataContent, columns, setRowSelected, path, type, titleToolTip, title, linkReports }) {

    return (
        <Box sx={{ height: 760, width: 1 }}>
            {type === "relatorio-pescadores" || type === "relatorio-equipes" ?
                <Box sx={{ display: "flex", width: 1, justifyContent: "flex-end", alignItems: "center" }}>
                    <Tooltip title={title}>
                        <Link to={linkReports} target="_blank">
                            <Button size="large" variant="contained" sx={{ mb: 2, mr: 2 }}>
                                <FcPrint size={25} style={{ marginRight: 10 }} />
                                Download (.pdf)
                            </Button>
                        </Link>
                    </Tooltip>
                    <Box sx={{ display: "flex" }}>
                        <ButtonUtils
                            functionButton="Cadastrar"
                            path={path}
                            titleToolTip="Cadastrar Pescador"
                        />
                    </Box>
                </Box> :
                <ButtonUtils
                    functionButton="Cadastrar"
                    path={path}
                    titleToolTip={titleToolTip}
                />
            }

            <DataGrid
                sx={{ p: 3 }}
                getRowId={(rows) => rows.id}
                columns={columns}
                rows={dataContent}
                disableRowSelectionOnClick
                disableColumnMenu
                key={dataContent.name}
                pageSizeOptions={[10, 25, 50]}
                initialState={{
                    pagination: { paginationModel: { pageSize: 10 } },
                    filter: {
                        filterModel: {
                            items: [],
                            quickFilterLogicOperator: GridLogicOperator.Or,
                        },
                    },
                }}
                slots={{
                    toolbar: QuickSearchToolbar,
                    noRowsOverlay: CustomNoRowsOverlay,
                    noResultsOverlay: CustomNoRowsOverlay,
                }}
                onRowClick={(params) => setRowSelected(params)}
            />
        </Box>
    );
}
