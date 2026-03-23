import { useCallback, useState } from "react";
import ViewWeekIcon from "@mui/icons-material/ViewWeek";
import {
  Box,
  Paper,
  TableRow,
  Checkbox,
  TableBody,
  TableCell,
  TableContainer,
  Table as MuiTable,
  Typography,
  Pagination,
  PaginationItem,
  IconButton,
  Button,
  type PaginationRenderItemParams,
} from "@mui/material";
import MoreIcon from "@mui/icons-material/MoreHorizOutlined";
import AddIcon from "@mui/icons-material/Add";

import type { Order, Product } from "../../types";
import { useProductsPageState } from "../../hooks/useProductsPageState";

import TableHead from "./TableHead";
import useSorted from "./useSorted";
import useTable from "./useTable";
import TableToolbar from "./TableToolbar";

const styles = {
  tableRow: {
    cursor: "pointer",
    "&.Mui-selected, &.Mui-selected:hover": {
      backgroundColor: "transparent",
    },
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  tableCell: (isItemSelected: boolean) => ({
    width: "5%",
    boxShadow: isItemSelected ? `inset 4px 0 0 #3C538E` : "none",
  }),
  checkbox: {
    color: "#B2B3B9",
    "&.Mui-checked": {
      color: "#3C538E",
    },
  },
  rating: (row: number) => ({
    width: "50px",
    color: row < 3.5 ? "red" : "inherit",
  }),
  button: {
    color: "#ffff",
    marginRight: 4,
    borderRadius: 25,
    backgroundColor: "#242EDB",
  },
  pagination: (item: PaginationRenderItemParams) => ({
    ...(item.type === "previous" || item.type === "next"
      ? {
          border: "none",
          color: "#B2B3B9",
          backgroundColor: "transparent",
          "&:hover": {
            backgroundColor: "transparent",
          },
        }
      : { color: "#B2B3B9" }),
    "&.Mui-selected": {
      backgroundColor: "#797FEA !important",
      color: "#fff",
      "&:hover": {
        backgroundColor: "#797FEA",
      },
    },
  }),
};

const Table = () => {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState<Order>("asc");
  const [rowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState<keyof Product>("title");
  const [selected, setSelected] = useState<readonly number[]>([]);

  const { displayed } = useProductsPageState();

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - displayed.length) : 0;

  const visibleRows = useSorted({
    page,
    order,
    orderBy,
    displayed,
    rowsPerPage,
  });

  const { handleClick, handleSelectAllClick, handleRequestSort } = useTable({
    order,
    orderBy,
    setOrder,
    setOrderBy,
    setPage,
    displayed,
    selected,
    setSelected,
  });

  const handleToggleSortOrder = useCallback(() => {
    setPage(0);
    setOrder((o) => (o === "asc" ? "desc" : "asc"));
  }, [setOrder, setPage]);

  return (
    <Box sx={{ width: "100%", bgcolor: "#F6F6F6" }}>
      <Paper sx={{ width: "100%", borderRadius: "12px" }} elevation={0}>
        <TableToolbar
          order={order}
          orderBy={orderBy}
          onToggleSortOrder={handleToggleSortOrder}
        />
        <TableContainer sx={{ maxHeight: "60vh", overflow: "auto" }}>
          <MuiTable sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <TableHead
              order={order}
              orderBy={orderBy}
              rowCount={displayed.length}
              numSelected={selected.length}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = selected.includes(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    key={row.id}
                    tabIndex={-1}
                    role="checkbox"
                    selected={isItemSelected}
                    sx={styles.tableRow}
                    aria-checked={isItemSelected}
                  >
                    <TableCell
                      align="right"
                      padding="checkbox"
                      sx={styles.tableCell(isItemSelected)}
                    >
                      <Checkbox
                        sx={styles.checkbox}
                        checked={isItemSelected}
                        onChange={(event) => {
                          event.stopPropagation();
                          handleClick(event, row.id);
                        }}
                      />
                    </TableCell>
                    <TableCell
                      scope="row"
                      align="left"
                      id={labelId}
                      padding="none"
                      component="th"
                      sx={{ width: "20%" }}
                    >
                      <Typography fontWeight={600} variant="subtitle2">
                        {row.title}
                      </Typography>
                      <Typography
                        sx={{ display: "block" }}
                        color="textSecondary"
                        variant="caption"
                      >
                        {row.category}
                      </Typography>
                    </TableCell>
                    <TableCell align="center" sx={{ width: "90px" }}>
                      {row.brand}
                    </TableCell>
                    <TableCell align="center" sx={{ width: "120px" }}>
                      {row.sku}
                    </TableCell>
                    <TableCell align="center" sx={styles.rating(row.rating)}>
                      {row.rating}/5
                    </TableCell>
                    <TableCell align="center" sx={{ width: "50px" }}>
                      {row.price}
                    </TableCell>
                    <TableCell align="center" sx={{ width: "90px" }}>
                      <ViewWeekIcon sx={{ color: "#B2B3B9" }} />
                    </TableCell>
                    <TableCell align="center" sx={{ width: "150px" }}>
                      <Button
                        size={"small"}
                        variant="outlined"
                        sx={styles.button}
                        onClick={() => 1}
                      >
                        <AddIcon />
                      </Button>
                      <IconButton
                        size={"small"}
                        sx={{ outline: "3px solid #B2B3B9", margin: 0 }}
                        onClick={() => 1}
                      >
                        <MoreIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </MuiTable>
        </TableContainer>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
          }}
        >
          <Typography>
            {displayed.length > 0
              ? `Показано ${page * rowsPerPage + 1} – ${Math.min((page + 1) * rowsPerPage, displayed.length)} из ${displayed.length}`
              : ""}
          </Typography>
          <Pagination
            count={Math.ceil(displayed.length / rowsPerPage)}
            page={page + 1}
            onChange={(_, value) => setPage(value - 1)}
            variant="outlined"
            shape="rounded"
            color="primary"
            renderItem={(item) => (
              <PaginationItem {...item} sx={styles.pagination(item)} />
            )}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default Table;
