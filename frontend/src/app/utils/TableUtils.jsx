import * as React from "react";
import Box from "@mui/material/Box";
import {
    DataGrid,
    GridToolbarQuickFilter,
    GridLogicOperator,
    GridColDef,
} from "@mui/x-data-grid";
import ButtonUtils from "./ButtonUtils";
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

export default function TableUtils({ dataContent, columns }) {
    return (
        <Box sx={{ height: 1, width: 1 }}>
            <ButtonUtils
                functionButton="Cadastrar"
                path="/dashboard/pescadores/cadastrar"
            />
            <DataGrid
                sx={{ p: 3 }}
                columns={columns}
                rows={dataContent}
                disableRowSelectionOnClick
                disableColumnMenu
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
                slots={{ toolbar: QuickSearchToolbar }}
            />
        </Box>
    );
}
