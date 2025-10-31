import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreatePhraseForm from "./CreatePhraseForm";


jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, def?: string) => def ?? key,
  }),
}));

const mockAddPhrase = jest.fn();

jest.mock("../../../context/PhrasesContext", () => ({
  usePhrases: () => ({ addPhrase: mockAddPhrase }),
}));

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (q: string) => ({
      matches: false, media: q, onchange: null,
      addListener: () => { }, removeListener: () => { },
      addEventListener: () => { }, removeEventListener: () => { },
      dispatchEvent: () => false,
    }),
  });
});

beforeEach(() => {
  mockAddPhrase.mockReset();
});

describe("CreatePhraseForm", () => {
  test("deshabilita submit cuando está vacío y se habilita cuando es válido", async () => {
    render(<CreatePhraseForm />);

    const phraseInput = screen.getByLabelText("form.phraseLabel");
    const authorInput = screen.getByLabelText("form.authorLabel");
    const submitBtn = screen.getByRole("button", { name: "form.addButton" });

    expect(submitBtn).toBeDisabled();

    userEvent.type(authorInput, "Ada Lovelace");
    expect(submitBtn).toBeDisabled();

    userEvent.type(phraseInput, "Primera línea{enter}Segunda línea");
    await waitFor(() => expect(submitBtn).toBeEnabled());

    userEvent.clear(phraseInput);
    const fiveLines =
      "L1{enter}L2{enter}L3{enter}L4{enter}L5";
    userEvent.type(phraseInput, fiveLines);
    await waitFor(() => expect(submitBtn).toBeDisabled());
  });

  test("envía con click y resetea valores (autor vuelve a 'Yo')", async () => {
    render(<CreatePhraseForm />);

    const phraseInput = screen.getByLabelText("form.phraseLabel");
    const authorInput = screen.getByLabelText("form.authorLabel");
    const submitBtn = screen.getByRole("button", { name: "form.addButton" });

    await userEvent.type(phraseInput, "La vida es 10% lo que me ocurre…");
    await userEvent.clear(authorInput);
    await userEvent.type(authorInput, "Robert Collier");

    await userEvent.keyboard("{Escape}");
    await waitFor(() =>
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument()
    );

    await waitFor(() => expect(submitBtn).toBeEnabled());

    await userEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockAddPhrase).toHaveBeenCalledTimes(1);
      expect(mockAddPhrase).toHaveBeenCalledWith(
        "La vida es 10% lo que me ocurre…",
        "Robert Collier"
      );
    });

    await waitFor(() => {
      expect((phraseInput as HTMLInputElement).value).toBe("");
      expect((authorInput as HTMLInputElement).value).toBe("Yo");
    });
  });



  test("envía con Ctrl/⌘ + Enter y usa autor por defecto", async () => {
    render(<CreatePhraseForm />);

    const phrase = screen.getByLabelText("form.phraseLabel") as HTMLTextAreaElement;

    phrase.focus();
    userEvent.type(phrase, "Otra frase válida");

    fireEvent.keyDown(phrase, {
      key: "Enter",
      code: "Enter",
      ctrlKey: true,
      metaKey: false,
    });

    await waitFor(() => {
      expect(mockAddPhrase).toHaveBeenCalledTimes(1);
      expect(mockAddPhrase).toHaveBeenCalledWith("Otra frase válida", "Yo");
    });
  });
});
