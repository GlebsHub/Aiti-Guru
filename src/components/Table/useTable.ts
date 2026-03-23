import { useCallback } from "react";

import type { Order, Product } from "../../types";

type UseTableParams = {
  order: Order;
  orderBy: keyof Product;
  setOrder: React.Dispatch<React.SetStateAction<Order>>;
  setOrderBy: React.Dispatch<React.SetStateAction<keyof Product>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  displayed: Product[];
  selected: readonly number[];
  setSelected: React.Dispatch<React.SetStateAction<readonly number[]>>;
};

const useTable = ({
  order,
  orderBy,
  setOrder,
  setOrderBy,
  setPage,
  displayed,
  selected,
  setSelected,
}: UseTableParams) => {
  const handleRequestSort = useCallback(
    (_: unknown, property: keyof Product) => {
      setPage(0);
      setOrderBy(property);
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
    },
    [order, orderBy, setOrder, setOrderBy, setPage],
  );

  const handleSelectAllClick = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        setSelected(displayed.map((n) => n.id));
        return;
      }
      setSelected([]);
    },
    [displayed, setSelected],
  );

  const handleClick = useCallback(
    (_: unknown, id: number) => {
      const selectedIndex = selected.indexOf(id);
      let newSelected: readonly number[] = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );
      }
      setSelected(newSelected);
    },
    [selected, setSelected],
  );

  return { handleClick, handleSelectAllClick, handleRequestSort };
};

export default useTable;
