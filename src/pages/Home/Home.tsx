import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { Phrase } from "../../interfaces";
import { usePhrases } from "../../context/PhrasesContext";

const Home: React.FC = () => {
  const { phrases } = usePhrases();

  return (
    <Box sx={{ padding: 2, display: "grid", gap: 2 }}>
      {phrases.map((phrase: Phrase) => (
        <Card key={phrase.id} sx={{ backgroundColor: "background.paper", boxShadow: 1 }}>
          <CardContent>
            <Typography variant="body1" sx={{ color: "text.primary" }}>
              {phrase.text}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default Home;
