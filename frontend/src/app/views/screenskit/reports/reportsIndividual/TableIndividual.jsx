import * as React from "react";
import Box from "@mui/material/Box";
import {
    DataGrid,
    GridToolbarQuickFilter,
    GridLogicOperator,
} from "@mui/x-data-grid";
import { AiOutlineInbox } from "react-icons/ai";
import { Typography } from "@mui/material";
function QuickSearchToolbar() {
    return (
        <Box
            sx={{
                p: 1,
                pb: 0,
                mb: 3,
                zIndex: 120
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

export default function TableIndividual({ dataContent, columns }) {
    return (
        <Box sx={{
            height: 760, width: 1, mt: 0, background: "#FFFFFF",
            border: "none",
            borderRadius: "5px",
            '& .super-app-theme--cell': {
                backgroundColor: '#FFFFFF',
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }
        }}>
            <DataGrid
                sx={{ p: 3, zIndex: -0.2 }}
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
            />
        </Box>
    );
}
