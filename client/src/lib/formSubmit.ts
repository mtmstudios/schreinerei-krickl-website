/**
 * Form Submission Utility
 * Funktioniert sowohl auf Replit (während der Entwicklung) als auch auf Mittwald (nach dem Build)
 * 
 * Auf Replit: Verwendet die Express API-Endpunkte
 * Auf Mittwald: Verwendet die PHP-Dateien im /api Ordner
 */

// Erkennt ob wir auf Mittwald oder lokal laufen
const isProduction = import.meta.env.PROD;

// API-Basis-URL - auf Mittwald werden die PHP-Dateien direkt angesprochen
const getApiUrl = (endpoint: string): string => {
  // In Produktion (Mittwald) verwenden wir die PHP-Endpunkte
  if (isProduction) {
    return `/api/${endpoint}.php`;
  }
  // In Entwicklung (Replit) verwenden wir Express
  return `/api/${endpoint}`;
};

interface FormSubmitResult {
  success: boolean;
  message?: string;
  errors?: string[];
}

/**
 * Sendet Kontaktformular-Daten
 */
export async function submitContactForm(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}): Promise<FormSubmitResult> {
  try {
    const response = await fetch(getApiUrl('contact'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Contact form submission error:', error);
    return {
      success: false,
      message: 'Netzwerkfehler. Bitte versuchen Sie es später erneut.',
    };
  }
}

/**
 * Sendet Projektanfrage-Daten (InquiryFunnel)
 */
export async function submitInquiry(data: {
  name: string;
  email: string;
  phone?: string;
  projectType?: string;
  rooms?: string[];
  services?: string[];
  budget?: string;
  timeline?: string;
  style?: string;
  materials?: string[];
  specialRequirements?: string;
  message?: string;
}): Promise<FormSubmitResult> {
  try {
    const response = await fetch(getApiUrl('inquiry'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Inquiry submission error:', error);
    return {
      success: false,
      message: 'Netzwerkfehler. Bitte versuchen Sie es später erneut.',
    };
  }
}

/**
 * Sendet Service-spezifische Anfrage-Daten
 */
export async function submitServiceInquiry(data: {
  name: string;
  email: string;
  phone?: string;
  serviceName: string;
  serviceType?: string;
  projectType?: string;
  rooms?: string[];
  dimensions?: string;
  style?: string;
  materials?: string[];
  colors?: string[];
  features?: string[];
  budget?: string;
  timeline?: string;
  specialRequirements?: string;
  message?: string;
}): Promise<FormSubmitResult> {
  try {
    const response = await fetch(getApiUrl('service-inquiry'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Service inquiry submission error:', error);
    return {
      success: false,
      message: 'Netzwerkfehler. Bitte versuchen Sie es später erneut.',
    };
  }
}

/**
 * Sendet Bewerbungs-Daten
 */
export async function submitApplication(data: {
  name: string;
  email: string;
  phone: string;
  position?: string;
  experience?: string;
  qualifications?: string[];
  availability?: string;
  salary?: string;
  motivation?: string;
  startDate?: string;
}): Promise<FormSubmitResult> {
  try {
    const response = await fetch(getApiUrl('application'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Application submission error:', error);
    return {
      success: false,
      message: 'Netzwerkfehler. Bitte versuchen Sie es später erneut.',
    };
  }
}
