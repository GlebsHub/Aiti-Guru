import { Alert, Fade, LinearProgress, Snackbar } from '@mui/material'
import useAddProduct from '../../store/useAddProduct';
import { useProductsPageState } from '../../hooks/useProductsPageState';
import { useDelayedLoader } from '../../hooks/useDelayLoader';
import Table from '../../components/Table';
import AddProduct from '../../components/AddProduct';


const MainPage = () => {
    const { isOpen, isAdded, close } = useAddProduct();

    const { loading, error } = useProductsPageState();
    const showLoader = useDelayedLoader(loading, 300);
    
  return (
     <>
      {loading && (
        <Fade in={showLoader} timeout={0}>
          <LinearProgress sx={{ width: "100%", mt: 2 }} />
        </Fade>
      )}
      {error && !loading && (
        <Alert severity="error" sx={{ mt: 2, width: "100%" }}>
          {error}
        </Alert>
      )}
      {!loading && !error && <Table />}
      {isOpen && <AddProduct />}
      <Snackbar open={isAdded} autoHideDuration={1000} onClose={close}>
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          Продукт добавлен
        </Alert>
      </Snackbar>
    </>
  )
}

export default MainPage