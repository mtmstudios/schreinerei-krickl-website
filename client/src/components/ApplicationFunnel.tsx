import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Hammer,
  DoorOpen,
  ArrowLeft,
  ArrowRight,
  Check,
  X,
  Upload,
  FileText,
  Image,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { submitToWebhook, validateFile } from "@/lib/formSubmit";

const FORM_ID = "bewerbung";

const positions = [
  { id: "moebelschreiner", label: "Möbelschreiner (m/w/d)", icon: Hammer },
  { id: "tuerenprofi", label: "Türenprofi / Monteur (m/w/d)", icon: DoorOpen },
];

const experienceLevels = [
  { id: "azubi", label: "Auszubildender / Azubi" },
  { id: "geselle", label: "Geselle" },
  { id: "meister", label: "Meister" },
  { id: "quereinsteiger", label: "Quereinsteiger" },
  { id: "viel_praxis", label: "Viele Jahre Praxis" },
];

const startDates = [
  { id: "sofort", label: "Ab sofort" },
  { id: "1monat", label: "In 1 Monat" },
  { id: "absprache", label: "Nach Absprache" },
];

const focusMoebelschreiner = [
  { id: "werkstatt", label: "Werkstatt" },
  { id: "montage", label: "Montage" },
  { id: "beides", label: "Beides" },
];

const focusTuerenprofi = [
  { id: "innentüren", label: "Innentüren" },
  { id: "zargen", label: "Zargen" },
  { id: "reparatur", label: "Reparatur" },
  { id: "alles", label: "Alles" },
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
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    position: preselectedPosition || "",
    name: "",
    phone: "",
    email: "",
    plz: "",
    experience: "",
    startDate: "",
    focus: "",
    message: "",
    honeypot: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);
  const fileInputId = "app-file-upload";

  useEffect(() => {
    if (preselectedPosition) {
      setFormData(prev => ({ ...prev, position: preselectedPosition }));
    }
  }, [preselectedPosition]);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        resetAndClose();
      }
    };
    
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const validation = validateFile(file);
      
      if (!validation.valid) {
        setValidationErrors([validation.error!]);
      } else {
        setValidationErrors([]);
        setFiles([file]); // Single file only
      }
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const getFocusOptions = () => {
    if (formData.position === "moebelschreiner") {
      return focusMoebelschreiner;
    }
    if (formData.position === "tuerenprofi") {
      return focusTuerenprofi;
    }
    return focusMoebelschreiner;
  };

  const validateStep1 = (): boolean => {
    const errors: string[] = [];
    if (!formData.position) errors.push("Bitte wähle eine Stelle aus.");
    if (!formData.name.trim()) errors.push("Bitte gib deinen Namen ein.");
    if (!formData.phone.trim()) errors.push("Bitte gib deine Telefonnummer ein.");
    if (!formData.plz.trim()) errors.push("Bitte gib deinen Wohnort/PLZ ein.");
    setValidationErrors(errors);
    return errors.length === 0;
  };

  const validateStep2 = (): boolean => {
    const errors: string[] = [];
    if (!formData.experience) errors.push("Bitte wähle deine Erfahrung aus.");
    if (!formData.startDate) errors.push("Bitte wähle einen Startzeitpunkt.");
    if (!formData.focus) errors.push("Bitte wähle deinen Schwerpunkt.");
    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setValidationErrors([]);
      setStep(2);
    }
  };

  const handleSubmit = async () => {
    if (formData.honeypot) {
      setSubmitted(true);
      return;
    }

    if (!validateStep1() || !validateStep2()) {
      return;
    }

    setIsSubmitting(true);
    setError(null);
    
    // Debug: Log files before submit
    if (import.meta.env.DEV) {
      console.log("[ApplicationFunnel] FILES LENGTH before submit:", files.length);
      files.forEach((f, i) => console.log(`[ApplicationFunnel] File ${i}:`, f.name));
    }
    
    try {
      // Get labels for human-readable values
      const positionLabel = positions.find(p => p.id === formData.position)?.label || formData.position;
      const experienceLabel = experienceLevels.find(e => e.id === formData.experience)?.label || formData.experience;
      const startDateLabel = startDates.find(s => s.id === formData.startDate)?.label || formData.startDate;
      const focusOptions = formData.position === "moebelschreiner" ? focusMoebelschreiner : focusTuerenprofi;
      const focusLabel = focusOptions.find(f => f.id === formData.focus)?.label || formData.focus;

      const result = await submitToWebhook(FORM_ID, {
        stelle: positionLabel,
        name: formData.name,
        telefon: formData.phone,
        email: formData.email || undefined,
        wohnort: formData.plz,
        erfahrung: experienceLabel,
        startdatum: startDateLabel,
        schwerpunkt: focusLabel,
        motivation: formData.message || undefined,
      }, files);
      
      if (result.ok) {
        setSubmitted(true);
      } else {
        setError(result.message || result.errors?.join(", ") || "Ein Fehler ist aufgetreten.");
      }
    } catch (err) {
      setError("Netzwerkfehler. Bitte versuche es später erneut.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setStep(1);
    setFormData({
      position: "",
      name: "",
      phone: "",
      email: "",
      plz: "",
      experience: "",
      startDate: "",
      focus: "",
      message: "",
      honeypot: "",
    });
    setFiles([]);
    setSubmitted(false);
    setError(null);
    setValidationErrors([]);
    onClose();
  };

  if (!isOpen) return null;

  const totalSteps = 2;
  const isStep1Valid = formData.position && formData.name && formData.phone && formData.plz;
  const isStep2Valid = formData.experience && formData.startDate && formData.focus;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="funnel-title"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={resetAndClose}
        aria-hidden="true"
      />
      <motion.div
        ref={modalRef}
        tabIndex={-1}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-background rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto focus:outline-none"
      >
        <div className="p-6 md:p-8">
          <button
            onClick={resetAndClose}
            className="absolute top-4 right-4 p-2 rounded-md hover-elevate z-10"
            aria-label="Schließen"
            data-testid="button-close-application"
          >
            <X className="w-5 h-5" />
          </button>
          {!submitted ? (
            <>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 id="funnel-title" className="text-xl font-semibold">In 60 Sekunden bewerben</h2>
                  <span className="text-sm text-muted-foreground">
                    Schritt {step}/{totalSteps}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden" role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={totalSteps}>
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${(step / totalSteps) * 100}%` }}
                  />
                </div>
              </div>

              {validationErrors.length > 0 && (
                <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm" role="alert">
                  <ul className="list-disc list-inside space-y-1">
                    {validationErrors.map((err, i) => (
                      <li key={i}>{err}</li>
                    ))}
                  </ul>
                </div>
              )}

              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-5"
                  >
                    <div>
                      <h3 className="font-medium text-lg mb-3">Für welche Stelle interessierst du dich?</h3>
                      <div className="space-y-3">
                        {positions.map((pos) => {
                          const Icon = pos.icon;
                          return (
                            <button
                              key={pos.id}
                              onClick={() => setFormData({ ...formData, position: pos.id, focus: "" })}
                              className={`w-full flex items-center gap-4 p-4 rounded-lg border transition-all hover-elevate ${
                                formData.position === pos.id
                                  ? "border-primary bg-primary/10"
                                  : "border-border"
                              }`}
                              aria-pressed={formData.position === pos.id}
                              data-testid={`button-position-${pos.id}`}
                            >
                              <Icon className="w-8 h-8 text-primary flex-shrink-0" />
                              <span className="font-medium text-left">{pos.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="space-y-3 pt-2">
                      <div>
                        <Label htmlFor="app-name">Name *</Label>
                        <Input
                          id="app-name"
                          placeholder="Max Mustermann"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          data-testid="input-app-name"
                          aria-required="true"
                        />
                      </div>
                      <div>
                        <Label htmlFor="app-phone">Telefon *</Label>
                        <Input
                          id="app-phone"
                          type="tel"
                          placeholder="0711 / 123 456"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          data-testid="input-app-phone"
                          aria-required="true"
                        />
                      </div>
                      <div>
                        <Label htmlFor="app-email">E-Mail (optional)</Label>
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
                        <Label htmlFor="app-plz">Wohnort / PLZ *</Label>
                        <Input
                          id="app-plz"
                          placeholder="73730 Esslingen"
                          value={formData.plz}
                          onChange={(e) => setFormData({ ...formData, plz: e.target.value })}
                          data-testid="input-app-plz"
                          aria-required="true"
                        />
                      </div>
                    </div>

                    <input
                      type="text"
                      name="website"
                      value={formData.honeypot}
                      onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                      style={{ position: "absolute", left: "-9999px" }}
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                    />

                    <div className="pt-4">
                      <Button
                        className="w-full"
                        size="lg"
                        onClick={handleNextStep}
                        disabled={!isStep1Valid}
                        data-testid="button-app-step1-next"
                      >
                        Weiter
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-5"
                  >
                    <div>
                      <h3 className="font-medium text-lg mb-3">Erfahrung</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {experienceLevels.map((level) => (
                          <button
                            key={level.id}
                            onClick={() => setFormData({ ...formData, experience: level.id })}
                            className={`text-left p-3 rounded-lg border transition-all hover-elevate text-sm ${
                              formData.experience === level.id
                                ? "border-primary bg-primary/10"
                                : "border-border"
                            }`}
                            aria-pressed={formData.experience === level.id}
                            data-testid={`button-experience-${level.id}`}
                          >
                            {level.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-lg mb-3">Wann kannst du starten?</h3>
                      <div className="grid grid-cols-3 gap-2">
                        {startDates.map((date) => (
                          <button
                            key={date.id}
                            onClick={() => setFormData({ ...formData, startDate: date.id })}
                            className={`text-left p-3 rounded-lg border transition-all hover-elevate text-sm ${
                              formData.startDate === date.id
                                ? "border-primary bg-primary/10"
                                : "border-border"
                            }`}
                            aria-pressed={formData.startDate === date.id}
                            data-testid={`button-start-${date.id}`}
                          >
                            {date.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-lg mb-3">Schwerpunkt</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {getFocusOptions().map((focus) => (
                          <button
                            key={focus.id}
                            onClick={() => setFormData({ ...formData, focus: focus.id })}
                            className={`text-left p-3 rounded-lg border transition-all hover-elevate text-sm ${
                              formData.focus === focus.id
                                ? "border-primary bg-primary/10"
                                : "border-border"
                            }`}
                            aria-pressed={formData.focus === focus.id}
                            data-testid={`button-focus-${focus.id}`}
                          >
                            {focus.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="app-message">Kurz was zu dir (optional)</Label>
                      <Textarea
                        id="app-message"
                        placeholder="Was sollten wir über dich wissen?"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={3}
                        data-testid="textarea-app-message"
                      />
                    </div>

                    <div>
                      <Label htmlFor={fileInputId}>Lebenslauf/Portfolio (optional)</Label>
                      <div className="flex flex-col gap-2 mt-1">
                        <label 
                          htmlFor={fileInputId}
                          className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-border rounded-lg cursor-pointer hover-elevate transition-all"
                        >
                          <Upload className="w-5 h-5 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Datei auswählen</span>
                        </label>
                        <input
                          id={fileInputId}
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleFileChange}
                          className="sr-only"
                          data-testid="input-app-file-upload"
                        />
                        {files.length > 0 && (
                          <div className="space-y-2">
                            {files.map((file, index) => (
                              <div key={index} className="flex items-center justify-between gap-2 p-2 bg-muted/50 rounded-md">
                                <div className="flex items-center gap-2 min-w-0">
                                  {file.type.includes('pdf') ? (
                                    <FileText className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                                  ) : (
                                    <Image className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                                  )}
                                  <span className="text-sm truncate">{file.name}</span>
                                </div>
                                <button
                                  onClick={() => removeFile(index)}
                                  className="p-1 rounded hover-elevate"
                                  aria-label={`${file.name} entfernen`}
                                  data-testid={`button-remove-app-file-${index}`}
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {error && (
                      <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm" role="alert">
                        {error}
                      </div>
                    )}

                    <div className="flex gap-3 pt-2">
                      <Button 
                        variant="outline" 
                        onClick={() => setStep(1)} 
                        data-testid="button-app-step2-back"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Zurück
                      </Button>
                      <Button 
                        className="flex-1" 
                        size="lg"
                        onClick={handleSubmit} 
                        disabled={isSubmitting || !isStep2Valid}
                        data-testid="button-submit-application"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Wird gesendet...
                          </>
                        ) : (
                          <>
                            Bewerbung absenden
                            <Check className="w-5 h-5 ml-2" />
                          </>
                        )}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground text-center">
                      Kein Lebenslauf nötig. Wir melden uns innerhalb von 48 Stunden.
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
              <h3 className="text-xl font-semibold mb-2">Danke für deine Bewerbung!</h3>
              <p className="text-muted-foreground mb-6">
                Wir melden uns innerhalb von 48 Stunden bei dir.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button onClick={resetAndClose} data-testid="button-app-close-success">
                  Schließen
                </Button>
                <Button variant="outline" asChild>
                  <a href="https://schreinerei-krickl.de" data-testid="link-app-website">
                    Zur Website
                  </a>
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
