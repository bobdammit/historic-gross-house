export function normalizePhoneInput(value: string) {
  return value.replace(/\D/g, "").slice(0, 10);
}

export function validatePhone(phone: string) {
  const digits = normalizePhoneInput(phone);
  return digits.length === 10;
}

export function validateEmailAddress(email: string) {
  return email.includes("@") && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const phoneInputProps = {
  inputMode: "numeric" as const,
  pattern: "[0-9]{10}",
  minLength: 10,
  maxLength: 10,
  title: "Enter a 10-digit phone number using numbers only.",
};

export const emailInputProps = {
  type: "email" as const,
  pattern: "[^\\s@]+@[^\\s@]+\\.[^\\s@]+",
  title: "Enter a valid email address with an @ symbol.",
};
