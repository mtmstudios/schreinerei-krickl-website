import { useState, useEffect, useCallback } from "react";
import { useLocation } from "wouter";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import {
  Phone, MessageSquare, CheckCircle2, Clock, AlertCircle,
  LogOut, ChevronDown, BarChart2, List, X, Save,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────

type Status = "new" | "in_progress" | "done";
type Source = "phone" | "chat";

interface Inquiry {
  id: string;
  createdAt: string;
  source: Source;
  callerPhone: string | null;
  callerName: string | null;
  callerEmail: string | null;
  subject: string | null;
  summary: string | null;
  intent: string | null;
  sentiment: string | null;
  emailBody: string | null;
  status: Status;
  internalNotes: string | null;
}

interface Stats {
  total: number;
  new: number;
  in_progress: number;
  done: number;
  phone: number;
  chat: number;
  topIntents: { name: string; count: number }[];
}

// ── Helpers ────────────────────────────────────────────────────────────────

const STATUS_LABELS: Record<Status, string> = {
  new: "Neu",
  in_progress: "In Bearbeitung",
  done: "Abgeschlossen",
};

const STATUS_COLORS: Record<Status, string> = {
  new: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  in_progress: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  done: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ── Subcomponents ──────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
  color: string;
}) {
  return (
    <div className="bg-[#0E0E0E] border border-white/8 rounded-xl p-5 flex items-center gap-4">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
        <Icon size={18} />
      </div>
      <div>
        <p className="text-2xl font-semibold text-white">{value}</p>
        <p className="text-xs text-[#9CA3AF] mt-0.5">{label}</p>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${STATUS_COLORS[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}

function StatusSelect({
  value,
  onChange,
}: {
  value: Status;
  onChange: (s: Status) => void;
}) {
  return (
    <div className="relative inline-flex items-center">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as Status)}
        className={`appearance-none pl-3 pr-8 py-1.5 rounded-full text-xs font-medium border cursor-pointer bg-transparent focus:outline-none ${STATUS_COLORS[value]}`}
      >
        <option value="new" className="bg-[#161616] text-white">Neu</option>
        <option value="in_progress" className="bg-[#161616] text-white">In Bearbeitung</option>
        <option value="done" className="bg-[#161616] text-white">Abgeschlossen</option>
      </select>
      <ChevronDown size={12} className="absolute right-2 pointer-events-none opacity-60" />
    </div>
  );
}

// ── Inquiry Detail Modal ───────────────────────────────────────────────────

function InquiryModal({
  inquiry,
  onClose,
  onUpdate,
}: {
  inquiry: Inquiry;
  onClose: () => void;
  onUpdate: (id: string, patch: { status?: Status; internalNotes?: string }) => void;
}) {
  const [status, setStatus] = useState<Status>(inquiry.status);
  const [notes, setNotes] = useState(inquiry.internalNotes || "");
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    await onUpdate(inquiry.id, { status, internalNotes: notes });
    setSaving(false);
  }

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-[#0E0E0E] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-white/8">
          <div className="flex-1 pr-4">
            <div className="flex items-center gap-2 mb-1">
              {inquiry.source === "phone" ? (
                <Phone size={14} className="text-[#8B6F4E]" />
              ) : (
                <MessageSquare size={14} className="text-[#8B6F4E]" />
              )}
              <span className="text-xs text-[#9CA3AF]">
                {inquiry.source === "phone" ? "Anruf" : "Chat"} · {formatDate(inquiry.createdAt)}
              </span>
            </div>
            <h2 className="text-white font-semibold text-lg leading-snug">
              {inquiry.subject || "Anfrage"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-[#9CA3AF] hover:text-white transition-colors mt-0.5"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Meta */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            {inquiry.callerPhone && (
              <div>
                <span className="text-[#4B5563] text-xs uppercase tracking-wide block mb-0.5">Telefon</span>
                <a href={`tel:${inquiry.callerPhone}`} className="text-white hover:text-[#8B6F4E]">
                  {inquiry.callerPhone}
                </a>
              </div>
            )}
            {inquiry.callerName && (
              <div>
                <span className="text-[#4B5563] text-xs uppercase tracking-wide block mb-0.5">Name</span>
                <span className="text-white">{inquiry.callerName}</span>
              </div>
            )}
            {inquiry.callerEmail && (
              <div>
                <span className="text-[#4B5563] text-xs uppercase tracking-wide block mb-0.5">E-Mail</span>
                <a href={`mailto:${inquiry.callerEmail}`} className="text-white hover:text-[#8B6F4E]">
                  {inquiry.callerEmail}
                </a>
              </div>
            )}
            {inquiry.sentiment && (
              <div>
                <span className="text-[#4B5563] text-xs uppercase tracking-wide block mb-0.5">Stimmung</span>
                <span className="text-white">{inquiry.sentiment}</span>
              </div>
            )}
          </div>

          {/* Summary */}
          {inquiry.summary && (
            <div>
              <span className="text-[#4B5563] text-xs uppercase tracking-wide block mb-1.5">
                {inquiry.source === "phone" ? "Zusammenfassung" : "Nachricht"}
              </span>
              <p className="text-[#9CA3AF] text-sm leading-relaxed bg-[#161616] rounded-lg p-4 border border-white/6">
                {inquiry.summary}
              </p>
            </div>
          )}

          {/* Intent */}
          {inquiry.intent && (
            <div>
              <span className="text-[#4B5563] text-xs uppercase tracking-wide block mb-1.5">Anliegen</span>
              <p className="text-[#9CA3AF] text-sm leading-relaxed bg-[#161616] rounded-lg p-4 border border-white/6">
                {inquiry.intent}
              </p>
            </div>
          )}

          {/* Email body */}
          {inquiry.emailBody && (
            <div>
              <span className="text-[#4B5563] text-xs uppercase tracking-wide block mb-1.5">Vollständige Zusammenfassung</span>
              <pre className="text-[#9CA3AF] text-xs leading-relaxed bg-[#161616] rounded-lg p-4 border border-white/6 whitespace-pre-wrap font-sans">
                {inquiry.emailBody}
              </pre>
            </div>
          )}

          {/* Status */}
          <div>
            <span className="text-[#4B5563] text-xs uppercase tracking-wide block mb-1.5">Status</span>
            <StatusSelect value={status} onChange={setStatus} />
          </div>

          {/* Internal notes */}
          <div>
            <span className="text-[#4B5563] text-xs uppercase tracking-wide block mb-1.5">Interne Notizen</span>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Notizen für das Team…"
              className="w-full bg-[#161616] border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-[#4B5563] focus:outline-none focus:border-[#8B6F4E] transition-colors resize-none"
            />
          </div>

          <button
            onClick={save}
            disabled={saving}
            className="flex items-center gap-2 bg-[#8B6F4E] hover:bg-[#7A6040] text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors disabled:opacity-50"
          >
            <Save size={14} />
            {saving ? "Speichern…" : "Speichern"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Inquiry Row ────────────────────────────────────────────────────────────

function InquiryRow({
  inquiry,
  onSelect,
  onStatusChange,
}: {
  inquiry: Inquiry;
  onSelect: (i: Inquiry) => void;
  onStatusChange: (id: string, status: Status) => void;
}) {
  return (
    <div
      className="bg-[#0E0E0E] border border-white/8 rounded-xl p-4 hover:border-white/15 transition-colors cursor-pointer"
      onClick={() => onSelect(inquiry)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            {inquiry.source === "phone" ? (
              <Phone size={13} className="text-[#8B6F4E] shrink-0" />
            ) : (
              <MessageSquare size={13} className="text-[#8B6F4E] shrink-0" />
            )}
            <span className="text-xs text-[#4B5563]">{formatDate(inquiry.createdAt)}</span>
            {inquiry.callerPhone && (
              <>
                <span className="text-[#4B5563]">·</span>
                <span className="text-xs text-[#9CA3AF]">{inquiry.callerPhone}</span>
              </>
            )}
            {inquiry.callerName && (
              <>
                <span className="text-[#4B5563]">·</span>
                <span className="text-xs text-[#9CA3AF]">{inquiry.callerName}</span>
              </>
            )}
          </div>
          <p className="text-white text-sm font-medium truncate">
            {inquiry.subject || "Anfrage"}
          </p>
          {inquiry.intent || inquiry.summary ? (
            <p className="text-[#9CA3AF] text-xs mt-1 line-clamp-1">
              {inquiry.intent || inquiry.summary}
            </p>
          ) : null}
        </div>

        <div
          className="shrink-0"
          onClick={(e) => e.stopPropagation()}
        >
          <StatusSelect
            value={inquiry.status}
            onChange={(s) => onStatusChange(inquiry.id, s)}
          />
        </div>
      </div>
    </div>
  );
}

// ── Main Portal ────────────────────────────────────────────────────────────

const TABS = [
  { key: "", label: "Alle" },
  { key: "new", label: "Neu" },
  { key: "in_progress", label: "In Bearbeitung" },
  { key: "done", label: "Abgeschlossen" },
] as const;

export default function Portal() {
  const [, navigate] = useLocation();
  const [view, setView] = useState<"list" | "analytics">("list");
  const [activeTab, setActiveTab] = useState<"" | Status>("");
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [loading, setLoading] = useState(true);

  // Auth check
  useEffect(() => {
    fetch("/api/portal/me")
      .then((r) => r.json())
      .then((d) => {
        if (!d.authenticated) navigate("/portal/login");
      })
      .catch(() => navigate("/portal/login"));
  }, [navigate]);

  const fetchInquiries = useCallback(async () => {
    const url = activeTab
      ? `/api/portal/inquiries?status=${activeTab}`
      : "/api/portal/inquiries";
    const res = await fetch(url);
    const data = await res.json();
    if (data.success) setInquiries(data.data);
    setLoading(false);
  }, [activeTab]);

  const fetchStats = useCallback(async () => {
    const res = await fetch("/api/portal/stats");
    const data = await res.json();
    if (data.success) setStats(data.data);
  }, []);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  async function handleStatusChange(id: string, status: Status) {
    await fetch(`/api/portal/inquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchInquiries();
    fetchStats();
  }

  async function handleUpdate(id: string, patch: { status?: Status; internalNotes?: string }) {
    const res = await fetch(`/api/portal/inquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    const data = await res.json();
    if (data.success) {
      setSelected(data.data);
      setInquiries((prev) => prev.map((i) => (i.id === id ? data.data : i)));
      fetchStats();
    }
  }

  async function handleLogout() {
    await fetch("/api/portal/logout", { method: "POST" });
    navigate("/portal/login");
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-white/8 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#8B6F4E]" />
          <span className="text-sm font-medium text-white">Schreinerei Krickl</span>
          <span className="text-[#4B5563]">·</span>
          <span className="text-sm text-[#9CA3AF]">Anfragen-Portal</span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 text-xs text-[#9CA3AF] hover:text-white transition-colors"
        >
          <LogOut size={13} />
          Abmelden
        </button>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            <StatCard label="Gesamt" value={stats.total} icon={List} color="bg-white/5 text-white" />
            <StatCard label="Neu" value={stats.new} icon={AlertCircle} color="bg-amber-500/10 text-amber-400" />
            <StatCard label="In Bearbeitung" value={stats.in_progress} icon={Clock} color="bg-blue-500/10 text-blue-400" />
            <StatCard label="Abgeschlossen" value={stats.done} icon={CheckCircle2} color="bg-emerald-500/10 text-emerald-400" />
          </div>
        )}

        {/* View toggle */}
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => setView("list")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm transition-colors ${
              view === "list"
                ? "bg-[#8B6F4E] text-white"
                : "bg-[#161616] text-[#9CA3AF] hover:text-white border border-white/8"
            }`}
          >
            <List size={14} />
            Anfragen
          </button>
          <button
            onClick={() => setView("analytics")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm transition-colors ${
              view === "analytics"
                ? "bg-[#8B6F4E] text-white"
                : "bg-[#161616] text-[#9CA3AF] hover:text-white border border-white/8"
            }`}
          >
            <BarChart2 size={14} />
            Auswertung
          </button>
        </div>

        {/* List view */}
        {view === "list" && (
          <>
            {/* Tabs */}
            <div className="flex items-center gap-1 mb-5 bg-[#0E0E0E] border border-white/8 rounded-xl p-1 w-fit">
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${
                    activeTab === tab.key
                      ? "bg-[#8B6F4E] text-white"
                      : "text-[#9CA3AF] hover:text-white"
                  }`}
                >
                  {tab.label}
                  {tab.key === "" && stats && (
                    <span className="ml-1.5 text-xs opacity-60">{stats.total}</span>
                  )}
                  {tab.key === "new" && stats && (
                    <span className="ml-1.5 text-xs opacity-60">{stats.new}</span>
                  )}
                  {tab.key === "in_progress" && stats && (
                    <span className="ml-1.5 text-xs opacity-60">{stats.in_progress}</span>
                  )}
                  {tab.key === "done" && stats && (
                    <span className="ml-1.5 text-xs opacity-60">{stats.done}</span>
                  )}
                </button>
              ))}
            </div>

            {/* List */}
            {loading ? (
              <div className="text-center text-[#9CA3AF] py-16 text-sm">Laden…</div>
            ) : inquiries.length === 0 ? (
              <div className="text-center py-16">
                <Phone size={32} className="mx-auto text-[#4B5563] mb-3" />
                <p className="text-[#9CA3AF] text-sm">Noch keine Anfragen vorhanden</p>
              </div>
            ) : (
              <div className="space-y-2">
                {inquiries.map((inquiry) => (
                  <InquiryRow
                    key={inquiry.id}
                    inquiry={inquiry}
                    onSelect={setSelected}
                    onStatusChange={handleStatusChange}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* Analytics view */}
        {view === "analytics" && stats && (
          <div className="space-y-6">
            {/* Source breakdown */}
            <div className="bg-[#0E0E0E] border border-white/8 rounded-xl p-6">
              <h3 className="text-sm font-medium text-white mb-4">Anfragen nach Quelle</h3>
              <div className="flex gap-4">
                <div className="flex items-center gap-3 bg-[#161616] rounded-lg p-4 flex-1">
                  <Phone size={20} className="text-[#8B6F4E]" />
                  <div>
                    <p className="text-xl font-semibold text-white">{stats.phone}</p>
                    <p className="text-xs text-[#9CA3AF]">Telefonanrufe</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-[#161616] rounded-lg p-4 flex-1">
                  <MessageSquare size={20} className="text-[#8B6F4E]" />
                  <div>
                    <p className="text-xl font-semibold text-white">{stats.chat}</p>
                    <p className="text-xs text-[#9CA3AF]">Chat-Anfragen</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Top intents */}
            {stats.topIntents.length > 0 && (
              <div className="bg-[#0E0E0E] border border-white/8 rounded-xl p-6">
                <h3 className="text-sm font-medium text-white mb-5">Häufigste Anliegen</h3>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart
                    data={stats.topIntents}
                    layout="vertical"
                    margin={{ left: 0, right: 20, top: 0, bottom: 0 }}
                  >
                    <XAxis type="number" hide />
                    <YAxis
                      type="category"
                      dataKey="name"
                      width={180}
                      tick={{ fill: "#9CA3AF", fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "#161616",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: 8,
                        color: "#fff",
                        fontSize: 12,
                      }}
                      formatter={(v: number) => [v, "Anfragen"]}
                    />
                    <Bar dataKey="count" radius={4} maxBarSize={24}>
                      {stats.topIntents.map((_, i) => (
                        <Cell key={i} fill={i === 0 ? "#8B6F4E" : "#2A2A2A"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {stats.topIntents.length === 0 && (
              <div className="bg-[#0E0E0E] border border-white/8 rounded-xl p-10 text-center">
                <BarChart2 size={32} className="mx-auto text-[#4B5563] mb-3" />
                <p className="text-[#9CA3AF] text-sm">
                  Noch keine Auswertung verfügbar. Sobald Anfragen eingehen, erscheinen hier die häufigsten Anliegen.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selected && (
        <InquiryModal
          inquiry={selected}
          onClose={() => setSelected(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}
