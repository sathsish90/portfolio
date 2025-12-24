/**
 * Email Service
 * Handles sending emails from contact form submissions
 */

import emailjs from "@emailjs/browser";

// EmailJS Configuration
// These should be set in environment variables for production
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "";
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "";
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "";

// Recipient email (fallback if EmailJS not configured)
const RECIPIENT_EMAIL = "cybersecure8@gmail.com";

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * Send email using EmailJS service
 */
export const sendEmailViaEmailJS = async (
  formData: ContactFormData
): Promise<boolean> => {
  try {
    // Initialize EmailJS with public key
    if (EMAILJS_PUBLIC_KEY) {
      emailjs.init(EMAILJS_PUBLIC_KEY);
    }

    // Prepare template parameters
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      to_email: RECIPIENT_EMAIL,
      reply_to: formData.email,
    };

    // Send email via EmailJS
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    return response.status === 200;
  } catch (error) {
    console.error("EmailJS error:", error);
    throw error;
  }
};

/**
 * Send email via backend API (fallback method)
 */
export const sendEmailViaAPI = async (
  formData: ContactFormData
): Promise<boolean> => {
  try {
    // Use environment variable or detect the current host
    const host = window.location.hostname;
    const isLocalhost = host === "localhost" || host === "127.0.0.1";
    const API_BASE_URL =
      import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
    console.log(API_BASE_URL);
    const response = await fetch(`${API_BASE_URL}/api/contact/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        to: RECIPIENT_EMAIL,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error || `Failed to send email: ${response.statusText}`
      );
    }

    const result = await response.json();
    return result.success === true;
  } catch (error) {
    console.error("API email error:", error);
    // If it's a network error, provide helpful message
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error(
        "Unable to connect to email server. Please ensure the backend server is running on port 3001."
      );
    }
    throw error;
  }
};

/**
 * Main function to send contact form email
 * Tries API first (more reliable), falls back to EmailJS if API not available
 */
export const sendContactEmail = async (
  formData: ContactFormData
): Promise<boolean> => {
  // Try API first (more reliable and doesn't require third-party service)
  try {
    return await sendEmailViaAPI(formData);
  } catch (apiError) {
    console.warn("API email failed, trying EmailJS fallback:", apiError);

    // Fallback to EmailJS if configured
    if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
      try {
        return await sendEmailViaEmailJS(formData);
      } catch (emailjsError) {
        console.error("EmailJS also failed:", emailjsError);
        throw new Error(
          "Failed to send email. Please try again later or contact directly at cybersecure8@gmail.com"
        );
      }
    }

    // If API failed and EmailJS not configured, throw the API error
    throw apiError;
  }
};
