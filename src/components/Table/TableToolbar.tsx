import { Box, Button, Toolbar, Tooltip, Typography } from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FilterIcon from "@mui/icons-material/FilterListOutlined";
import useAddProduct from "../../store/useAddProduct";
import { useInvalidateProducts } from "../../hooks/useProductsPageState";

import type { Order, Product } from "../../types";
import useHeaderCell from "./useHeaderCell";

const cachedBase = {
  mr: 1,
  width: 36,
  height: 36,
  minWidth: 40,
  borderRadius: "8px",
  borderColor: "#ECECEB",
} as const;

const styles = {
  toolbar: { display: "flex", justifyContent: "space-between", flex: 1 },
  cached: { ...cachedBase },
  cachedRefresh: {
    ...cachedBase,
    transition:
      "background-color 0.15s ease, transform 0.1s ease, border-color 0.15s ease",
    "&:hover": {
      borderColor: "#D8D8D6",
      bgcolor: "rgba(0, 0, 0, 0.04)",
    },
    "&:active": {
      transform: "scale(0.94)",
      bgcolor: "rgba(0, 0, 0, 0.08)",
      borderColor: "#C8C8C6",
    },
  },
  icon: {
    color: "#515161",
    transform: "translateX(5px)",
  },
  addButton: {
    width: "142px",
    borderRadius: "8px",
    bgcolor: "#242EDB",
    textTransform: "none",
  },
};

type TableToolbarProps = {
  order: Order;
  orderBy: keyof Product;
  onToggleSortOrder: () => void;
};

const TableToolbar = ({
  order,
  orderBy,
  onToggleSortOrder,
}: TableToolbarProps) => {
  const { toggle } = useAddProduct();
  const refetchProducts = useInvalidateProducts();
  const headCells = useHeaderCell();
  const sortLabel =
    headCells.find((c) => c.id === orderBy)?.label ?? String(orderBy);

  return (
    <Toolbar>
      <Typography
        variant="h6"
        id="tableTitle"
        component="div"
        fontWeight={600}
        sx={styles.toolbar}
      >
        Все позиции
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Tooltip title="Обновить">
          <Box
            component="span"
            sx={{ display: "inline-flex", alignItems: "center", height: 36 }}
          >
            <Button
              sx={styles.cachedRefresh}
              variant="outlined"
              aria-label="Обновить"
              startIcon={<CachedIcon sx={styles.icon} />}
              onClick={refetchProducts}
            />
          </Box>
        </Tooltip>
        <Tooltip
          title={`${sortLabel}: ${order === "asc" ? "по возрастанию" : "по убыванию"} (сменить направление)`}
        >
          <Box
            component="span"
            sx={{ display: "inline-flex", alignItems: "center", height: 36 }}
          >
            <Button
              sx={styles.cachedRefresh}
              variant="outlined"
              aria-label={`Сортировка: ${sortLabel}, ${order === "asc" ? "по возрастанию" : "по убыванию"}`}
              startIcon={<FilterIcon sx={styles.icon} />}
              onClick={onToggleSortOrder}
            />
          </Box>
        </Tooltip>
        <Button
          disableRipple
          variant="contained"
          sx={styles.addButton}
          startIcon={<AddCircleOutlineIcon />}
          onClick={toggle}
        >
          <Typography fontWeight={600}> Добавить</Typography>
        </Button>
      </Box>
    </Toolbar>
  );
};

export default TableToolbar;
