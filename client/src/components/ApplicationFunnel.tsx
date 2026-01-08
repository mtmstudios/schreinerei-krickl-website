import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Hammer,
  GraduationCap,
  Award,
  ArrowLeft,
  ArrowRight,
  Check,
  X,
} from "lucide-react";

const positions = [
  { id: "schreiner", label: "Schreiner / Tischler (m/w/d)", icon: Hammer },
  { id: "geselle", label: "Schreinergeselle (m/w/d)", icon: Award },
  { id: "azubi", label: "Auszubildender Schreiner (m/w/d)", icon: GraduationCap },
];

const experienceLevels = [
  { id: "azubi", label: "Auszubildender" },
  { id: "berufseinsteiger", label: "Berufseinsteiger" },
  { id: "erfahren", label: "Mit Berufserfahrung" },
];

const startDates = [
  { id: "sofort", label: "Sofort" },
  { id: "3monate", label: "In 3 Monaten" },
  { id: "anderer", label: "Zu einem anderen Zeitpunkt" },
];

interface ApplicationFunnelProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedPosition?: string;
}

export default function ApplicationFunnel({
  isOpen,
  onClose,
  preselectedPosition,
}: ApplicationFunnelProps) {
  const [step, setStep] = useState(preselectedPosition ? 2 : 1);
  const [formData, setFormData] = useState({
    position: preselectedPosition || "",
    experience: "",
    startDate: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    console.log("Application submitted:", formData);
    setSubmitted(true);
  };

  const resetAndClose = () => {
    setStep(preselectedPosition ? 2 : 1);
    setFormData({
      position: preselectedPosition || "",
      experience: "",
      startDate: "",
      name: "",
      email: "",
      phone: "",
      message: "",
    });
    setSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  const totalSteps = preselectedPosition ? 4 : 5;
  const currentStep = preselectedPosition ? step - 1 : step;

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
        className="relative bg-background rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 md:p-8">
          <button
            onClick={resetAndClose}
            className="absolute top-4 right-4 p-2 rounded-md hover-elevate z-10"
            data-testid="button-close-application"
          >
            <X className="w-5 h-5" />
          </button>
          {!submitted ? (
            <>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-semibold">In 60 Sekunden bewerben</h2>
                  <span className="text-sm text-muted-foreground">
                    Schritt {currentStep}/{totalSteps}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  />
                </div>
              </div>

              <AnimatePresence mode="wait">
                {step === 1 && !preselectedPosition && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="font-medium text-lg">Für welche Stelle interessieren Sie sich?</h3>
                    <div className="space-y-3">
                      {positions.map((pos) => {
                        const Icon = pos.icon;
                        return (
                          <button
                            key={pos.id}
                            onClick={() => {
                              setFormData({ ...formData, position: pos.id });
                              setStep(2);
                            }}
                            className={`w-full flex items-center gap-4 p-4 rounded-lg border transition-all hover-elevate ${
                              formData.position === pos.id
                                ? "border-primary bg-primary/10"
                                : "border-border"
                            }`}
                            data-testid={`button-position-${pos.id}`}
                          >
                            <Icon className="w-8 h-8 text-primary flex-shrink-0" />
                            <span className="font-medium text-left">{pos.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="font-medium text-lg">Wie viel Erfahrung bringen Sie mit?</h3>
                    <div className="space-y-2">
                      {experienceLevels.map((level) => (
                        <button
                          key={level.id}
                          onClick={() => {
                            setFormData({ ...formData, experience: level.id });
                            setStep(3);
                          }}
                          className={`w-full text-left p-4 rounded-lg border transition-all hover-elevate ${
                            formData.experience === level.id
                              ? "border-primary bg-primary/10"
                              : "border-border"
                          }`}
                          data-testid={`button-experience-${level.id}`}
                        >
                          <span className="font-medium">{level.label}</span>
                        </button>
                      ))}
                    </div>
                    {!preselectedPosition && (
                      <Button variant="outline" onClick={() => setStep(1)} data-testid="button-app-step2-back">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Zurück
                      </Button>
                    )}
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="font-medium text-lg">Wann könnten Sie starten?</h3>
                    <div className="space-y-2">
                      {startDates.map((date) => (
                        <button
                          key={date.id}
                          onClick={() => {
                            setFormData({ ...formData, startDate: date.id });
                            setStep(4);
                          }}
                          className={`w-full text-left p-4 rounded-lg border transition-all hover-elevate ${
                            formData.startDate === date.id
                              ? "border-primary bg-primary/10"
                              : "border-border"
                          }`}
                          data-testid={`button-start-${date.id}`}
                        >
                          <span className="font-medium">{date.label}</span>
                        </button>
                      ))}
                    </div>
                    <Button variant="outline" onClick={() => setStep(2)} data-testid="button-app-step3-back">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Zurück
                    </Button>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="font-medium text-lg">Ihre Kontaktdaten</h3>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="app-name">Name</Label>
                        <Input
                          id="app-name"
                          placeholder="Max Mustermann"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          data-testid="input-app-name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="app-email">E-Mail</Label>
                        <Input
                          id="app-email"
                          type="email"
                          placeholder="max@beispiel.de"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          data-testid="input-app-email"
                        />
                      </div>
                      <div>
                        <Label htmlFor="app-phone">Telefon</Label>
                        <Input
                          id="app-phone"
                          type="tel"
                          placeholder="0711 / 123 456"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          data-testid="input-app-phone"
                        />
                      </div>
                    </div>
                    <div className="flex gap-3 pt-4">
                      <Button variant="outline" onClick={() => setStep(3)} data-testid="button-app-step4-back">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Zurück
                      </Button>
                      <Button
                        className="flex-1"
                        onClick={() => setStep(5)}
                        disabled={!formData.name || !formData.email || !formData.phone}
                        data-testid="button-app-step4-next"
                      >
                        Weiter
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {step === 5 && (
                  <motion.div
                    key="step5"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="font-medium text-lg">Möchten Sie uns noch etwas mitteilen?</h3>
                    <div>
                      <Label htmlFor="app-message">Nachricht (optional)</Label>
                      <Textarea
                        id="app-message"
                        placeholder="Was sollten wir über Sie wissen?"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={4}
                        data-testid="textarea-app-message"
                      />
                    </div>
                    <div className="flex gap-3 pt-4">
                      <Button variant="outline" onClick={() => setStep(4)} data-testid="button-app-step5-back">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Zurück
                      </Button>
                      <Button className="flex-1" onClick={handleSubmit} data-testid="button-submit-application">
                        Bewerbung absenden
                        <Check className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground text-center">
                      Kein Lebenslauf nötig. Wir melden uns schnellstmöglich bei Ihnen.
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
              <h3 className="text-xl font-semibold mb-2">Vielen Dank für Ihre Bewerbung!</h3>
              <p className="text-muted-foreground mb-6">
                Wir freuen uns über Ihr Interesse und melden uns schnellstmöglich bei Ihnen.
              </p>
              <Button onClick={resetAndClose} data-testid="button-app-close-success">
                Schließen
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
