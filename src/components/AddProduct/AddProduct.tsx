import { Controller, useForm } from "react-hook-form";

import {
  Box,
  Button,
  Stack,
  Dialog,
  TextField,
  Typography,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@mui/material";

import useAddProduct from "../../store/useAddProduct";
import { useAddProductToCache } from "../../hooks/useAddProductToCache";

type AddProductFormValues = {
  title: string;
  brand: string;
  sku: string;
  rating: string;
  price: string;
};

const defaultValues: AddProductFormValues = {
  title: "",
  brand: "",
  sku: "",
  rating: "",
  price: "",
};

const styles = {
  dialog: {
    "& form": {
      display: "flex",
      flexDirection: "column",
    },
    borderRadius: 5,
  },
  title: {
    justifyContent: "space-between",
    alignItems: "center",
  },
};

const AddProduct = () => {
  const { addProduct } = useAddProductToCache();
  const { isOpen, toggle, add } = useAddProduct();

  const {
    control,
    handleSubmit,
    reset,
    watch,
  } = useForm<AddProductFormValues>({
    defaultValues,
    mode: "onChange",
  });

  const title = watch("title");
  const brand = watch("brand");
  const sku = watch("sku");
  const rating = watch("rating");
  const price = watch("price");
  const disabled =
    !title?.trim() ||
    !brand?.trim() ||
    !sku?.trim() ||
    !rating?.trim() ||
    !price?.trim();

  const handleClose = () => {
    toggle();
    reset(defaultValues);
  };

  const onSubmit = handleSubmit((data) => {
    const ratingValue = parseFloat(data.rating);

    addProduct({
      title: data.title.trim(),
      price: Number(data.price),
      brand: data.brand.trim(),
      sku: data.sku.trim(),
      rating: ratingValue,
      category: "",
      stock: 0,
    });

    handleClose();
    add();
  });

  return (
    <>
      <Dialog
        fullWidth
        open={isOpen}
        maxWidth="md"
        sx={styles.dialog}
        slotProps={{
          paper: {
            sx: { borderRadius: 4 },
          },
        }}
        onClose={handleClose}
      >
        <DialogTitle fontWeight={600}>Добавление товара</DialogTitle>
        <Box
          noValidate
          component="form"
          onSubmit={onSubmit}
        >
          <DialogContent dividers>
            <Stack spacing={2} sx={{ width: 1, my: 4 }}>
              <Controller
                name="title"
                control={control}
                rules={{ required: "Заполните поле" }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    required
                    label="Название"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
              <Controller
                name="brand"
                control={control}
                rules={{ required: "Заполните поле" }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Вендор"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
              <Controller
                name="sku"
                control={control}
                rules={{ required: "Заполните поле" }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Артикул"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
              <Controller
                name="rating"
                control={control}
                rules={{
                  required: "Заполните поле",
                  validate: (v) => {
                    const n = parseFloat(v);
                    if (Number.isNaN(n) || n < 0 || n > 5) {
                      return "Рейтинг должен быть числом от 0 до 5";
                    }
                    return true;
                  },
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    type="number"
                    label="Оценка"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    slotProps={{
                      htmlInput: { min: 0, max: 5, step: "any" },
                    }}
                  />
                )}
              />
              <Controller
                name="price"
                control={control}
                rules={{
                  required: "Заполните поле",
                  validate: (v) => {
                    const n = Number(v);
                    if (Number.isNaN(n) || n < 0) {
                      return "Укажите корректную цену";
                    }
                    return true;
                  },
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    type="number"
                    label="Цена"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    slotProps={{
                      htmlInput: { min: 0, step: "any" },
                    }}
                  />
                )}
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ m: 1 }}>
            <Button
              variant="contained"
              sx={{ bgcolor: "#242EDB", textTransform: "none" }}
              onClick={handleClose}
            >
              <Typography fontWeight={600}> Отмена</Typography>
            </Button>
            <Button
              variant="contained"
              type="submit"
              sx={{ bgcolor: "#242EDB", textTransform: "none" }}
              disabled={disabled}
            >
              <Typography fontWeight={600}>Добавить</Typography>
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};

export default AddProduct;
