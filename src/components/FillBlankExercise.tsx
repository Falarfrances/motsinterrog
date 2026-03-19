import { useState } from "react";

interface Props {
  number: number;
  question: string;
  answer: string;
  onScore: (points: number) => void;
}

const FillBlankExercise = ({ number, question, answer, onScore }: Props) => {
  const [value, setValue] = useState("");
  const [validated, setValidated] = useState(false);

  const handleValidate = () => {
    if (validated || !value.trim()) return;
    setValidated(true);
    onScore(value.trim().toLowerCase() === answer.toLowerCase() ? 1 : 0);
  };

  const isCorrect = value.trim().toLowerCase() === answer.toLowerCase();

  return (
    <div className="rounded-lg border border-border bg-card p-4 mb-4">
      <p className="font-semibold mb-3 text-card-foreground">
        <span className="text-primary font-bold mr-2">{number}.</span>
        {question}
      </p>
      <div className="flex gap-2 items-center flex-wrap">
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          disabled={validated}
          placeholder="Ta réponse..."
          className="border border-input rounded-md px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring w-48"
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
          {isCorrect ? "✅ Bonne réponse !" : `❌ Réponse correcte : ${answer}`}
        </p>
      )}
    </div>
  );
};

export default FillBlankExercise;
