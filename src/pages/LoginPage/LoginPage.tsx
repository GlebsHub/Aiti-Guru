import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Box,
  Link,
  Paper,
  alpha,
  Button,
  Divider,
  Checkbox,
  InputLabel,
  FormControl,
  OutlinedInput,
  FormHelperText,
  InputAdornment,
  Typography,
  type Theme,
} from "@mui/material";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import LockOutlineRoundedIcon from "@mui/icons-material/LockOutlineRounded";

import { LoginFailedError } from "../../api/auth/login";
import { useLoginMutation } from "../../hooks/useLoginMutation";
import Logo from "../../assets/Frame 1.svg";
import PasswordEdorment from "../../components/PasswordAdornment";
import EndAdornment from "../../components/EndAdornment";

type LoginFormValues = {
  login: string;
  password: string;
  remember: boolean;
};

const styles = {
  wrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  },
  papper: {
    p: 4,
    minWidth: 600,
    borderRadius: 5,
    minHeight: "704px",
    border: "4px solid #FFFFFF",
    background: (theme: Theme) =>
      `linear-gradient(1deg, rgba(0,0,0,0) 0%, ${alpha(
        theme.palette.grey[500],
        theme.palette.action.hoverOpacity,
      )} 100%)`,
  },
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  fieldsWrapper: {
    mt: 4,
    width: 475,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  button: {
    mt: 2.5,
    height: "54px",
    textTransform: "none",
    bgcolor: "#242EDB",
    borderRadius: "10px",
  },
  link: {
    ml: 1,
    color: "#242EDB",
    textUnderlineOffset: "0.2em",
    textDecorationThickness: "2px",
    textDecorationColor: "#242EDB",
  },
};

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { mutateAsync, isPending } = useLoginMutation();

  const loginInputRef = useRef<HTMLInputElement | null>(null);

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      login: "",
      password: "",
      remember: false,
    },
  });

  const login = watch("login");
  const password = watch("password");
  const disabled = !login?.trim() || !password?.trim() || isPending;

  const handleLoginClear = () => {
    setValue("login", "", { shouldDirty: true, shouldValidate: false });
    clearErrors("login");
    loginInputRef.current?.focus();
  };

  const onSubmit = handleSubmit(async (data) => {
    clearErrors(["login", "password"]);

    try {
      await mutateAsync({
        username: data.login,
        password: data.password,
        remember: data.remember,
      });
    } catch (e) {
      if (e instanceof LoginFailedError) {
        const errs = e.getFieldErrors();
        if (errs.login) setError("login", { message: errs.login });
        if (errs.password) setError("password", { message: errs.password });
      }
    }
  });

  return (
    <Box sx={styles.wrap}>
      <Paper elevation={1} sx={styles.papper}>
        <Box
          noValidate
          component="form"
          sx={styles.container}
          onSubmit={onSubmit}
        >
          <img src={Logo} alt="logo" style={{ marginTop: 6 }} />
          <Typography fontWeight={600} variant="h3" mt={3}>
            Добро пожаловать!
          </Typography>
          <Typography variant="h5" color="text.secondary" marginTop={2.5}>
            Пожалуйста, авторизуйтесь
          </Typography>
          <Box sx={styles.fieldsWrapper}>
            <Controller
              name="login"
              control={control}
              render={({ field }) => {
                const { ref: fieldRef, ...fieldProps } = field;
                return (
                  <FormControl
                    fullWidth
                    error={!!errors.login}
                    sx={{ minHeight: "80px" }}
                  >
                    <InputLabel htmlFor="login" sx={{ color: "text.primary" }}>
                      Логин
                    </InputLabel>
                    <OutlinedInput
                      {...fieldProps}
                      id="login"
                      label="Логин"
                      required
                      autoComplete="off"
                      inputRef={(el) => {
                        loginInputRef.current = el;
                        fieldRef(el);
                      }}
                      sx={{ borderRadius: "10px", width: "475px" }}
                      startAdornment={
                        <InputAdornment position="start">
                          <PermIdentityIcon sx={{ mr: 1 }} color="disabled" />
                        </InputAdornment>
                      }
                      endAdornment={<EndAdornment onClear={handleLoginClear} />}
                      onChange={(e) => {
                        field.onChange(e);
                        clearErrors("login");
                      }}
                    />
                    <FormHelperText>{errors.login?.message}</FormHelperText>
                  </FormControl>
                );
              }}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => {
                const { ref: fieldRef, ...fieldProps } = field;
                return (
                  <FormControl
                    fullWidth
                    error={!!errors.password}
                    sx={{ minHeight: "80px", mt: 2 }}
                  >
                    <InputLabel
                      htmlFor="password"
                      sx={{ color: "text.primary" }}
                    >
                      Пароль
                    </InputLabel>
                    <OutlinedInput
                      {...fieldProps}
                      id="password"
                      label="Пароль"
                      required
                      type={showPassword ? "text" : "password"}
                      inputRef={fieldRef}
                      sx={{ borderRadius: "10px", width: "475px" }}
                      startAdornment={
                        <InputAdornment position="start">
                          <LockOutlineRoundedIcon
                            sx={{ mr: 1 }}
                            color="disabled"
                          />
                        </InputAdornment>
                      }
                      endAdornment={
                        <PasswordEdorment
                          show={showPassword}
                          onShowPass={setShowPassword}
                        />
                      }
                      onChange={(e) => {
                        field.onChange(e);
                        clearErrors("password");
                      }}
                    />
                    <FormHelperText>{errors.password?.message}</FormHelperText>
                  </FormControl>
                );
              }}
            />
            <Controller
              name="remember"
              control={control}
              render={({ field }) => (
                <Box display="flex" alignItems="center" mt={1}>
                  <Checkbox
                    sx={{ ml: -1.5 }}
                    disableRipple
                    name="remember"
                    checked={field.value}
                    onChange={(_, checked) => field.onChange(checked)}
                  />
                  <Typography component="span" color="text.secondary">
                    Запомнить данные
                  </Typography>
                </Box>
              )}
            />
            <Button
              fullWidth
              type="submit"
              sx={styles.button}
              variant="contained"
              disabled={disabled}
            >
              <Typography
                fontWeight={600}
                display={"flex"}
                alignItems={"center"}
              >
                Войти
              </Typography>
            </Button>
          </Box>
        </Box>
        <Divider sx={{ mt: 2, mx: 8 }}>
          <Typography color="text.secondary">или</Typography>
        </Divider>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Typography color="text.secondary">Нет аккаунта?</Typography>
          <Link sx={styles.link} href="#">
            <Typography fontWeight={600}>Создать</Typography>
          </Link>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginPage;
