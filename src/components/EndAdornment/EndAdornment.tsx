import { IconButton } from "@mui/material";
import { Close as ClearIcon } from "@mui/icons-material";

const styles = {
  btn: {
    p: 0.5,
    ml: 1,
    "&:focus": {
      outline: "none",
    },
  },
};

const EndAdornment = ({ onClear }: { onClear: () => void }) => {
  return (
    <IconButton size="small" sx={styles.btn} onClick={onClear}>
      <ClearIcon fontSize="medium" />
    </IconButton>
  );
};

export default EndAdornment;
