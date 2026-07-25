import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Sama Consultation" },
      { name: "description", content: "Contactez l'équipe Sama Consultation. Poste de santé de Pikine, Route de Rufisque, Dakar, Sénégal." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [envoye, setEnvoye] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setEnvoye(true); }, 1200);
  };

  return (
    <div className="min-h-screen bg-white">

      {/* HERO */}
      <div className="bg-gradient-to-r from-brand to-pink-400 text-white py-20 px-4 text-center">
        <span className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-5">
          <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse" />
          Disponible · Réponse sous 24h
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Contactez-nous</h1>
        <p className="mt-4 text-white/80 text-lg max-w-xl mx-auto">
          Une question sur un rendez-vous, un partenariat ou notre service SMS ?
        </p>
      </div>

      {/* 3 CARTES RAPIDES */}
      <div className="mx-auto max-w-5xl px-4 -mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: "📞", label: "Téléphone", value: "+221 33 000 00 00", bg: "bg-pink-50", border: "border-pink-200" },
          { icon: "✉️", label: "E-mail", value: "contact@sama-consultation.sn", bg: "bg-purple-50", border: "border-purple-200" },
          { icon: "📍", label: "Adresse", value: "Route de Rufisque, Pikine, Dakar", bg: "bg-green-50", border: "border-green-200" },
        ].map((c) => (
          <div key={c.label} className={`${c.bg} border ${c.border} rounded-2xl p-5 flex items-start gap-4 shadow-sm bg-white`}>
            <span className="text-2xl">{c.icon}</span>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{c.label}</p>
              <p className="mt-0.5 text-sm font-semibold text-slate-800">{c.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* FORMULAIRE + INFOS */}
      <div className="mx-auto max-w-5xl px-4 py-14 grid gap-8 md:grid-cols-5">

        {/* Formulaire */}
        <div className="md:col-span-3 bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-brand/10 to-pink-100 px-8 py-6 border-b border-slate-100">
            <h2 className="text-xl font-bold text-slate-900">Envoyer un message</h2>
            <p className="text-sm text-slate-500 mt-1">Tous les champs marqués * sont obligatoires</p>
          </div>
          <form className="p-8 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nom complet *</label>
              <input type="text" required disabled={envoye} placeholder="Aïssatou Diop"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">E-mail *</label>
                <input type="email" required disabled={envoye} placeholder="vous@exemple.sn"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Téléphone *</label>
                <input type="tel" required disabled={envoye} placeholder="+221 77 000 00 00"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Sujet</label>
              <select disabled={envoye}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-brand outline-none transition-all text-slate-700">
                <option value="">Choisir un sujet...</option>
                <option>Question sur un rendez-vous</option>
                <option>Service SMS</option>
                <option>Partenariat</option>
                <option>Autre</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Message *</label>
              <textarea rows={5} required disabled={envoye} placeholder="Votre message..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all resize-none" />
            </div>
            {!envoye ? (
              <button type="submit" disabled={loading}
                className="w-full rounded-xl bg-brand py-3.5 text-white font-bold shadow-lg hover:bg-brand/90 transition-all flex items-center justify-center gap-2 disabled:opacity-60">
                {loading ? "Envoi en cours..." : "✉️ Envoyer le message"}
              </button>
            ) : (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-4 text-emerald-700 font-semibold flex items-center gap-2">
                ✅ Message envoyé ! Nous vous répondrons sous 24h.
              </div>
            )}
          </form>
        </div>

        {/* Infos */}
        <aside className="md:col-span-2 space-y-4">

          {/* Adresse */}
          <div className="bg-gradient-to-br from-brand to-pink-400 text-white rounded-3xl p-6 shadow-lg">
            <h2 className="font-bold text-lg mb-3">📍 Notre adresse</h2>
            <p className="text-white/90 text-sm leading-relaxed">
              Poste de santé de Pikine<br />Route de Rufisque<br />Dakar, Sénégal
            </p>
            <a href="https://maps.google.com/?q=Poste+de+sante+Pikine+Dakar"
              target="_blank" rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors">
              🗺️ Voir sur Google Maps
            </a>
          </div>

          {/* Horaires */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4">🕐 Horaires d'ouverture</h3>
            {[
              { jour: "Lundi — Vendredi", heure: "08h00 — 17h00", ouvert: true },
              { jour: "Samedi", heure: "08h00 — 13h00", ouvert: true },
              { jour: "Dimanche", heure: "Fermé", ouvert: false },
            ].map((h) => (
              <div key={h.jour} className="flex justify-between text-sm py-2 border-b border-slate-100 last:border-0">
                <span className="text-slate-600">{h.jour}</span>
                <span className={`font-bold ${h.ouvert ? "text-slate-900" : "text-slate-400"}`}>{h.heure}</span>
              </div>
            ))}
          </div>

          {/* Badge */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-5 flex items-center gap-3">
            <span className="text-2xl">🛡️</span>
            <div>
              <p className="font-bold text-emerald-800 text-sm">Centre partenaire vérifié</p>
              <p className="text-emerald-600 text-xs mt-0.5">En partenariat avec le Ministère de la Santé</p>
            </div>
          </div>

        </aside>
      </div>
    </div>
  );
}