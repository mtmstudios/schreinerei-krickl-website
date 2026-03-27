import { useState } from "react";
import { MessageCircle, X, Send, CheckCircle } from "lucide-react";

type Step = "closed" | "open" | "success";

export default function ChatWidget() {
  const [step, setStep] = useState<Step>("closed");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/portal/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, message }),
      });
      const data = await res.json();
      if (data.success) {
        setStep("success");
      } else {
        setError(data.message || "Fehler beim Senden");
      }
    } catch {
      setError("Verbindungsfehler. Bitte erneut versuchen.");
    } finally {
      setSending(false);
    }
  }

  function reset() {
    setStep("closed");
    setName("");
    setPhone("");
    setMessage("");
    setError("");
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {/* Chat window */}
      {step !== "closed" && (
        <div className="bg-[#0E0E0E] border border-white/10 rounded-2xl shadow-2xl w-80 overflow-hidden">
          {/* Header */}
          <div className="bg-[#8B6F4E] px-5 py-4 flex items-center justify-between">
            <div>
              <p className="text-white text-sm font-semibold">Schreinerei Krickl</p>
              <p className="text-white/70 text-xs mt-0.5">Wir antworten schnellstmöglich</p>
            </div>
            <button
              onClick={reset}
              className="text-white/70 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {step === "success" ? (
            <div className="px-5 py-10 text-center">
              <CheckCircle size={36} className="mx-auto text-emerald-400 mb-3" />
              <p className="text-white text-sm font-medium">Nachricht gesendet!</p>
              <p className="text-[#9CA3AF] text-xs mt-1.5">
                Wir melden uns so schnell wie möglich bei Ihnen.
              </p>
              <button
                onClick={reset}
                className="mt-5 text-xs text-[#9CA3AF] hover:text-white transition-colors underline"
              >
                Schließen
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-5 space-y-3">
              <div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Ihr Name *"
                  className="w-full bg-[#161616] border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder-[#4B5563] focus:outline-none focus:border-[#8B6F4E] transition-colors"
                />
              </div>
              <div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Telefonnummer (optional)"
                  className="w-full bg-[#161616] border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder-[#4B5563] focus:outline-none focus:border-[#8B6F4E] transition-colors"
                />
              </div>
              <div>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={3}
                  placeholder="Ihr Anliegen *"
                  className="w-full bg-[#161616] border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder-[#4B5563] focus:outline-none focus:border-[#8B6F4E] transition-colors resize-none"
                />
              </div>

              {error && <p className="text-red-400 text-xs">{error}</p>}

              <button
                type="submit"
                disabled={sending}
                className="w-full bg-[#8B6F4E] hover:bg-[#7A6040] text-white text-sm font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Send size={14} />
                {sending ? "Senden…" : "Nachricht senden"}
              </button>

              <p className="text-[#4B5563] text-xs text-center">
                Oder rufen Sie uns an:{" "}
                <a href="tel:+49" className="hover:text-[#9CA3AF] transition-colors">
                  Direkt anrufen
                </a>
              </p>
            </form>
          )}
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => step === "closed" ? setStep("open") : reset()}
        className="w-14 h-14 bg-[#8B6F4E] hover:bg-[#7A6040] text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105 active:scale-95"
        aria-label="Chat öffnen"
      >
        {step === "closed" ? (
          <MessageCircle size={24} />
        ) : (
          <X size={22} />
        )}
      </button>
    </div>
  );
}
