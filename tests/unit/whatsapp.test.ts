import { describe, expect, it } from "vitest";
import { kitPreorderMessage, whatsappLink } from "@/lib/whatsapp";

describe("whatsappLink (PRD §5.6: pre-filled kit message)", () => {
  it("builds a wa.me link with an encoded message", () => {
    expect(whatsappLink("233241234567", kitPreorderMessage("Home"))).toBe(
      "https://wa.me/233241234567?text=Hello%20FC%202015%2C%20I'd%20like%20to%20pre-order%20the%20Home%20kit.%20Size%3A%20___",
    );
  });

  it("strips formatting from the number", () => {
    expect(whatsappLink("+233 24 123 4567")).toBe("https://wa.me/233241234567");
  });

  it("rejects an invalid number", () => {
    expect(() => whatsappLink("12")).toThrow();
  });
});
