import React from "react";
import { useTranslation } from "react-i18next";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { LangSwitcher } from "../../components/LangSwitcher/LangSwitcher";
import "./AppToolbar.css";

type Props = {
  search: string;
  onSearchChange: (value: string) => void;
};

const AppToolbar: React.FC<Props> = ({ search, onSearchChange }) => {
  const { t } = useTranslation();

  const handleClear = () => onSearchChange("");

  return (
    <AppBar position="static" color="default" elevation={1} className="appbar">
      <Toolbar className="toolbar">
        <Typography variant="h6" component="h1" className="title" noWrap>
          {t("appTitle")}
        </Typography>

        <Box className="searchBox">
          <TextField
            size="small"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t("placeholder")}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
              endAdornment: search ? (
                <InputAdornment position="end">
                  <IconButton aria-label="clear search" onClick={handleClear} edge="end">
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ) : null,
            }}
          />
        </Box>
        <LangSwitcher />
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
