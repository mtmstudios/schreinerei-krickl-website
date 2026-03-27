import { useState } from "react";
import { useLocation } from "wouter";

export default function PortalLogin() {
  const [, navigate] = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/portal/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.success) {
        navigate("/portal");
      } else {
        setError(data.message || "Ungültige Anmeldedaten");
      }
    } catch {
      setError("Verbindungsfehler. Bitte erneut versuchen.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-[#8B6F4E]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#9CA3AF] font-medium">
              Schreinerei Krickl
            </span>
          </div>
          <h1 className="text-2xl font-semibold text-white">Portal-Login</h1>
          <p className="text-sm text-[#9CA3AF] mt-1">Ihr internes Anfragen-Dashboard</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-[#9CA3AF] mb-1.5 uppercase tracking-wide">
              Benutzername
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              className="w-full bg-[#161616] border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-[#4B5563] focus:outline-none focus:border-[#8B6F4E] transition-colors"
              placeholder="krickl"
            />
          </div>

          <div>
            <label className="block text-xs text-[#9CA3AF] mb-1.5 uppercase tracking-wide">
              Passwort
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full bg-[#161616] border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-[#4B5563] focus:outline-none focus:border-[#8B6F4E] transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#8B6F4E] hover:bg-[#7A6040] text-white font-medium py-3 rounded-lg text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {loading ? "Anmelden…" : "Anmelden"}
          </button>
        </form>

        <p className="text-center text-xs text-[#4B5563] mt-8">
          Powered by MTM Studios
        </p>
      </div>
    </div>
  );
}
