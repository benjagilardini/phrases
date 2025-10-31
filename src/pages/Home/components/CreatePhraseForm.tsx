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
import { useForm, Controller } from "react-hook-form";

const filter = createFilterOptions<string>();

type FormValues = {
  text: string;
  author: string;
};

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

  const [open, setOpen] = useState<boolean>(!isMobile);
  useEffect(() => {
    setOpen(!isMobile);
  }, [isMobile]);

  const {
    handleSubmit,
    control,
    register,
    reset,
    setValue,
    formState: { isValid },
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: { text: "", author: meLabel },
  });

  const countLines = (s: string) => (s.match(/\n/g)?.length ?? 0) + 1;

  const onSubmit = ({ text, author }: FormValues) => {
    const value = text.trim();
    const pickedAuthor = (author || meLabel).trim();
    if (!value) return;
    addPhrase(value, pickedAuthor);
    reset({ text: "", author: meLabel });
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
          aria-label={
            open
              ? t("form.collapse", "Ocultar formulario")
              : t("form.expand", "Mostrar formulario")
          }
          onClick={() => setOpen((v) => !v)}
          size="small"
        >
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <Divider />
        <CardContent component="form" onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
            {t("form.description")}
          </Typography>

          <Box sx={{ display: "grid", gap: 1.5 }}>
            <TextField
              label={t("form.phraseLabel")}
              placeholder={t("placeholder")}
              multiline
              minRows={3}
              maxRows={4}
              fullWidth
              {...register("text", {
                required: t("errors.required", "Campo requerido") as string,
                validate: (v) =>
                  countLines(v || "") <= 4 ||
                  (t("errors.maxLines", "Máximo 4 renglones") as string),
              })}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                  e.preventDefault();
                  handleSubmit(onSubmit)();
                }
              }}
            />
            <Controller
              name="author"
              control={control}
              rules={{
                required: t("errors.required", "Campo requerido") as string,
              }}
              render={({ field }) => (
                <Autocomplete
                  freeSolo
                  options={authorOptions}
                  value={field.value || ""}
                  onChange={(_e, newValue) => {
                    setValue("author", (newValue as string) || "", {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                  }}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);
                    const { inputValue } = params;
                    const exists = options.some(
                      (opt) => opt.toLowerCase() === inputValue.toLowerCase()
                    );
                    if (inputValue && !exists) filtered.push(inputValue);
                    return filtered;
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={t("form.authorLabel")}
                      placeholder={t("form.authorPlaceholder")}
                      onChange={(e) =>
                        setValue("author", e.target.value, {
                          shouldValidate: true,
                          shouldDirty: true,
                        })
                      }
                    />
                  )}
                />
              )}
            />

            <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
              <Button type="submit" variant="contained" disabled={!isValid}>
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
