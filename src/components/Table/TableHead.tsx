import {
  TableRow,
  Checkbox,
  TableCell,
  TableSortLabel,
  TableHead as TableHeadMui,
} from "@mui/material";

import type { Order, Product } from "../../types";

import useHeaderCell from "./useHeaderCell";

interface TableProps {
  order: Order;
  orderBy: string;
  rowCount: number;
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Product,
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const styles = {
  checkbox: {
    color: "#B2B3B9",
    "&.Mui-checked": {
      color: "#3C538E",
    },
  },
  label: (numeric: boolean | undefined) => ({
    pl: numeric ? "24px" : "0",
    color: "#B2B3B9",
    fontWeight: 600,
  }),
};

const TableHead = ({
  order,
  orderBy,
  rowCount,
  numSelected,
  onRequestSort,
  onSelectAllClick,
}: TableProps) => {
  const headCells = useHeaderCell();

  const createSortHandler =
    (property: keyof Product) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHeadMui>
      <TableRow>
        <TableCell padding="checkbox" align="right">
          <Checkbox
            disableRipple
            color="primary"
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            sx={styles.checkbox}
          />
        </TableCell>
        {headCells.map((headCell) => {
          const isAction = headCell.id === "action";

          return (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? "center" : "left"}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={
                !isAction && orderBy === headCell.id ? order : false
              }
            >
              {isAction ? (
                headCell.label
              ) : (
                <TableSortLabel
                  active={orderBy === headCell.id}
                  sx={styles.label(headCell.numeric)}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={createSortHandler(headCell.id as keyof Product)}
                >
                  {headCell.label}
                  {headCell.icon && headCell.icon}
                </TableSortLabel>
              )}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHeadMui>
  );
};

export default TableHead;
