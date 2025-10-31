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
import { useFilters } from "../../context/FiltersContext";
import "./AppToolbar.css";

const AppToolbar: React.FC = () => {
  const { t } = useTranslation();
  const { search, setSearch } = useFilters();

  return (
    <AppBar position="static" elevation={1}>
      <Toolbar className="toolbar">
        <Typography variant="h6" component="h1" className="title">
          {t("appTitle")}
        </Typography>

        <Box className="searchBox">
          <TextField
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("placeholder")}
            fullWidth
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" color="action" />
                </InputAdornment>
              ),
              endAdornment: search ? (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="clear search"
                    onClick={() => setSearch("")}
                    edge="end"
                    size="small"
                  >
                    <ClearIcon fontSize="small" color="action" />
                  </IconButton>
                </InputAdornment>
              ) : null,
            }}
          />
        </Box>

        <div className="langBox">
          <LangSwitcher />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
