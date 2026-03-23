import { useRef, type ChangeEvent } from "react";

import {
  Badge,
  Box,
  Divider,
  Paper,
  TextField,
  Typography,
  type Theme,
} from "@mui/material";

import LanguageIcon from "@mui/icons-material/Language";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";

import EndAdornment from "../EndAdornment";
import { useProductSearchStore } from "../../store/useProductSearchStore";

const styles = {
  container: {
    height: "150px",
    bgcolor: "#F6F6F6",
  },
  papper: {
    px: 3,
    mb: 10,
    height: "102px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 2,
    borderRadius: "12px",
  },
  search: { flex: "1 1 auto", maxWidth: "1024px", minWidth: 0 },
  rootOutlined: {
    pl: 1.5,
    borderRadius: "8px",
    bgcolor: "#F6F6F6",
    height: (theme: Theme) => theme.spacing(6),
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  },

  iconColumnDivider: {
    alignSelf: "center",
    height: (theme: Theme) => `calc(${theme.spacing(6)} + 8px)`,
    mr: "100px",
  },
  iconRow: {
    display: "flex",
    alignItems: "center",
    flexShrink: 0,
  },
};

const Header = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { searchValue, setSearchValue } = useProductSearchStore();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleClear = () => {
    setSearchValue("");
    inputRef.current?.focus();
  };

  return (
    <Box sx={styles.container} pt={3}>
      <Paper sx={styles.papper} elevation={0}>
        <Typography fontWeight={600} variant="h5">
          Товары
        </Typography>
        <TextField
          name="search"
          sx={styles.search}
          value={searchValue}
          autoComplete="off"
          placeholder="Найти"
          slotProps={{
            input: {
              sx: { ...styles.rootOutlined },
              startAdornment: (
                <SearchIcon sx={{ color: "action.active", mr: 1 }} />
              ),
              endAdornment: searchValue && (
                <EndAdornment onClear={handleClear} />
              ),
            },
            htmlInput: {
              ref: inputRef,
            },
          }}
          onChange={handleChange}
        />
        <Box sx={styles.iconRow}>
          <Divider orientation="vertical" sx={styles.iconColumnDivider} />
          <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <LanguageIcon sx={{ color: "action.active" }} fontSize="medium" />
            <Badge
              badgeContent={12}
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "#797FEA",
                  color: "#fff",
                },
              }}
            >
              <NotificationsIcon
                sx={{ color: "action.active" }}
                fontSize="medium"
              />
            </Badge>
            <MailOutlineIcon
              sx={{ color: "action.active" }}
              fontSize="medium"
            />
            <TuneIcon
              sx={{
                color: "action.active",
                fontSize: "medium",
                transform: "rotate(90deg)",
              }}
            />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Header;
