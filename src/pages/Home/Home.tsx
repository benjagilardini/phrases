import React from "react";
import Box from "@mui/material/Box";
import { usePhrases } from "../../context/PhrasesContext";
import PhraseCard from "../../components/PhraseCard/PhraseCard";
import CreatePhraseForm from "./components/CreatePhraseForm";
import { Grid } from "@mui/material";

const Home: React.FC = () => {
  const { phrases } = usePhrases();

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <CreatePhraseForm />
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Box
            sx={{
              display: "grid",
              gap: 2,
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            }}
          >
            {phrases.map((phrase) => (
              <PhraseCard key={phrase.id} phrase={phrase} />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
