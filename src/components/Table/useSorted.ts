import { useCallback, useMemo } from "react";
import type { Order, Product } from "../../types";

type useSortedProps = {
    order: Order;
    page: number;
    displayed: Product[];
    rowsPerPage: number;
    orderBy: keyof Product;
}


const useSorted = ({displayed,order,orderBy, page, rowsPerPage}: useSortedProps) => {

    const descendingComparator = <T,>(a: T, b: T, orderBy: keyof T): number =>{
        if (b[orderBy] < a[orderBy]) {
                return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        
        return 0;
    }

    const getComparator = useCallback(<Key extends PropertyKey>(
      order: Order,
      orderBy: Key,
    ): <T extends Record<Key, number | string>>(a: T, b: T) => number =>  {
      
      return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
    },
    []
  )

    const visibleRows = useMemo(
      () =>
        displayed
          .sort(getComparator(order, orderBy))
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
      [order, orderBy, page, rowsPerPage, displayed,getComparator],
    );

    return visibleRows
}

export default useSorted