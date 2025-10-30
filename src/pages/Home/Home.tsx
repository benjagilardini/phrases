import React from "react";
import { Box } from "@mui/material";
import { Phrase } from "../../interfaces";
import { usePhrases } from "../../context/PhrasesContext";
import PhraseCard from "../../components/PhraseCard/PhraseCard";

const Home: React.FC = () => {
  const { phrases } = usePhrases();

  return (
    <Box sx={{ padding: 2, display: "grid", gap: 2, p: 2 }}>
      {phrases.map((phrase: Phrase) => (
        <PhraseCard key={phrase.id} phrase={phrase} />
      ))}
    </Box>
  );
};

export default Home;
