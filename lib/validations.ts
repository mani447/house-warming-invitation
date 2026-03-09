export interface RSVPFormData {
  name: string;
  contact: string;
  attending: boolean;
  guest_count: number;
}

export interface ValidationErrors {
  name?: string;
  contact?: string;
  guest_count?: string;
}

export function validateRSVP(data: RSVPFormData): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!data.name || data.name.trim().length === 0) {
    errors.name = "Please enter your name.";
  } else if (data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }

  if (data.contact && data.contact.trim().length > 0) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\d\s\-+().]{7,20}$/;
    if (
      !emailRegex.test(data.contact.trim()) &&
      !phoneRegex.test(data.contact.trim())
    ) {
      errors.contact = "Please enter a valid email or phone number.";
    }
  }

  if (data.attending && (!data.guest_count || data.guest_count < 1)) {
    errors.guest_count = "Please enter at least 1 guest.";
  }

  return errors;
}

export function hasErrors(errors: ValidationErrors): boolean {
  return Object.keys(errors).length > 0;
}
