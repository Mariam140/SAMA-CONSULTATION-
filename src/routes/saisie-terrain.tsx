import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/saisie-terrain")({
  head: () => ({
    meta: [
      { title: "Saisie Données RDV — Sama Consultation" },
      {
        name: "description",
        content:
          "Agent terrain et secrétariat des centres de santé : saisissez les données observées en temps réel et générez une fiche avec l'assistant IA Sama Consultation.",
      },
      { property: "og:title", content: "Saisie Données RDV — Sama Consultation" },
      {
        property: "og:description",
        content:
          "Saisissez les données terrain (créneaux, disponibilités, observations) et générez une fiche synthétique via l'assistant IA.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Saisie Données RDV — Sama Consultation" },
      {
        name: "twitter:description",
        content:
          "Saisissez les données terrain et générez une fiche synthétique via l'assistant IA Sama Consultation.",
      },
    ],
  }),
  component: SaisieTerrainPage,
});

const EXEMPLES = [
  "Centre Pikine — 5 places demain matin",
  "Centre Guédiawaye — complet cette semaine",
];

const MAX_CHARS = 500;

function SaisieTerrainPage() {
  const [donnees, setDonnees] = useState("");
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [lastSaisie, setLastSaisie] = useState<string | null>(null);
  const [resultBadge, setResultBadge] = useState<"terrain" | "rag" | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    const hadDonnees = donnees.trim().length > 0;
    try {
      const res = await fetch("https://api.dify.ai/v1/workflows/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer app-XIEgbj96iTkwsvLljczkCwn2",
        },
        body: JSON.stringify({
          inputs: { query: question, donnees_terrain: donnees },
          response_mode: "blocking",
          user: "agent-terrain-allodoc",
        }),
      });
      if (!res.ok) throw new Error("network");
      const data = await res.json();
      const text = data?.data?.outputs?.text;
      if (!text) throw new Error("empty");
      setResult(String(text));
      setResultBadge(hadDonnees ? "terrain" : "rag");
      setLastSaisie(
        new Date().toLocaleString("fr-FR", {
          dateStyle: "short",
          timeStyle: "short",
        }),
      );
    } catch {
      setError("❌ Erreur — réessayer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative"
      style={{
        backgroundImage:
          "linear-gradient(135deg, rgba(236,72,153,0.10), rgba(34,197,94,0.10))",
      }}
    >
      <section className="mx-auto max-w-3xl px-4 sm:px-6 py-8 sm:py-12">
        <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: "#22C55E" }}>
          🏥 Saisie Données RDV
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600">
          Agent terrain / Secrétariat centre de santé — Données en temps réel
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="donnees" className="block text-sm font-semibold text-slate-900 mb-2">
              Données observées
            </label>

            <div className="mb-2 flex flex-wrap gap-2">
              {EXEMPLES.map((ex) => (
                <button
                  key={ex}
                  type="button"
                  onClick={() => setDonnees(ex)}
                  className="text-xs px-3 py-1.5 rounded-full border border-slate-300 bg-white text-slate-700 hover:border-[#22C55E] hover:text-[#16A34A] transition-colors"
                >
                  {ex}
                </button>
              ))}
            </div>

            <textarea
              id="donnees"
              rows={6}
              maxLength={MAX_CHARS}
              value={donnees}
              onChange={(e) => setDonnees(e.target.value)}
              placeholder="Ex: Centre Pikine 23/07 10h00 — Dr Diop : 3 places disponibles"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-[#22C55E]"
            />
            <div className="mt-1 text-right text-xs text-slate-500">
              {donnees.length}/{MAX_CHARS}
            </div>
          </div>

          <div>
            <label htmlFor="question" className="block text-sm font-semibold text-slate-900 mb-1">
              Votre question
            </label>
            <input
              id="question"
              type="text"
              required
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ex: Quels sont les créneaux disponibles cette semaine ?"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-[#22C55E]"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold text-white transition-colors disabled:opacity-60"
              style={{ backgroundColor: "#22C55E" }}
            >
              📋 Générer la fiche
            </button>
            {lastSaisie && (
              <p className="mt-2 text-xs text-slate-500">
                Dernière saisie : {lastSaisie}
              </p>
            )}
          </div>
        </form>

        {(loading || error || result) && (
          <div
            key={result ?? (error ? "err" : "loading")}
            className="mt-6 rounded-md border p-4 text-sm animate-in fade-in duration-500"
            style={{
              borderColor: error ? "#EC4899" : "#22C55E",
              backgroundColor: error ? "#FDF2F8" : "#F0FDF4",
              color: "#0f172a",
              whiteSpace: "pre-line",
            }}
          >
            {loading && <span>⏳ Génération en cours...</span>}
            {!loading && error && <span style={{ color: "#EC4899" }}>{error}</span>}
            {!loading && !error && result && (
              <>
                {resultBadge && (
                  <div className="mb-2">
                    <span
                      className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={
                        resultBadge === "terrain"
                          ? { backgroundColor: "#DCFCE7", color: "#166534" }
                          : { backgroundColor: "#FEF9C3", color: "#854D0E" }
                      }
                    >
                      {resultBadge === "terrain"
                        ? "🟢 Donnée terrain"
                        : "🟡 Base RAG (estimation)"}
                    </span>
                  </div>
                )}
                {result}
              </>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
