import React from "react";
import { Card, CardContent, Typography, IconButton, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Phrase } from "../../interfaces";
import { usePhrases } from "../../context/PhrasesContext";
import "./PhraseCard.css";

type Props = {
  phrase: Phrase;
  onEdit?: (phrase: Phrase) => void;
};

const PhraseCard: React.FC<Props> = ({ phrase, onEdit }) => {
  const { removePhrase } = usePhrases();

  const handleDelete = () => removePhrase(phrase.id);
  const handleEdit = () => onEdit?.(phrase);

  return (
    <Card className="phrase-card" elevation={1}>
      <CardContent className="phrase-content">
        <Typography
          variant="body1"
          className="phrase-text"
          title={phrase.text}
        >
          {phrase.text}
        </Typography>

        <Box className="phrase-actions">
          <IconButton
            aria-label="edit phrase"
            size="small"
            color="primary"
            onClick={handleEdit}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            aria-label="delete phrase"
            size="small"
            color="error"
            onClick={handleDelete}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PhraseCard;
