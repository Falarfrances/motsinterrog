import { useState, useCallback } from "react";
import logo from "@/assets/logo-francais.png";
import motsInterrogatifs from "@/assets/mots-interrogatifs.png";
import MultipleChoiceExercise from "@/components/MultipleChoiceExercise";
import FillBlankExercise from "@/components/FillBlankExercise";
import ReorderExercise from "@/components/ReorderExercise";
import MatchingExercise from "@/components/MatchingExercise";
import TrueFalseExercise from "@/components/TrueFalseExercise";
import CorrectionExercise from "@/components/CorrectionExercise";
import ProductionSection from "@/components/ProductionSection";
import MemoryGame from "@/components/MemoryGame";

const tabs = [
  { id: "section1", label: "📝 Exercices 1–5" },
  { id: "section2", label: "✏️ Exercices 6–10" },
  { id: "section3", label: "🧩 Exercices 11–15" },
  { id: "production", label: "🗣️ Production" },
  { id: "annexe", label: "📖 Annexe" },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState("section1");
  const [scores, setScores] = useState<Record<number, number>>({});
  const [key, setKey] = useState(0);

  const handleScore = useCallback((exNum: number) => (points: number) => {
    setScores(prev => ({ ...prev, [exNum]: points }));
  }, []);

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  const totalAnswered = Object.keys(scores).length;

  const getScoreMessage = () => {
    if (totalAnswered < 15) return null;
    if (totalScore >= 13) return { text: "🌟 Excellent ! Tu maîtrises les mots interrogatifs !", color: "text-success" };
    if (totalScore >= 10) return { text: "👏 Très bien ! Encore un petit effort pour la perfection.", color: "text-primary" };
    if (totalScore >= 7) return { text: "💪 Pas mal ! Revois les exercices où tu as fait des erreurs.", color: "text-secondary-foreground" };
    return { text: "📚 Continue à pratiquer ! Regarde la vidéo et recommence.", color: "text-destructive" };
  };

  const handleRestart = () => {
    setScores({});
    setActiveTab("section1");
    setKey(prev => prev + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scoreMsg = getScoreMessage();

  return (
    <div className="min-h-screen bg-background" key={key}>
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-3xl mx-auto px-4 py-6 flex flex-col items-center">
          <img src={logo} alt="Vou Falar Francês" className="h-16 md:h-20 mb-3" />
          <h1 className="text-2xl md:text-3xl font-display text-foreground text-center">
            Les Mots Interrogatifs
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Niveau A1 — Les 8 mots clés pour poser des questions</p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6">
        {/* Video */}
        <section className="mb-8">
          <h2 className="text-lg font-display text-foreground mb-3">🎬 Vidéo de la leçon</h2>
          <div className="relative w-full rounded-lg overflow-hidden border border-border" style={{ paddingBottom: "56.25%" }}>
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/klNdPPfJM2U"
              title="Les mots interrogatifs"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </section>

        {/* Score bar */}
        <div className="mb-6 rounded-lg bg-muted p-3 flex items-center justify-between flex-wrap gap-2">
          <span className="text-sm font-semibold text-foreground">
            Score : <span className="text-primary">{totalScore}</span> / 15
          </span>
          <span className="text-sm text-muted-foreground">{totalAnswered} / 15 exercices complétés</span>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 overflow-x-auto pb-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap px-3 py-2 rounded-md text-sm font-semibold transition ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Section 1: QCM 1–5 */}
        {activeTab === "section1" && (
          <div>
            <h2 className="text-lg font-display text-foreground mb-4">Choix multiple (1–5)</h2>
            <MultipleChoiceExercise
              number={1}
              question="______ tu habites ?"
              options={[
                { label: "a) Qui", correct: false },
                { label: "b) Où", correct: true },
                { label: "c) Quand", correct: false },
              ]}
              onScore={handleScore(1)}
            />
            <MultipleChoiceExercise
              number={2}
              question="______ est ton professeur ?"
              options={[
                { label: "a) Qui", correct: true },
                { label: "b) Quoi", correct: false },
                { label: "c) Combien", correct: false },
              ]}
              onScore={handleScore(2)}
            />
            <MultipleChoiceExercise
              number={3}
              question="Tu pars ______ ?"
              options={[
                { label: "a) combien", correct: false },
                { label: "b) quand", correct: true },
                { label: "c) qui", correct: false },
              ]}
              onScore={handleScore(3)}
            />
            <MultipleChoiceExercise
              number={4}
              question="Tu fais ______ ce soir ?"
              options={[
                { label: "a) quoi", correct: true },
                { label: "b) où", correct: false },
                { label: "c) comment", correct: false },
              ]}
              onScore={handleScore(4)}
            />
            <MultipleChoiceExercise
              number={5}
              question="______ coûte ce billet ?"
              options={[
                { label: "a) Qui", correct: false },
                { label: "b) Combien", correct: true },
                { label: "c) Quel", correct: false },
              ]}
              onScore={handleScore(5)}
            />
          </div>
        )}

        {/* Section 2: Fill + Reorder (6–10) */}
        {activeTab === "section2" && (
          <div>
            <h2 className="text-lg font-display text-foreground mb-4">À compléter (6–8)</h2>
            <FillBlankExercise
              number={6}
              question="______ tu t'appelles ?"
              answer="Comment"
              onScore={handleScore(6)}
            />
            <FillBlankExercise
              number={7}
              question="______ est ton restaurant préféré ?"
              answer="Quel"
              onScore={handleScore(7)}
            />
            <FillBlankExercise
              number={8}
              question="______ va au cinéma avec toi ?"
              answer="Qui"
              onScore={handleScore(8)}
            />
            <h2 className="text-lg font-display text-foreground mb-4 mt-6">Réorganiser la phrase (9–10)</h2>
            <ReorderExercise
              number={9}
              words={["tu", "fais", "quoi", "?"]}
              acceptedAnswers={["Tu fais quoi ?", "Quoi tu fais ?"]}
              onScore={handleScore(9)}
            />
            <ReorderExercise
              number={10}
              words={["pars", "quand", "tu", "?"]}
              acceptedAnswers={["Quand pars-tu ?", "Tu pars quand ?"]}
              onScore={handleScore(10)}
            />
          </div>
        )}

        {/* Section 3: Match + VF + Correction + Piège (11–15) */}
        {activeTab === "section3" && (
          <div>
            <h2 className="text-lg font-display text-foreground mb-4">Association (11–12)</h2>
            <MatchingExercise
              number={11}
              pairs={[
                { left: "Où", rightLabel: "Lieu", correctRight: 1 },
                { left: "Qui", rightLabel: "Personne", correctRight: 0 },
                { left: "Combien", rightLabel: "Quantité", correctRight: 2 },
              ]}
              rightOptions={["Personne", "Lieu", "Quantité"]}
              onScore={handleScore(11)}
            />
            <MatchingExercise
              number={12}
              pairs={[
                { left: "Quand", rightLabel: "Moment", correctRight: 2 },
                { left: "Comment", rightLabel: "Manière", correctRight: 0 },
                { left: "Quel", rightLabel: "Définition/Choix", correctRight: 1 },
              ]}
              rightOptions={["Manière", "Définition/Choix", "Moment"]}
              onScore={handleScore(12)}
            />
            <h2 className="text-lg font-display text-foreground mb-4 mt-6">Vrai ou Faux (13)</h2>
            <TrueFalseExercise
              number={13}
              statement="« Comment » sert à parler du temps."
              correct={false}
              explanation="« Comment » sert à parler de la manière, pas du temps."
              onScore={handleScore(13)}
            />
            <h2 className="text-lg font-display text-foreground mb-4 mt-6">Correction d'erreur (14)</h2>
            <CorrectionExercise
              number={14}
              incorrectSentence="Qui tu habites ?"
              correctAnswer="Où tu habites ?"
              onScore={handleScore(14)}
            />
            <h2 className="text-lg font-display text-foreground mb-4 mt-6">Choix + piège (15)</h2>
            <MultipleChoiceExercise
              number={15}
              question="Tu veux aller au musée. Tu demandes :"
              options={[
                { label: "a) Où est le musée ?", correct: false },
                { label: "b) Comment aller au musée ?", correct: false },
                { label: "c) Les deux", correct: true },
              ]}
              explanation="En contexte réel, les deux questions sont possibles."
              onScore={handleScore(15)}
            />
          </div>
        )}

        {/* Production */}
        {activeTab === "production" && <ProductionSection />}

        {/* Annexe */}
        {activeTab === "annexe" && (
          <div>
            <h2 className="text-lg font-display text-foreground mb-4">📖 Les 8 Mots Interrogatifs</h2>
            <img
              src={motsInterrogatifs}
              alt="Les 8 mots clés pour poser des questions en français"
              className="w-full rounded-lg border border-border"
            />
          </div>
        )}

        {/* Final score */}
        {totalAnswered === 15 && (
          <div className="mt-8 rounded-lg border-2 border-primary bg-card p-6 text-center">
            <h2 className="text-2xl font-display text-foreground mb-2">Résultat final</h2>
            <p className="text-4xl font-bold text-primary mb-3">{totalScore} / 15</p>
            {scoreMsg && <p className={`text-lg font-semibold mb-4 ${scoreMsg.color}`}>{scoreMsg.text}</p>}
            <button
              onClick={handleRestart}
              className="rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground hover:opacity-90 transition"
            >
              🔄 Recommencer la leçon
            </button>
          </div>
        )}
      </main>

      <footer className="border-t border-border mt-12 py-4 text-center text-sm text-muted-foreground">
        Vou Falar Francês © {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default Index;
