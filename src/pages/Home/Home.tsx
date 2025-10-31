import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { usePhrases } from "../../context/PhrasesContext";
import { useFilters } from "../../context/FiltersContext";
import PhraseCard from "../../components/PhraseCard/PhraseCard";
import CreatePhraseForm from "./components/CreatePhraseForm";

const Home: React.FC = () => {
  const { phrases } = usePhrases();
  const { search, setSearch } = useFilters();
  const { t } = useTranslation();

  const q = (search ?? "").trim().toLowerCase();
  const filtered = q ? phrases.filter((p) => p.text.toLowerCase().includes(q)) : phrases;

  const EmptyAll = (
    <Box
      sx={{
        height: "100%",
        minHeight: 260,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 1.5,
        border: (theme) => `1px dashed ${theme.palette.divider}`,
        borderRadius: 2,
        p: 3,
      }}
    >
      <Typography variant="subtitle1" color="text.primary" sx={{ fontWeight: 600 }}>
        {t("phrases.empty", "Todavía no hay frases, ¡creá la primera!")}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {t("phrases.emptyHint", "Usá el formulario de la izquierda para agregar tu primera frase.")}
      </Typography>
    </Box>
  );

  const EmptyByFilter = (
    <Box
      sx={{
        height: "100%",
        minHeight: 240,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 1.5,
        border: (theme) => `1px dashed ${theme.palette.divider}`,
        borderRadius: 2,
        p: 3,
      }}
    >
      <Typography variant="subtitle1" color="text.primary" sx={{ fontWeight: 600 }}>
        {t("phrases.noResults", "No hay resultados")}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {t("phrases.tryClear", "Probá borrar el filtro o modificá tu búsqueda.")}
      </Typography>
      <Button variant="outlined" onClick={() => setSearch("")}>
        {t("filters.clear", "Limpiar filtros")}
      </Button>
    </Box>
  );

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <CreatePhraseForm />
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          {phrases.length === 0 ? (
            EmptyAll
          ) : filtered.length === 0 ? (
            EmptyByFilter
          ) : (
            <Box
              sx={{
                display: "grid",
                gap: 2,
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                maxHeight: "calc(80vh)",
                overflowY: "auto",
                pr: 1.5,
              }}
            >
              {filtered.map((phrase) => (
                <PhraseCard key={phrase.id} phrase={phrase} />
              ))}
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
