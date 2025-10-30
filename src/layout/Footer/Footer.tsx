import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import "./Footer.css";

const Footer: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Box
      component="footer"
      className="footer"
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderTop: `1px solid ${theme.palette.divider}`,
        color: theme.palette.text.secondary,
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} {t("appTitle")} · {t("footer.rights")}
      </Typography>
    </Box>
  );
};

export default Footer;
