import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";

type ServiceType = "moebel" | "kueche" | "terrasse" | "tueren" | "reparatur" | "sonder";

interface ServiceConfig {
  title: string;
  questions: {
    id: string;
    question: string;
    type: "choice" | "text" | "textarea";
    options?: { id: string; label: string }[];
    placeholder?: string;
  }[];
}

const serviceConfigs: Record<ServiceType, ServiceConfig> = {
  moebel: {
    title: "Möbelbau",
    questions: [
      {
        id: "furniture_type",
        question: "Was für ein Möbelstück schwebt Ihnen vor?",
        type: "choice",
        options: [
          { id: "schrank", label: "Schrank / Kleiderschrank" },
          { id: "regal", label: "Regal / Bücherregal" },
          { id: "tisch", label: "Tisch / Esstisch" },
          { id: "sideboard", label: "Sideboard / Kommode" },
          { id: "bett", label: "Bett / Bettrahmem" },
          { id: "sonstiges", label: "Sonstiges Möbelstück" },
        ],
      },
      {
        id: "room",
        question: "Für welchen Raum ist das Möbelstück gedacht?",
        type: "choice",
        options: [
          { id: "wohnzimmer", label: "Wohnzimmer" },
          { id: "schlafzimmer", label: "Schlafzimmer" },
          { id: "arbeitszimmer", label: "Arbeitszimmer / Büro" },
          { id: "flur", label: "Flur / Eingangsbereich" },
          { id: "kinderzimmer", label: "Kinderzimmer" },
          { id: "sonstiges", label: "Anderer Raum" },
        ],
      },
      {
        id: "material",
        question: "Haben Sie bereits eine Vorstellung vom Material?",
        type: "choice",
        options: [
          { id: "massivholz", label: "Massivholz" },
          { id: "furnier", label: "Furnier" },
          { id: "mdf", label: "MDF lackiert" },
          { id: "mix", label: "Materialmix" },
          { id: "unsicher", label: "Noch unsicher – bitte beraten" },
        ],
      },
    ],
  },
  kueche: {
    title: "Schreinerküche",
    questions: [
      {
        id: "kitchen_type",
        question: "Was für eine Küche planen Sie?",
        type: "choice",
        options: [
          { id: "komplett", label: "Komplette neue Küche" },
          { id: "erweiterung", label: "Erweiterung bestehender Küche" },
          { id: "arbeitsplatte", label: "Neue Arbeitsplatte" },
          { id: "fronten", label: "Neue Fronten / Austausch" },
        ],
      },
      {
        id: "kitchen_size",
        question: "Wie groß ist Ihre Küche ungefähr?",
        type: "choice",
        options: [
          { id: "klein", label: "Kleine Küche (bis 8 m²)" },
          { id: "mittel", label: "Mittlere Küche (8-15 m²)" },
          { id: "gross", label: "Große Küche (über 15 m²)" },
          { id: "unsicher", label: "Weiß ich nicht genau" },
        ],
      },
      {
        id: "appliances",
        question: "Sollen Geräte mit geplant werden?",
        type: "choice",
        options: [
          { id: "ja", label: "Ja, komplett mit Geräten" },
          { id: "teilweise", label: "Teilweise, einige Geräte vorhanden" },
          { id: "nein", label: "Nein, nur Möbel" },
        ],
      },
    ],
  },
  terrasse: {
    title: "Terrassen & Böden",
    questions: [
      {
        id: "floor_type",
        question: "Was möchten Sie umsetzen?",
        type: "choice",
        options: [
          { id: "terrasse", label: "Holzterrasse / Deck" },
          { id: "parkett", label: "Parkett / Holzboden innen" },
          { id: "dielen", label: "Massivholzdielen" },
          { id: "renovierung", label: "Bodenrenovierung / Abschleifen" },
        ],
      },
      {
        id: "floor_area",
        question: "Wie groß ist die Fläche ungefähr?",
        type: "choice",
        options: [
          { id: "klein", label: "Bis 20 m²" },
          { id: "mittel", label: "20-50 m²" },
          { id: "gross", label: "50-100 m²" },
          { id: "sehr_gross", label: "Über 100 m²" },
          { id: "unsicher", label: "Noch nicht vermessen" },
        ],
      },
      {
        id: "outdoor",
        question: "Handelt es sich um einen Außen- oder Innenbereich?",
        type: "choice",
        options: [
          { id: "aussen", label: "Außenbereich (Terrasse, Balkon)" },
          { id: "innen", label: "Innenbereich" },
          { id: "beides", label: "Beides" },
        ],
      },
    ],
  },
  tueren: {
    title: "Türen",
    questions: [
      {
        id: "door_type",
        question: "Um welche Art von Türen geht es?",
        type: "choice",
        options: [
          { id: "innen", label: "Innentüren" },
          { id: "haustuer", label: "Haustür / Eingangstür" },
          { id: "schiebe", label: "Schiebetüren" },
          { id: "glas", label: "Glastüren / mit Glaseinsatz" },
          { id: "zargen", label: "Türzargen / Rahmen" },
        ],
      },
      {
        id: "door_count",
        question: "Wie viele Türen werden benötigt?",
        type: "choice",
        options: [
          { id: "1", label: "1 Tür" },
          { id: "2-3", label: "2-3 Türen" },
          { id: "4-6", label: "4-6 Türen" },
          { id: "mehr", label: "Mehr als 6 Türen" },
        ],
      },
      {
        id: "door_situation",
        question: "Was ist die Ausgangssituation?",
        type: "choice",
        options: [
          { id: "neubau", label: "Neubau / neue Öffnung" },
          { id: "austausch", label: "Austausch bestehender Türen" },
          { id: "renovierung", label: "Renovierung / Aufarbeitung" },
        ],
      },
    ],
  },
  reparatur: {
    title: "Reparaturen",
    questions: [
      {
        id: "repair_type",
        question: "Was soll repariert werden?",
        type: "choice",
        options: [
          { id: "moebel", label: "Möbelstück" },
          { id: "tuer", label: "Tür / Fenster" },
          { id: "boden", label: "Boden / Parkett" },
          { id: "kueche", label: "Küchenelement" },
          { id: "sonstiges", label: "Sonstiges" },
        ],
      },
      {
        id: "repair_urgency",
        question: "Wie dringend ist die Reparatur?",
        type: "choice",
        options: [
          { id: "sofort", label: "Sehr dringend (Notfall)" },
          { id: "bald", label: "Zeitnah (nächste Wochen)" },
          { id: "flexibel", label: "Zeitlich flexibel" },
        ],
      },
      {
        id: "repair_description",
        question: "Beschreiben Sie kurz das Problem:",
        type: "textarea",
        placeholder: "z.B. Schublade klemmt, Türscharnier gebrochen, Kratzer in der Arbeitsplatte...",
      },
    ],
  },
  sonder: {
    title: "Sonderanfertigungen",
    questions: [
      {
        id: "special_type",
        question: "Um was für ein Projekt handelt es sich?",
        type: "choice",
        options: [
          { id: "ladenbau", label: "Ladenbau / Geschäftsausstattung" },
          { id: "praxis", label: "Praxis- / Büroeinrichtung" },
          { id: "innenausbau", label: "Kompletter Innenausbau" },
          { id: "einzelstueck", label: "Besonderes Einzelstück" },
          { id: "sonstiges", label: "Anderes Projekt" },
        ],
      },
      {
        id: "special_scope",
        question: "Wie würden Sie den Umfang einschätzen?",
        type: "choice",
        options: [
          { id: "klein", label: "Kleines Projekt (wenige Tage)" },
          { id: "mittel", label: "Mittleres Projekt (1-2 Wochen)" },
          { id: "gross", label: "Größeres Projekt (mehrere Wochen)" },
          { id: "unsicher", label: "Schwer einzuschätzen" },
        ],
      },
      {
        id: "special_description",
        question: "Erzählen Sie uns mehr über Ihre Idee:",
        type: "textarea",
        placeholder: "Beschreiben Sie Ihr Projekt so genau wie möglich...",
      },
    ],
  },
};

const timeframes = [
  { id: "asap", label: "So schnell wie möglich" },
  { id: "1month", label: "In den nächsten 4 Wochen" },
  { id: "3months", label: "In den nächsten 3 Monaten" },
  { id: "flexible", label: "Zeitlich flexibel" },
];

interface ServiceInquiryFunnelProps {
  isOpen: boolean;
  onClose: () => void;
  serviceType: ServiceType | null;
}

export default function ServiceInquiryFunnel({ isOpen, onClose, serviceType }: ServiceInquiryFunnelProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const config = serviceType ? serviceConfigs[serviceType] : null;
  const totalSteps = config ? config.questions.length + 2 : 0;

  useEffect(() => {
    if (isOpen) {
      setStep(0);
      setAnswers({});
      setContactData({ name: "", email: "", phone: "" });
      setSubmitted(false);
    }
  }, [isOpen, serviceType]);

  const handleSubmit = () => {
    console.log("Service inquiry submitted:", { serviceType, answers, contactData });
    setSubmitted(true);
  };

  const resetAndClose = () => {
    setStep(0);
    setAnswers({});
    setContactData({ name: "", email: "", phone: "" });
    setSubmitted(false);
    onClose();
  };

  if (!isOpen || !config) return null;

  const currentQuestion = step < config.questions.length ? config.questions[step] : null;
  const isTimeframeStep = step === config.questions.length;
  const isContactStep = step === config.questions.length + 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={resetAndClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-background rounded-xl shadow-2xl w-full max-w-lg overflow-hidden"
      >
        <button
          onClick={resetAndClose}
          className="absolute top-4 right-4 p-2 rounded-md hover-elevate z-10"
          data-testid="button-close-service-funnel"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 md:p-8">
          {!submitted ? (
            <>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-semibold">{config.title} anfragen</h2>
                  <span className="text-sm text-muted-foreground">
                    Schritt {step + 1}/{totalSteps}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
                  />
                </div>
              </div>

              <AnimatePresence mode="wait">
                {currentQuestion && (
                  <motion.div
                    key={`question-${step}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="font-medium text-lg">{currentQuestion.question}</h3>
                    
                    {currentQuestion.type === "choice" && currentQuestion.options && (
                      <div className="space-y-2">
                        {currentQuestion.options.map((option) => (
                          <button
                            key={option.id}
                            onClick={() => {
                              setAnswers({ ...answers, [currentQuestion.id]: option.id });
                              setStep(step + 1);
                            }}
                            className={`w-full text-left p-4 rounded-lg border transition-all hover-elevate ${
                              answers[currentQuestion.id] === option.id
                                ? "border-primary bg-primary/10"
                                : "border-border"
                            }`}
                            data-testid={`button-option-${option.id}`}
                          >
                            <span className="font-medium">{option.label}</span>
                          </button>
                        ))}
                      </div>
                    )}

                    {currentQuestion.type === "textarea" && (
                      <>
                        <Textarea
                          placeholder={currentQuestion.placeholder}
                          value={answers[currentQuestion.id] || ""}
                          onChange={(e) => setAnswers({ ...answers, [currentQuestion.id]: e.target.value })}
                          className="min-h-[120px]"
                          data-testid="textarea-description"
                        />
                        <div className="flex gap-3 pt-2">
                          {step > 0 && (
                            <Button variant="outline" onClick={() => setStep(step - 1)} data-testid="button-back">
                              <ArrowLeft className="w-4 h-4 mr-2" />
                              Zurück
                            </Button>
                          )}
                          <Button
                            className="flex-1"
                            onClick={() => setStep(step + 1)}
                            disabled={!answers[currentQuestion.id]}
                            data-testid="button-next"
                          >
                            Weiter
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </>
                    )}

                    {currentQuestion.type === "choice" && step > 0 && (
                      <Button variant="outline" onClick={() => setStep(step - 1)} data-testid="button-back">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Zurück
                      </Button>
                    )}
                  </motion.div>
                )}

                {isTimeframeStep && (
                  <motion.div
                    key="timeframe"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="font-medium text-lg">Wann soll es losgehen?</h3>
                    <div className="space-y-2">
                      {timeframes.map((tf) => (
                        <button
                          key={tf.id}
                          onClick={() => {
                            setAnswers({ ...answers, timeframe: tf.id });
                            setStep(step + 1);
                          }}
                          className={`w-full text-left p-4 rounded-lg border transition-all hover-elevate ${
                            answers.timeframe === tf.id
                              ? "border-primary bg-primary/10"
                              : "border-border"
                          }`}
                          data-testid={`button-timeframe-${tf.id}`}
                        >
                          <span className="font-medium">{tf.label}</span>
                        </button>
                      ))}
                    </div>
                    <Button variant="outline" onClick={() => setStep(step - 1)} data-testid="button-back">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Zurück
                    </Button>
                  </motion.div>
                )}

                {isContactStep && (
                  <motion.div
                    key="contact"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="font-medium text-lg">Fast geschafft! Ihre Kontaktdaten</h3>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          placeholder="Max Mustermann"
                          value={contactData.name}
                          onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                          data-testid="input-name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">E-Mail</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="max@beispiel.de"
                          value={contactData.email}
                          onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                          data-testid="input-email"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Telefon</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="0711 / 123 456"
                          value={contactData.phone}
                          onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                          data-testid="input-phone"
                        />
                      </div>
                    </div>
                    <div className="flex gap-3 pt-4">
                      <Button variant="outline" onClick={() => setStep(step - 1)} data-testid="button-back">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Zurück
                      </Button>
                      <Button
                        className="flex-1"
                        onClick={handleSubmit}
                        disabled={!contactData.name || !contactData.email || !contactData.phone}
                        data-testid="button-submit"
                      >
                        Anfrage absenden
                        <Check className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground text-center">
                      Unverbindlich und kostenlos. Wir melden uns schnellstmöglich bei Ihnen.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Vielen Dank für Ihre Anfrage!</h3>
              <p className="text-muted-foreground mb-6">
                Wir haben Ihre Anfrage für {config.title} erhalten und melden uns schnellstmöglich bei Ihnen.
              </p>
              <Button onClick={resetAndClose} data-testid="button-close-success">
                Schließen
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
