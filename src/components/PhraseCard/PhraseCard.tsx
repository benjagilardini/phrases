import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, Typography, IconButton, Box, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { Phrase } from "../../interfaces";
import { usePhrases } from "../../context/PhrasesContext";
import "./PhraseCard.css";

type PhraseCardProps = {
  phrase: Phrase;
};

const PhraseCard: React.FC<PhraseCardProps> = ({ phrase }) => {
  const { removePhrase, toggleFavorite, updatePhrase } = usePhrases();

  const [isEditing, setIsEditing] = useState(false);
  const [tempText, setTempText] = useState(phrase.text);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDelete = () => removePhrase(phrase.id);
  const handleFavorite = () => toggleFavorite(phrase.id);

  const handleEditToggle = () => {
    setIsEditing(true);
    setTempText(phrase.text);
  };

  const handleSubmitEdit = () => {
    const value = tempText.trim();
    if (value && value !== phrase.text) updatePhrase(phrase.id, { text: value });
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmitEdit();
    if (e.key === "Escape") setIsEditing(false);
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const formattedDate = React.useMemo(() => {
    const d = new Date(phrase.createdAt);
    return isNaN(d.getTime())
      ? ""
      : d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  }, [phrase.createdAt]);

  return (
    <Card className="phrase-card" elevation={1}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <IconButton
          className="favorite-btn"
          onClick={handleFavorite}
          aria-label="toggle favorite"
        >
          {phrase.favorite ? (
            <StarIcon className="favorite-icon active" />
          ) : (
            <StarBorderIcon className="favorite-icon" />
          )}
        </IconButton>
        {formattedDate && <span className="date">{formattedDate}</span>}
      </Box>

      <Box className="actions">
        {!isEditing && (
          <IconButton aria-label="edit phrase" size="small" onClick={handleEditToggle}>
            <EditIcon fontSize="small" />
          </IconButton>
        )}
        <IconButton aria-label="delete phrase" size="small" onClick={handleDelete}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>

      <CardContent className="content">
        {isEditing ? (
          <TextField
            inputRef={inputRef}
            fullWidth
            multiline
            variant="standard"
            value={tempText}
            onChange={(e) => setTempText(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSubmitEdit}
            className="edit-input"
          />
        ) : (
          <Typography variant="body1" className="text" title={phrase.text}>
            {phrase.text}
          </Typography>
        )}

        <div className="signature" title={phrase.author}>
          — {phrase.author}
        </div>
      </CardContent>
    </Card>
  );
};

export default PhraseCard;
