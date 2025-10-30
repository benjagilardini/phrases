import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./NotFound.css";

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Box className="notfound-container">
      <div className="notfound-content">
        <Typography variant="h1" className="notfound-title">
          404
        </Typography>

        <Typography variant="h5" className="notfound-subtitle">
          {t("notFound.subtitle")}
        </Typography>

        <Typography variant="body1" className="notfound-text">
          {t("notFound.description")}
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
          className="notfound-button"
        >
          {t("notFound.button")}
        </Button>
      </div>
    </Box>
  );
};

export default NotFound;
