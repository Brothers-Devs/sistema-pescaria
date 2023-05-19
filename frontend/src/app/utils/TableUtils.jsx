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

export default function TableUtils({ dataContent, columns, setRowSelected, path, type, titleToolTip }) {
    return (
        <Box sx={{ height: 760, width: 1 }}>
            {type === "relatorio-pescadores" ?
                <Box sx={{ display: "flex", width: 1, justifyContent: "flex-end", alignItems: "center" }}>
                    <Box sx={{ display: "flex", minWidth: 200, pl: 105 }}>
                        <Tooltip title="Baixar Relatório de Pescadores">
                            <Button size="large" variant="contained" sx={{ width: 350, height: 42, mr: 0 }}>
                                <FcPrint size={25} />
                                <Typography variant="subtitle1" sx={{ ml: 1, width: 1 }}>Download (.pdf)</Typography>
                            </Button>
                        </Tooltip>
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
