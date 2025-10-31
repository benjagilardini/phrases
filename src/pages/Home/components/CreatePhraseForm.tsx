import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Autocomplete,
  createFilterOptions,
  Collapse,
  IconButton,
  useMediaQuery,
  useTheme,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useTranslation } from "react-i18next";
import { usePhrases } from "../../../context/PhrasesContext";

const filter = createFilterOptions<string>();

const CreatePhraseForm: React.FC = () => {
  const { addPhrase } = usePhrases();
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const meLabel = useMemo(() => t("form.me", "Yo"), [t]);

  const authorOptions = useMemo<string[]>(
    () => [
      meLabel,
      "Leonardo da Vinci",
      "Robert Collier",
      "Jerry Rice",
      "Muhammad Ali",
      "Pablo Picasso",
      "Gail Devers",
      "Walt Disney",
      "Napoleón Hill",
      "Confucio",
    ],
    [meLabel]
  );

  const [text, setText] = useState("");
  const [author, setAuthor] = useState<string>(meLabel);
  const [open, setOpen] = useState<boolean>(!isMobile);

  useEffect(() => {
    setOpen(!isMobile);
  }, [isMobile]);

  const handleAdd = () => {
    const value = text.trim();
    const pickedAuthor = (author || meLabel).trim();
    if (!value) return;
    addPhrase(value, pickedAuthor);
    setText("");
    setAuthor(meLabel);
    if (isMobile) setOpen(false);
  };

  return (
    <Card
      elevation={isMobile ? 3 : 1}
      sx={{
        position: isMobile ? "sticky" : "static",
        top: isMobile ? 8 : "auto",
        zIndex: isMobile ? theme.zIndex.appBar - 1 : "auto",
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          py: 1.25,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {t("form.title")}
        </Typography>
        <IconButton
          aria-label={open ? t("form.collapse", "Ocultar formulario") : t("form.expand", "Mostrar formulario")}
          onClick={() => setOpen((v) => !v)}
          size="small"
        >
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <Divider />
        <CardContent>
          <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
            {t("form.description")}
          </Typography>

          <Box sx={{ display: "grid", gap: 1.5 }}>
            <TextField
              label={t("form.phraseLabel")}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={t("placeholder")}
              multiline
              minRows={3}
              fullWidth
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                  e.preventDefault();
                  handleAdd();
                }
              }}
            />

            <Autocomplete
              value={author}
              onChange={(_e, newValue) => setAuthor(newValue || "")}
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              freeSolo
              options={authorOptions}
              filterOptions={(options, params) => {
                const filtered = filter(options, params);
                const { inputValue } = params;
                const isExisting = options.some(
                  (option) => option.toLowerCase() === inputValue.toLowerCase()
                );
                if (inputValue !== "" && !isExisting) {
                  filtered.push(inputValue);
                }
                return filtered;
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t("form.authorLabel")}
                  placeholder={t("form.authorPlaceholder")}
                />
              )}
            />

            <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                onClick={handleAdd}
                disabled={!text.trim()}
              >
                {t("form.addButton")}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default CreatePhraseForm;
