import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, Check } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    setSubmitted(true);
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
      <Button type="submit" size="lg" className="w-full md:w-auto" data-testid="button-submit-contact">
        Anfrage senden
        <Send className="w-4 h-4 ml-2" />
      </Button>
    </form>
  );
}
