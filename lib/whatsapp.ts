/** Builds a wa.me deep link with a pre-filled message (PRD §5.4, §5.6). */
export function whatsappLink(number: string, message?: string): string {
  const digits = number.replace(/\D/g, "");
  if (!/^\d{8,15}$/.test(digits)) throw new Error(`Invalid WhatsApp number: ${number}`);
  return message ? `https://wa.me/${digits}?text=${encodeURIComponent(message)}` : `https://wa.me/${digits}`;
}

export const kitPreorderMessage = (kitLabel: string) => `Hello FC 2015, I'd like to pre-order the ${kitLabel} kit. Size: ___`;

export const trialsEnquiryMessage = "Hello FC 2015, I'd like to ask about the open trials.";
