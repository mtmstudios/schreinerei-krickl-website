import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, Check, Upload, FileText, Image, X, Loader2, AlertCircle } from "lucide-react";
import { submitToWebhook, validateFile } from "@/lib/formSubmit";

const FORM_ID = "kontakt_main";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

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
    setValidationErrors([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setValidationErrors([]);
    
    // Debug: Log files before submit
    if (import.meta.env.DEV) {
      console.log("[ContactForm] FILES LENGTH before submit:", files.length);
      files.forEach((f, i) => console.log(`[ContactForm] File ${i}:`, f.name));
    }
    
    try {
      const result = await submitToWebhook(FORM_ID, {
        name: formData.name,
        email: formData.email,
        telefon: formData.phone,
        nachricht: formData.message,
      }, files);
      
      if (result.ok) {
        setSubmitted(true);
      } else {
        setError(result.message || result.errors?.join(", ") || "Ein Fehler ist aufgetreten.");
      }
    } catch (err) {
      setError("Netzwerkfehler. Bitte versuchen Sie es später erneut.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12 bg-card border border-card-border rounded-xl">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Nachricht gesendet!</h3>
        <p className="text-muted-foreground">
          Vielen Dank für Ihre Anfrage. Wir melden uns schnellstmöglich bei Ihnen.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="contact-name">Name *</Label>
          <Input
            id="contact-name"
            placeholder="Max Mustermann"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            data-testid="input-contact-name"
          />
        </div>
        <div>
          <Label htmlFor="contact-email">E-Mail *</Label>
          <Input
            id="contact-email"
            type="email"
            placeholder="max@beispiel.de"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            data-testid="input-contact-email"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="contact-phone">Telefon</Label>
        <Input
          id="contact-phone"
          type="tel"
          placeholder="0711 / 123 456"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          data-testid="input-contact-phone"
        />
      </div>
      <div>
        <Label htmlFor="contact-message">Nachricht *</Label>
        <Textarea
          id="contact-message"
          placeholder="Beschreiben Sie Ihr Anliegen..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows={5}
          required
          data-testid="textarea-contact-message"
        />
      </div>
      <div>
        <Label>Datei anhängen (optional)</Label>
        <p className="text-xs text-muted-foreground mb-2">
          Foto, Skizze oder Dokument (PDF, JPG, PNG)
        </p>
        <div className="flex flex-col gap-2">
          <label className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-border rounded-lg cursor-pointer hover-elevate transition-all">
            <Upload className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Datei auswählen</span>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="hidden"
              data-testid="input-contact-file-upload"
            />
          </label>
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
                    type="button"
                    onClick={() => removeFile(index)}
                    className="p-1 rounded hover-elevate"
                    data-testid={`button-remove-contact-file-${index}`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {validationErrors.length > 0 && (
        <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm" role="alert">
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
      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
          {error}
        </div>
      )}
      <Button 
        type="submit" 
        size="lg" 
        className="w-full md:w-auto" 
        disabled={isSubmitting}
        data-testid="button-submit-contact"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Wird gesendet...
          </>
        ) : (
          <>
            Anfrage senden
            <Send className="w-4 h-4 ml-2" />
          </>
        )}
      </Button>
    </form>
  );
}
