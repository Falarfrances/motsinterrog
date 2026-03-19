import { useState } from "react";

interface Props {
  number: number;
  incorrectSentence: string;
  correctAnswer: string;
  onScore: (points: number) => void;
}

const CorrectionExercise = ({ number, incorrectSentence, correctAnswer, onScore }: Props) => {
  const [value, setValue] = useState("");
  const [validated, setValidated] = useState(false);

  const normalize = (s: string) => s.trim().toLowerCase().replace(/\s+/g, " ");

  const handleValidate = () => {
    if (validated || !value.trim()) return;
    setValidated(true);
    onScore(normalize(value) === normalize(correctAnswer) ? 1 : 0);
  };

  const isCorrect = normalize(value) === normalize(correctAnswer);

  return (
    <div className="rounded-lg border border-border bg-card p-4 mb-4">
      <p className="font-semibold mb-2 text-card-foreground">
        <span className="text-primary font-bold mr-2">{number}.</span>
        Corrige cette phrase :
      </p>
      <p className="mb-3 text-destructive font-medium italic">« {incorrectSentence} »</p>
      <div className="flex gap-2 items-center flex-wrap">
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          disabled={validated}
          placeholder="Phrase corrigée..."
          className="border border-input rounded-md px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring flex-1 min-w-[200px]"
          onKeyDown={e => e.key === "Enter" && handleValidate()}
        />
        {!validated && (
          <button
            onClick={handleValidate}
            disabled={!value.trim()}
            className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-40 hover:opacity-90 transition"
          >
            Valider
          </button>
        )}
      </div>
      {validated && (
        <p className={`mt-2 text-sm font-semibold ${isCorrect ? "text-success" : "text-destructive"}`}>
          {isCorrect ? "✅ Bonne réponse !" : `❌ Réponse correcte : ${correctAnswer}`}
        </p>
      )}
    </div>
  );
};

export default CorrectionExercise;
