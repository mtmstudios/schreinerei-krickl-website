import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Armchair,
  ChefHat,
  TreeDeciduous,
  DoorOpen,
  Wrench,
  Sparkles,
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
import { submitToWebhook, validateFile, validateEmail } from "@/lib/formSubmit";

const FORM_ID = "projektanfrage";

const projectTypes = [
  { id: "moebel", label: "Möbel", icon: Armchair },
  { id: "kueche", label: "Küche", icon: ChefHat },
  { id: "boden", label: "Boden/Terrasse", icon: TreeDeciduous },
  { id: "tueren", label: "Türen", icon: DoorOpen },
  { id: "reparatur", label: "Reparatur", icon: Wrench },
  { id: "sonder", label: "Sonderanfertigung", icon: Sparkles },
];

const timeframes = [
  { id: "asap", label: "So schnell wie möglich" },
  { id: "1month", label: "In den nächsten 4 Wochen" },
  { id: "3months", label: "In den nächsten 3 Monaten" },
  { id: "flexible", label: "Zeitlich flexibel" },
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

interface InquiryFunnelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InquiryFunnel({ isOpen, onClose }: InquiryFunnelProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    projectType: "",
    location: "",
    timeframe: "",
    name: "",
    email: "",
    phone: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);
  const fileInputId = "inquiry-file-upload";

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
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const errors: string[] = [];
      const validFiles: File[] = [];

      newFiles.forEach((file) => {
        const validation = validateFile(file);
        if (!validation.valid) {
          errors.push(validation.error!);
        } else {
          validFiles.push(file);
        }
      });

      if (errors.length > 0) {
        setValidationErrors(errors);
      } else {
        setValidationErrors([]);
      }

      setFiles(prev => [...prev, ...validFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setValidationErrors([]);
  };

  const validateForm = (): boolean => {
    const errors: string[] = [];

    if (!formData.projectType) {
      errors.push("Bitte wählen Sie eine Projektart aus.");
    }
    if (!formData.location.trim()) {
      errors.push("Bitte geben Sie einen Ort/Raum an.");
    }
    if (!formData.timeframe) {
      errors.push("Bitte wählen Sie einen Zeitrahmen aus.");
    }
    if (!formData.name.trim()) {
      errors.push("Bitte geben Sie Ihren Namen ein.");
    }
    if (!formData.email.trim()) {
      errors.push("Bitte geben Sie Ihre E-Mail-Adresse ein.");
    } else if (!validateEmail(formData.email)) {
      errors.push("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
    }
    if (!formData.phone.trim()) {
      errors.push("Bitte geben Sie Ihre Telefonnummer ein.");
    }

    // Check total file size
    const totalSize = files.reduce((sum, file) => sum + file.size, 0);
    if (totalSize > MAX_FILE_SIZE * 3) {
      errors.push("Die Gesamtgröße der Dateien ist zu groß (max. 30MB gesamt).");
    }

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setValidationErrors([]);
    
    try {
      // Get human-readable labels
      const projektartLabel = projectTypes.find(p => p.id === formData.projectType)?.label || formData.projectType;
      const zeitrahmenLabel = timeframes.find(t => t.id === formData.timeframe)?.label || formData.timeframe;

      const result = await submitToWebhook(FORM_ID, {
        projektart: projektartLabel,
        ort: formData.location,
        raum: formData.location,
        zeitrahmen: zeitrahmenLabel,
        name: formData.name,
        email: formData.email,
        telefon: formData.phone,
      }, files);

      if (result.ok) {
        setSubmitted(true);
      } else {
        setError(result.message || "Fehler beim Senden. Bitte versuchen Sie es später erneut.");
      }
    } catch (err) {
      console.error("Submit error:", err);
      setError("Netzwerkfehler. Bitte versuchen Sie es später erneut.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setStep(1);
    setFormData({
      projectType: "",
      location: "",
      timeframe: "",
      name: "",
      email: "",
      phone: "",
    });
    setFiles([]);
    setSubmitted(false);
    setError(null);
    setValidationErrors([]);
    onClose();
  };

  if (!isOpen) return null;

  const getFileSizeDisplay = (size: number): string => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiry-funnel-title"
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
            data-testid="button-close-funnel"
          >
            <X className="w-5 h-5" />
          </button>
          {!submitted ? (
            <>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 id="inquiry-funnel-title" className="text-xl font-semibold">In 60 Sekunden zur Anfrage</h2>
                  <span className="text-sm text-muted-foreground">Schritt {step}/4</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden" role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={4}>
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${(step / 4) * 100}%` }}
                  />
                </div>
              </div>

              {validationErrors.length > 0 && (
                <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm" role="alert">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <ul className="list-disc list-inside space-y-1">
                      {validationErrors.map((err, i) => (
                        <li key={i}>{err}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="font-medium text-lg">Was für ein Projekt planen Sie?</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {projectTypes.map((type) => {
                        const Icon = type.icon;
                        return (
                          <button
                            key={type.id}
                            onClick={() => {
                              setFormData({ ...formData, projectType: type.id });
                              setStep(2);
                            }}
                            className={`flex flex-col items-center gap-2 p-4 rounded-lg border transition-all hover-elevate ${
                              formData.projectType === type.id
                                ? "border-primary bg-primary/10"
                                : "border-border"
                            }`}
                            aria-pressed={formData.projectType === type.id}
                            data-testid={`button-project-${type.id}`}
                          >
                            <Icon className="w-8 h-8 text-primary" aria-hidden="true" />
                            <span className="text-sm font-medium">{type.label}</span>
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
                    <h3 className="font-medium text-lg">Wo soll das Projekt umgesetzt werden?</h3>
                    <div className="space-y-3">
                      <Label htmlFor="location">Raum / Ort (z.B. Wohnzimmer, Küche) *</Label>
                      <Input
                        id="location"
                        placeholder="z.B. Wohnzimmer, Esslingen"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        aria-required="true"
                        data-testid="input-location"
                      />
                    </div>
                    <div className="flex gap-3 pt-4">
                      <Button variant="outline" onClick={() => setStep(1)} data-testid="button-step2-back">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Zurück
                      </Button>
                      <Button
                        className="flex-1"
                        onClick={() => setStep(3)}
                        disabled={!formData.location}
                        data-testid="button-step2-next"
                      >
                        Weiter
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
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
                    <h3 className="font-medium text-lg">Wann soll es losgehen?</h3>
                    <div className="space-y-2">
                      {timeframes.map((tf) => (
                        <button
                          key={tf.id}
                          onClick={() => {
                            setFormData({ ...formData, timeframe: tf.id });
                            setStep(4);
                          }}
                          className={`w-full text-left p-4 rounded-lg border transition-all hover-elevate ${
                            formData.timeframe === tf.id
                              ? "border-primary bg-primary/10"
                              : "border-border"
                          }`}
                          aria-pressed={formData.timeframe === tf.id}
                          data-testid={`button-timeframe-${tf.id}`}
                        >
                          <span className="font-medium">{tf.label}</span>
                        </button>
                      ))}
                    </div>
                    <Button variant="outline" onClick={() => setStep(2)} data-testid="button-step3-back">
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
                    <h3 className="font-medium text-lg">Fast geschafft! Ihre Kontaktdaten</h3>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          placeholder="Max Mustermann"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          aria-required="true"
                          data-testid="input-name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">E-Mail *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="max@beispiel.de"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          aria-required="true"
                          data-testid="input-email"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Telefon *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="0711 / 123 456"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          aria-required="true"
                          data-testid="input-phone"
                        />
                      </div>
                      <div>
                        <Label htmlFor={fileInputId}>Dateien anhängen (optional)</Label>
                        <p className="text-xs text-muted-foreground mb-2">
                          Fotos, Skizzen oder Dokumente (PDF, JPG, PNG, max. 10MB pro Datei)
                        </p>
                        <div className="flex flex-col gap-2">
                          <label 
                            htmlFor={fileInputId}
                            className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-border rounded-lg cursor-pointer hover-elevate transition-all"
                          >
                            <Upload className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
                            <span className="text-sm text-muted-foreground">Dateien auswählen</span>
                          </label>
                          <input
                            id={fileInputId}
                            type="file"
                            multiple
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={handleFileChange}
                            className="sr-only"
                            data-testid="input-file-upload"
                          />
                          {files.length > 0 && (
                            <div className="space-y-2">
                              {files.map((file, index) => (
                                <div key={index} className="flex items-center justify-between gap-2 p-2 bg-muted/50 rounded-md">
                                  <div className="flex items-center gap-2 min-w-0">
                                    {file.type.includes('pdf') ? (
                                      <FileText className="w-4 h-4 text-muted-foreground flex-shrink-0" aria-hidden="true" />
                                    ) : (
                                      <Image className="w-4 h-4 text-muted-foreground flex-shrink-0" aria-hidden="true" />
                                    )}
                                    <span className="text-sm truncate">{file.name}</span>
                                    <span className="text-xs text-muted-foreground">({getFileSizeDisplay(file.size)})</span>
                                  </div>
                                  <button
                                    onClick={() => removeFile(index)}
                                    className="p-1 rounded hover-elevate"
                                    aria-label={`${file.name} entfernen`}
                                    data-testid={`button-remove-file-${index}`}
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {error && (
                      <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm" role="alert">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 flex-shrink-0" />
                          {error}
                        </div>
                      </div>
                    )}
                    <div className="flex gap-3 pt-4">
                      <Button variant="outline" onClick={() => setStep(3)} data-testid="button-step4-back">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Zurück
                      </Button>
                      <Button
                        className="flex-1"
                        onClick={handleSubmit}
                        disabled={!formData.name || !formData.email || !formData.phone || isSubmitting}
                        data-testid="button-submit-inquiry"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Wird gesendet...
                          </>
                        ) : (
                          <>
                            Anfrage absenden
                            <Check className="w-4 h-4 ml-2" />
                          </>
                        )}
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
                Wir haben Ihre Anfrage erhalten und melden uns schnellstmöglich bei Ihnen.
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
