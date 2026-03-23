import type { Product } from "../../types";
import CurrencyRubleIcon from "@mui/icons-material/CurrencyRuble";

type HeadCellId = keyof Product | "action" | "quantity";

interface HeadCell {
  label: string;
  numeric?: boolean;
  id: HeadCellId;
  disablePadding?: boolean;
  icon?: React.ReactNode;
}

const useHeaderCell = () => {
  const headCells: readonly HeadCell[] = [
    {
      id: "title",
      numeric: false,
      disablePadding: true,
      label: "Наименование",
    },
    {
      id: "brand",
      numeric: true,
      disablePadding: false,
      label: "Вендор",
    },
    {
      id: "sku",
      numeric: true,
      disablePadding: false,
      label: "Артикул",
    },
    {
      id: "rating",
      numeric: true,
      disablePadding: false,
      label: "Оценка",
    },
    {
      id: "price",
      numeric: true,
      disablePadding: false,
      label: "Цена,",
      icon: (
        <CurrencyRubleIcon
          sx={{
            fontSize: "1rem",
            fontWeight: 600,
            ml: 0.5,
            stroke: "currentColor",
            strokeWidth: 0.5,
          }}
        />
      ),
    },
    {
      id: "quantity",
      numeric: true,
      disablePadding: false,
      label: "Количество",
    },
    {
      id: "action",
      numeric: true,
      disablePadding: false,
      label: "",
    },
  ];

  return headCells;
};

export default useHeaderCell;
