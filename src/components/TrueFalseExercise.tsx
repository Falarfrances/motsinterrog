import { useState } from "react";

interface Props {
  number: number;
  statement: string;
  correct: boolean;
  explanation: string;
  onScore: (points: number) => void;
}

const TrueFalseExercise = ({ number, statement, correct, explanation, onScore }: Props) => {
  const [answer, setAnswer] = useState<boolean | null>(null);
  const [validated, setValidated] = useState(false);

  const handleValidate = () => {
    if (validated || answer === null) return;
    setValidated(true);
    onScore(answer === correct ? 1 : 0);
  };

  return (
    <div className="rounded-lg border border-border bg-card p-4 mb-4">
      <p className="font-semibold mb-3 text-card-foreground">
        <span className="text-primary font-bold mr-2">{number}.</span>
        {statement}
      </p>
      <div className="flex gap-3">
        {[true, false].map(val => (
          <button
            key={String(val)}
            onClick={() => !validated && setAnswer(val)}
            disabled={validated}
            className={`border rounded-md px-4 py-2 text-sm font-semibold transition ${
              validated
                ? val === correct
                  ? "border-success bg-success/10 text-success"
                  : answer === val
                    ? "border-destructive bg-destructive/10 text-destructive"
                    : "border-border text-muted-foreground"
                : answer === val
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border hover:border-primary/50 text-card-foreground"
            }`}
          >
            {val ? "✅ Vrai" : "❌ Faux"}
          </button>
        ))}
      </div>
      {!validated && (
        <button
          onClick={handleValidate}
          disabled={answer === null}
          className="mt-3 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-40 hover:opacity-90 transition"
        >
          Valider
        </button>
      )}
      {validated && (
        <p className={`mt-2 text-sm font-semibold ${answer === correct ? "text-success" : "text-destructive"}`}>
          {answer === correct ? "✅ Bonne réponse !" : "❌ Mauvaise réponse."} {explanation}
        </p>
      )}
    </div>
  );
};

export default TrueFalseExercise;
