/**
 * Unified Form Submission Utility
 * Sends all form data to a single n8n webhook endpoint
 */

const N8N_WEBHOOK_URL = "https://mtmstudios.app.n8n.cloud/webhook/5ee4ef75-c909-4111-b837-ccedbd182a58";
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB per file
const ALLOWED_FILE_TYPES = ["application/pdf", "image/jpeg", "image/png"];

export interface FileAttachment {
  filename: string;
  mimeType: string;
  data: string; // Base64 without prefix
}

export interface WebhookResult {
  ok: boolean;
  message?: string;
  errors?: string[];
}

/**
 * Converts a File to Base64 string (without data URL prefix)
 */
export async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Remove the data URL prefix (e.g., "data:application/pdf;base64,")
      const base64 = result.split(",")[1];
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
}

/**
 * Validates a file for upload
 */
export function validateFile(file: File): { valid: boolean; error?: string } {
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return { valid: false, error: `"${file.name}" ist kein erlaubtes Format (nur PDF, JPG, PNG)` };
  }
  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: `"${file.name}" ist zu groß (max. 10MB)` };
  }
  return { valid: true };
}

/**
 * Validates an email address
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Extracts UTM parameters from current URL
 */
function getUtmParams(): Record<string, string> {
  const params: Record<string, string> = {};
  if (typeof window === "undefined") return params;
  
  const urlParams = new URLSearchParams(window.location.search);
  const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
  
  utmKeys.forEach(key => {
    const value = urlParams.get(key);
    if (value) {
      params[key] = value;
    }
  });
  
  return params;
}

/**
 * Unified webhook submission function
 * @param formId - Unique identifier for the form (e.g., 'kontakt_main', 'projektanfrage', 'bewerbung')
 * @param formValues - Object containing all form field values
 * @param files - Optional array of File objects to attach
 */
export async function submitToWebhook(
  formId: string,
  formValues: Record<string, unknown>,
  files: File[] = []
): Promise<WebhookResult> {
  try {
    // Debug: Log files received
    if (import.meta.env.DEV) {
      console.log("[submitToWebhook] formId:", formId);
      console.log("[submitToWebhook] FILES LENGTH:", files.length);
      files.forEach((f, i) => console.log(`[submitToWebhook] File ${i}:`, f.name, f.size, f.type));
    }

    // Convert files to base64
    const anhaenge: FileAttachment[] = await Promise.all(
      files.map(async (file) => ({
        filename: file.name,
        mimeType: file.type,
        data: await fileToBase64(file),
      }))
    );

    // Debug: Log converted attachments
    if (import.meta.env.DEV) {
      console.log("[submitToWebhook] anhaenge count:", anhaenge.length);
      anhaenge.forEach((a, i) => console.log(`[submitToWebhook] Anhang ${i}:`, a.filename, a.mimeType, `${a.data.length} chars base64`));
    }

    // Build payload with all form data - ALWAYS include anhaenge as array (even if empty)
    const payload = {
      formId,
      ...formValues,
      anhaenge, // Always send as array, n8n can handle empty array
      pageUrl: typeof window !== "undefined" ? window.location.href : "",
      ...getUtmParams(),
      timestamp: new Date().toISOString(),
    };

    const bodyString = JSON.stringify(payload);
    
    // Debug: Log payload size
    if (import.meta.env.DEV) {
      console.log("[submitToWebhook] Payload size:", bodyString.length, "bytes");
    }

    // Send to n8n webhook
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: bodyString,
    });

    if (response.ok) {
      // Try to parse JSON response from webhook
      try {
        const data = await response.json();
        return {
          ok: data.ok !== false,
          message: data.message || "Erfolgreich gesendet",
          errors: data.errors,
        };
      } catch {
        // If no JSON response, assume success
        return { ok: true, message: "Erfolgreich gesendet" };
      }
    } else {
      const errorText = await response.text();
      console.error("Webhook error:", errorText);
      throw new Error(`Webhook returned ${response.status}: ${errorText}`);
    }
  } catch (err) {
    console.error("Submit error:", err);
    return {
      ok: false,
      message: "Netzwerkfehler. Bitte versuchen Sie es später erneut.",
    };
  }
}

// Form-specific submission functions (wrappers for backwards compatibility)

export async function submitContactForm(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}, files: File[] = []): Promise<{ success: boolean; message?: string; errors?: string[] }> {
  const result = await submitToWebhook("kontakt_main", data, files);
  return { success: result.ok, message: result.message, errors: result.errors };
}

export async function submitInquiry(data: {
  projektart: string;
  ort: string;
  raum?: string;
  zeitrahmen: string;
  name: string;
  email: string;
  telefon: string;
}, files: File[] = []): Promise<{ success: boolean; message?: string; errors?: string[] }> {
  const result = await submitToWebhook("projektanfrage", data, files);
  return { success: result.ok, message: result.message, errors: result.errors };
}

export async function submitServiceInquiry(data: {
  serviceName: string;
  serviceType: string;
  name: string;
  email: string;
  phone: string;
  [key: string]: unknown;
}, files: File[] = []): Promise<{ success: boolean; message?: string; errors?: string[] }> {
  const result = await submitToWebhook("service_anfrage", {
    ...data,
    telefon: data.phone,
  }, files);
  return { success: result.ok, message: result.message, errors: result.errors };
}

export async function submitApplication(data: {
  position: string;
  name: string;
  phone: string;
  email?: string;
  plz?: string;
  experience: string;
  startDate: string;
  focus?: string;
  motivation?: string;
}, files: File[] = []): Promise<{ success: boolean; message?: string; errors?: string[] }> {
  const result = await submitToWebhook("bewerbung", {
    stelle: data.position,
    name: data.name,
    telefon: data.phone,
    email: data.email,
    wohnort: data.plz,
    erfahrung: data.experience,
    startdatum: data.startDate,
    schwerpunkt: data.focus,
    motivation: data.motivation,
  }, files);
  return { success: result.ok, message: result.message, errors: result.errors };
}
