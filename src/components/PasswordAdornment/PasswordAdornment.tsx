import { IconButton, InputAdornment } from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";

const PasswordAdornment = ({
  show,
  onShowPass,
}: {
  show: boolean;
  onShowPass: (value: boolean | ((prev: boolean) => boolean)) => void;
}) => {
  const handleClickShowPassword = () => onShowPass((prev: boolean) => !prev);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  return (
    <InputAdornment position="end">
      <IconButton
        size="small"
        sx={{ p: 0.5, ml: 1 }}
        aria-label={show ? "hide the password" : "display the password"}
        onClick={handleClickShowPassword}
        onMouseUp={handleMouseUpPassword}
        onMouseDown={handleMouseDownPassword}
      >
        {show ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  );
};

export default PasswordAdornment;
