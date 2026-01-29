import React, { useState } from 'react';
import './FunnelForm.css'; // Styling siehe unten

const FunnelForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    projektart: '',
    ort: '',
    raum: '',
    zeitrahmen: '',
    name: '',
    email: '',
    telefon: ''
  });
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState('idle'); // idle, sending, success, error

  // Datei-Upload Handler
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    // Validierung
    const validFiles = selectedFiles.filter(file => {
      const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
      const maxSize = 10 * 1024 * 1024; // 10MB

      if (!validTypes.includes(file.type)) {
        alert(`${file.name} ist kein gültiger Dateityp (nur PDF, JPG, PNG)`);
        return false;
      }
      if (file.size > maxSize) 
        alert(`${file.name} ist zu groß (max 10MB)`);
        return false;
      }
      return true;
    });

    setFiles(validFiles);
  };

  // Formular absenden
  const handleSubmit = async () => {
    setStatus('sending');

    try {
      // Dateien in Base64 konvertieren
      const filePromises = files.map(file => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve({
              filename: file.name,
              data: reader.result.split(',')[1], // Base64 ohne Prefix
              mimeType: file.type
            });
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      const base64Files = await Promise.all(filePromises);

      // Payload zusammenstellen
      const payload = {
        ...formData,
        anhaenge: base64Files,
        timestamp: new Date().toISOString()
      };

      // An n8n senden
      const response = await fetch('https://mtmstudios.app.n8n.cloud/webhook/5ee4ef75-c909-4111-b837-ccedbd182a58', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setStatus('success');
        setStep(5); // Danke-Seite
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Fehler:', error);
      setStatus('error');
    }
  };

  // Navigation
  const nextStep = () => {
    if (validateCurrentStep()) {
      setStep(step + 1);
    }
  };

  const prevStep = () => setStep(step - 1);

  // Validierung pro Step
  const validateCurrentStep = () => {
    switch(step) {
      case 1:
        if (!formData.projektart) {
          alert('Bitte wählen Sie eine Projektart aus');
          return false;
        }
        return true;
      case 2:
        if (!formData.ort || !formData.raum) {
          alert('Bitte füllen Sie beide Felder aus');
          return false;
        }
        return true;
      case 3:
        if (!formData.zeitrahmen) {
          alert('Bitte wählen Sie einen Zeitrahmen');
          return false;
        }
        return true;
      case 4:
        if (!formData.name || !formData.email || !formData.telefon) {
          alert('Bitte füllen Sie alle Pflichtfelder aus');
          return false;
        }
        // E-Mail Validierung
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          alert('Bitte geben Sie eine gültige E-Mail-Adresse ein');
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  return (
    <div className="funnel-container">
      {/* Progress Bar */}
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${(step / 4) * 100}%` }}
        />
      </div>
      <div className="progress-steps">
        Step {step} von 4
      </div>

      <div className="funnel-content">
        {/* STEP 1: Projektart */}
        {step === 1 && (
          <div className="step-container">
            <h2>Was für ein Projekt planen Sie?</h2>
            <div className="options-grid">
              {[
                { value: 'moebel', label: '🪑 Möbel', icon: '🪑' },
                { value: 'kueche', label: '🍳 Küche', icon: '🍳' },
                { value: 'boden-terrasse', label: '🏡 Boden/Terrasse', icon: '🏡' },
                { value: 'tueren', label: '🚪 Türen', icon: '🚪' },
                { value: 'reparatur', label: '🔧 Reparatur', icon: '🔧' },
                { value: 'sonderanfertigung', label: '✨ Sonderanfertigung', icon: '✨' }
              ].map(option => (
                <button
                  key={option.value}
                  type="button"
                  className={`option-button ${formData.projektart === option.value ? 'selected' : ''}`}
                  onClick={() => setFormData({...formData, projektart: option.value})}
                >
                  <span className="option-icon">{option.icon}</span>
                  <span className="option-label">{option.label.replace(option.icon + ' ', '')}</span>
                </button>
              ))}
            </div>
            <button 
              className="btn-primary" 
              onClick={nextStep}
              disabled={!formData.projektart}
            >
              Weiter →
            </button>
          </div>
        )}

        {/* STEP 2: Ort und Raum */}
        {step === 2 && (
          <div className="step-container">
            <h2>Wo soll das Projekt umgesetzt werden?</h2>
            <div className="form-group">
              <label htmlFor="ort">Ort/Stadt *</label>
              <input
                id="ort"
                type="text"
                placeholder="z.B. Stuttgart"
                value={formData.ort}
                onChange={(e) => setFormData({...formData, ort: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="raum">In welchem Raum? *</label>
              <input
                id="raum"
                type="text"
                placeholder="z.B. Wohnzimmer, Küche, Büro..."
                value={formData.raum}
                onChange={(e) => setFormData({...formData, raum: e.target.value})}
                required
              />
            </div>
            <div className="button-group">
              <button className="btn-secondary" onClick={prevStep}>
                ← Zurück
              </button>
              <button className="btn-primary" onClick={nextStep}>
                Weiter →
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Zeitrahmen */}
        {step === 3 && (
          <div className="step-container">
            <h2>Wann soll es losgehen?</h2>
            <div className="options-list">
              {[
                { value: 'sofort', label: '⚡ So schnell wie möglich' },
                { value: '4-wochen', label: '📅 In den nächsten 4 Wochen' },
                { value: '3-monate', label: '🗓️ In den nächsten 3 Monaten' },
                { value: 'flexibel', label: '🕐 Zeitlich flexibel' }
              ].map(option => (
                <button
                  key={option.value}
                  type="button"
                  className={`option-card ${formData.zeitrahmen === option.value ? 'selected' : ''}`}
                  onClick={() => setFormData({...formData, zeitrahmen: option.value})}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <div className="button-group">
              <button className="btn-secondary" onClick={prevStep}>
                ← Zurück
              </button>
              <button 
                className="btn-primary" 
                onClick={nextStep}
                disabled={!formData.zeitrahmen}
              >
                Weiter →
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Kontaktdaten */}
        {step === 4 && (
          <div className="step-container">
            <h2>Ihre Kontaktdaten</h2>
            <p className="subtitle">Damit wir Ihnen ein Angebot erstellen können</p>

            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                id="name"
                type="text"
                placeholder="Vor- und Nachname"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">E-Mail *</label>
              <input
                id="email"
                type="email"
                placeholder="ihre@email.de"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="telefon">Telefon *</label>
              <input
                id="telefon"
                type="tel"
                placeholder="+49 123 456789"
                value={formData.telefon}
                onChange={(e) => setFormData({...formData, telefon: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="files">Dateien anhängen (optional)</label>
              <p className="file-info">PDF, JPG, PNG - max 10MB pro Datei</p>
              <input
                id="files"
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="file-input"
              />
              {files.length > 0 && (
                <div className="file-list">
                  {files.map((file, index) => (
                    <div key={index} className="file-item">
                      ✅ {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="button-group">
              <button className="btn-secondary" onClick={prevStep}>
                ← Zurück
              </button>
              <button 
                className="btn-primary btn-submit" 
                onClick={handleSubmit}
                disabled={status === 'sending'}
              >
                {status === 'sending' ? '⏳ Wird gesendet...' : '✓ Anfrage absenden'}
              </button>
            </div>

            {status === 'error' && (
              <div className="error-message">
                ❌ Fehler beim Senden. Bitte versuchen Sie es erneut.
              </div>
            )}
          </div>
        )}

        {/* STEP 5: Danke-Seite */}
        {step === 5 && status === 'success' && (
          <div className="step-container success-page">
            <div className="success-icon">✅</div>
            <h2>Vielen Dank für Ihre Anfrage!</h2>
            <p>Wir haben Ihre Projektanfrage erhalten und melden uns innerhalb von 24 Stunden bei Ihnen.</p>
            <div className="summary-box">
              <h3>Ihre Angaben:</h3>
              <ul>
                <li><strong>Projekt:</strong> {formData.projektart}</li>
                <li><strong>Ort:</strong> {formData.ort}</li>
                <li><strong>Raum:</strong> {formData.raum}</li>
                <li><strong>Start:</strong> {formData.zeitrahmen}</li>
                <li><strong>Kontakt:</strong> {formData.email}</li>
              </ul>
            </div>
            <button 
              className="btn-primary" 
              onClick={() => window.location.href = '/'}
            >
              Zurück zur Startseite
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FunnelForm;