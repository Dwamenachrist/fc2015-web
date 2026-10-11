import { z } from "zod";
import { Partner } from "./schema";

// Empty until the club signs partners. The section then shows "available"
// slots that sell the inventory (SITE_BLUEPRINT §3.7). Never add invented brands.
export const partners = z.array(Partner).parse([]);

export const PRINCIPAL_SLOTS = 3;
