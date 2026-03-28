import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from "wouter";
import { MessageSquare, X, Send, ChevronRight } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────

type MsgRole = "bot" | "user";

interface ChatMsg {
  id: string;
  role: MsgRole;
  text: string;
}

interface QuickOption {
  label: string;
  value: string;
  next: string;
}

type StepType = "quick_reply" | "text_input" | "ai_input" | "done";

interface FlowStep {
  id: string;
  botTexts: string[];
  type: StepType;
  options?: QuickOption[];
  placeholder?: string;
  key?: "name" | "contact" | "ai_question";
  next?: string;
}

interface Collected {
  category?: string;
  detail?: string;
  budget?: string;
  name?: string;
  contact?: string;
}

// ── Conversation Flow ──────────────────────────────────────────────────────

const FLOW: Record<string, FlowStep> = {
  welcome: {
    id: "welcome",
    botTexts: ["Hallo! 👋 Womit kann ich Ihnen heute helfen?"],
    type: "quick_reply",
    options: [
      { label: "🍳 Küche planen", value: "Küche", next: "kueche_type" },
      { label: "🪵 Möbel nach Maß", value: "Möbel", next: "mobel_detail" },
      { label: "🔧 Reparatur & Service", value: "Reparatur", next: "repair_detail" },
      { label: "💬 Freie Frage stellen", value: "Sonstiges", next: "ask_ai" },
    ],
  },
  kueche_type: {
    id: "kueche_type",
    botTexts: ["Um welche Art von Küche geht es?"],
    type: "quick_reply",
    options: [
      { label: "Einbauküche", value: "Einbauküche", next: "budget" },
      { label: "Kücheninsel", value: "Kücheninsel", next: "budget" },
      { label: "Komplettplanung", value: "Küchenplanung", next: "budget" },
    ],
  },
  mobel_detail: {
    id: "mobel_detail",
    botTexts: ["Was soll gefertigt werden?"],
    type: "quick_reply",
    options: [
      { label: "Kleiderschrank", value: "Kleiderschrank", next: "budget" },
      { label: "Badmöbel", value: "Badmöbel", next: "budget" },
      { label: "Wohnzimmermöbel", value: "Wohnzimmermöbel", next: "budget" },
      { label: "Büromöbel", value: "Büromöbel", next: "budget" },
    ],
  },
  repair_detail: {
    id: "repair_detail",
    botTexts: ["Was soll repariert oder erneuert werden?"],
    type: "quick_reply",
    options: [
      { label: "Tür / Fenster", value: "Tür/Fenster", next: "ask_ai" },
      { label: "Möbelstück", value: "Möbelstück", next: "ask_ai" },
      { label: "Küche", value: "Küche (Reparatur)", next: "ask_ai" },
    ],
  },
  budget: {
    id: "budget",
    botTexts: ["Was ist Ihr ungefähres Budget?"],
    type: "quick_reply",
    options: [
      { label: "bis 5.000 €", value: "bis 5.000 €", next: "ask_ai" },
      { label: "5.000 – 15.000 €", value: "5.000–15.000 €", next: "ask_ai" },
      { label: "über 15.000 €", value: "über 15.000 €", next: "ask_ai" },
    ],
  },
  // AI free-text step — powered by n8n + GPT-4o
  ask_ai: {
    id: "ask_ai",
    botTexts: ["Haben Sie noch eine spezifische Frage? Ich beantworte sie sofort."],
    type: "ai_input",
    placeholder: "Ihre Frage…",
    key: "ai_question",
    next: "get_name",
  },
  get_name: {
    id: "get_name",
    botTexts: ["Perfekt! Wie darf ich Sie ansprechen?"],
    type: "text_input",
    placeholder: "Ihr Name…",
    key: "name",
    next: "get_contact",
  },
  get_contact: {
    id: "get_contact",
    botTexts: ["Und wie können wir Sie am besten erreichen?"],
    type: "text_input",
    placeholder: "Telefon oder E-Mail…",
    key: "contact",
    next: "submit",
  },
  done: {
    id: "done",
    botTexts: [
      "Vielen Dank! ✓",
      "Wir melden uns innerhalb von 24 Stunden persönlich bei Ihnen.",
    ],
    type: "done",
  },
};

// ── Helpers ────────────────────────────────────────────────────────────────

let _uid = 0;
const uid = () => String(++_uid);
const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());

// ── Component ──────────────────────────────────────────────────────────────

export default function ChatWidget() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [activeStep, setActiveStep] = useState<FlowStep | null>(null);
  const [inputVal, setInputVal] = useState("");
  const [typing, setTyping] = useState(false);
  const [collected, setCollected] = useState<Collected>({});
  const [done, setDone] = useState(false);
  const [pulsing, setPulsing] = useState(false);
  const [unread, setUnread] = useState(true);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const initialized = useRef(false);

  // Bounce FAB after 8 s
  useEffect(() => {
    const t = setTimeout(() => setPulsing(true), 8000);
    return () => clearTimeout(t);
  }, []);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing, activeStep]);

  // Focus text input
  useEffect(() => {
    if ((activeStep?.type === "text_input" || activeStep?.type === "ai_input") && open) {
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [activeStep, open]);

  // ── Flow engine ──────────────────────────────────────────────────────────

  const runStep = useCallback(
    (stepId: string, baseDelay = 500) => {
      const s = FLOW[stepId];
      if (!s) return;
      setActiveStep(null);
      setTyping(true);
      s.botTexts.forEach((text, i) => {
        setTimeout(() => {
          setMessages((prev) => [...prev, { id: uid(), role: "bot", text }]);
          if (i === s.botTexts.length - 1) {
            setTyping(false);
            setActiveStep(s);
          }
        }, baseDelay + i * 750);
      });
    },
    []
  );

  const handleOpen = () => {
    setOpen(true);
    setUnread(false);
    setPulsing(false);
    if (!initialized.current) {
      initialized.current = true;
      setTimeout(() => runStep("welcome", 200), 150);
    }
  };

  const handleClose = () => setOpen(false);

  // ── Quick reply ──────────────────────────────────────────────────────────

  const handleQuickReply = (opt: QuickOption) => {
    if (!activeStep) return;
    const sid = activeStep.id;
    setMessages((prev) => [...prev, { id: uid(), role: "user", text: opt.label }]);
    setActiveStep(null);
    setCollected((prev) => {
      const next = { ...prev };
      if (sid === "welcome") next.category = opt.value;
      else if (["kueche_type", "mobel_detail", "repair_detail"].includes(sid)) next.detail = opt.value;
      else if (sid === "budget") next.budget = opt.value;
      return next;
    });
    runStep(opt.next);
  };

  // ── AI question ───────────────────────────────────────────────────────────

  const handleAiQuestion = async (question: string) => {
    if (!question.trim()) {
      // User skipped — go to name
      runStep("get_name");
      return;
    }

    setMessages((prev) => [...prev, { id: uid(), role: "user", text: question }]);
    setInputVal("");
    setActiveStep(null);
    setTyping(true);

    try {
      const res = await fetch("/api/portal/chat-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          category: collected.category,
          detail: collected.detail,
          budget: collected.budget,
        }),
      });
      const data = await res.json();
      const reply: string =
        data.reply ||
        "Das ist eine gute Frage! Für eine detaillierte Antwort beraten wir Sie gerne persönlich.";

      setTimeout(() => {
        setMessages((prev) => [...prev, { id: uid(), role: "bot", text: reply }]);
        setTyping(false);
        runStep("get_name", 800);
      }, 400);
    } catch {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: uid(),
            role: "bot",
            text: "Gute Frage! Für eine detaillierte Beratung melden wir uns persönlich bei Ihnen.",
          },
        ]);
        setTyping(false);
        runStep("get_name", 800);
      }, 400);
    }
  };

  // ── Text input ────────────────────────────────────────────────────────────

  const handleTextSubmit = async () => {
    const val = inputVal.trim();
    if (!activeStep) return;

    // AI step: allow skip
    if (activeStep.type === "ai_input") {
      setInputVal("");
      setActiveStep(null);
      await handleAiQuestion(val);
      return;
    }

    if (!val) return;
    setMessages((prev) => [...prev, { id: uid(), role: "user", text: val }]);
    setInputVal("");
    const step = activeStep;
    setActiveStep(null);

    const next: Collected = { ...collected };
    if (step.key === "name") next.name = val;
    if (step.key === "contact") next.contact = val;
    setCollected(next);

    if (step.next === "submit") {
      setTyping(true);
      try {
        const emailContact = isEmail(next.contact || "");
        const subject =
          [next.category, next.detail, next.budget].filter(Boolean).join(" – ") ||
          "Chat-Anfrage";
        const summary = [
          next.category && `Kategorie: ${next.category}`,
          next.detail && `Detail: ${next.detail}`,
          next.budget && `Budget: ${next.budget}`,
          `Kontakt: ${next.contact}`,
        ]
          .filter(Boolean)
          .join("\n");

        await fetch("/api/portal/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: next.name,
            phone: !emailContact ? next.contact : undefined,
            email: emailContact ? next.contact : undefined,
            subject,
            intent: next.category,
            message: summary,
          }),
        });
      } catch {
        // Fail silently
      }
      setDone(true);
      runStep("done", 200);
    } else if (step.next) {
      runStep(step.next);
    }
  };

  // Portal-Seiten ausblenden
  if (location.startsWith("/portal")) return null;

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      {/* ── Chat Window ─────────────────────────────────────────────────── */}
      {open && (
        <div
          className="
            fixed bottom-[80px] right-3 sm:right-6 z-50
            w-[calc(100vw-24px)] sm:w-[370px]
            max-h-[75vh] sm:max-h-[560px]
            bg-[#0C0C0C] border border-white/10
            rounded-2xl shadow-2xl shadow-black/60
            flex flex-col overflow-hidden
            animate-in slide-in-from-bottom-3 fade-in duration-200
          "
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-white/8 bg-[#111] shrink-0">
            <div className="w-9 h-9 rounded-full bg-[#8B6F4E] flex items-center justify-center text-white font-bold text-xs shrink-0 ring-2 ring-[#8B6F4E]/30">
              K
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-semibold leading-tight">Krickl Assistent</p>
              <p className="text-[#9CA3AF] text-xs flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                Online · antwortet sofort
              </p>
            </div>
            <button
              onClick={handleClose}
              className="ml-auto text-[#4B5563] hover:text-white transition-colors p-1 rounded-lg hover:bg-white/5"
              aria-label="Chat schließen"
            >
              <X size={17} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-end gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "bot" && (
                  <div className="w-6 h-6 rounded-full bg-[#8B6F4E] flex items-center justify-center text-white text-[9px] font-bold shrink-0 mb-0.5">
                    K
                  </div>
                )}
                <div
                  className={`max-w-[78%] px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-[#8B6F4E] text-white rounded-2xl rounded-br-sm"
                      : "bg-[#1C1C1C] text-[#E5E7EB] border border-white/6 rounded-2xl rounded-bl-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <div className="flex items-end gap-2">
                <div className="w-6 h-6 rounded-full bg-[#8B6F4E] flex items-center justify-center text-white text-[9px] font-bold shrink-0">
                  K
                </div>
                <div className="bg-[#1C1C1C] border border-white/6 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5">
                  {[0, 150, 300].map((d) => (
                    <span
                      key={d}
                      className="w-1.5 h-1.5 rounded-full bg-[#9CA3AF] animate-bounce"
                      style={{ animationDelay: `${d}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quick replies */}
            {activeStep?.type === "quick_reply" && !typing && (
              <div className="flex flex-wrap gap-2 pt-1 pl-8">
                {activeStep.options?.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleQuickReply(opt)}
                    className="
                      px-3.5 py-2 rounded-xl text-sm
                      bg-[#1C1C1C] border border-[#8B6F4E]/35 text-white
                      hover:bg-[#8B6F4E] hover:border-[#8B6F4E]
                      transition-all duration-150 active:scale-95
                    "
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}

            {/* Done badge */}
            {done && !typing && activeStep?.type === "done" && (
              <div className="flex justify-center pt-2">
                <span className="text-xs text-[#9CA3AF] bg-[#111] border border-white/8 rounded-full px-3 py-1">
                  Anfrage gesendet ✓
                </span>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Text / AI input */}
          {(activeStep?.type === "text_input" || activeStep?.type === "ai_input") && !typing && (
            <div className="p-3 border-t border-white/8 shrink-0 space-y-2">
              {/* Skip option for AI step */}
              {activeStep.type === "ai_input" && (
                <button
                  onClick={() => {
                    setActiveStep(null);
                    runStep("get_name");
                  }}
                  className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-sm bg-[#1C1C1C] border border-white/8 text-[#9CA3AF] hover:text-white hover:border-white/15 transition-all"
                >
                  <span>Keine Frage — weiter</span>
                  <ChevronRight size={14} />
                </button>
              )}
              <div className="flex items-center gap-2 bg-[#161616] border border-white/10 rounded-xl px-3 py-2 focus-within:border-[#8B6F4E] transition-colors">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleTextSubmit()}
                  placeholder={activeStep.placeholder}
                  className="flex-1 bg-transparent text-white text-sm placeholder-[#4B5563] focus:outline-none min-w-0"
                />
                <button
                  onClick={handleTextSubmit}
                  disabled={activeStep.type === "text_input" && !inputVal.trim()}
                  className="w-8 h-8 rounded-lg bg-[#8B6F4E] disabled:opacity-25 flex items-center justify-center transition-opacity shrink-0 active:scale-90"
                >
                  <Send size={13} className="text-white" />
                </button>
              </div>
            </div>
          )}

          {/* Footer */}
          {done && !typing && (
            <div className="px-4 py-2 border-t border-white/6 shrink-0 text-center">
              <span className="text-[#4B5563] text-[11px]">Powered by MTM Studios</span>
            </div>
          )}
        </div>
      )}

      {/* ── FAB ─────────────────────────────────────────────────────────── */}
      <button
        onClick={() => (open ? handleClose() : handleOpen())}
        className={`
          fixed bottom-4 right-3 sm:right-6 z-50
          w-14 h-14 rounded-full
          bg-[#8B6F4E] hover:bg-[#7A6040]
          text-white shadow-xl shadow-black/50
          flex items-center justify-center
          transition-all duration-200 active:scale-90
          ${pulsing && !open ? "animate-bounce" : ""}
        `}
        aria-label={open ? "Chat schließen" : "Chat öffnen"}
      >
        {open ? <X size={22} /> : <MessageSquare size={22} />}

        {/* Unread dot */}
        {!open && unread && (
          <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-black animate-pulse" />
        )}
      </button>
    </>
  );
}
