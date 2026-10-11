import { z } from "zod";

const imagePath = z.string().regex(/^\/(images|brand|partners)\//, "Images live in /public/images, /public/brand or /public/partners");

export const Venue = z.object({
  name: z.string().min(1),
  address: z.string().min(1),
  mapsUrl: z.url(),
});

export const Fixture = z.object({
  id: z.string().min(1),
  opponent: z.string().min(1),
  opponentShort: z.string().min(2).max(3),
  opponentCrest: imagePath.optional(),
  competition: z.string().min(1),
  /** ISO-8601 with offset. Accra is UTC+0 all year, so use Z. */
  kickoff: z.iso.datetime({ offset: true }),
  home: z.boolean(),
  venue: Venue,
  result: z.object({ for: z.number().int().min(0), against: z.number().int().min(0) }).optional(),
});

export const Role = z.enum(["GK", "DF", "MF", "FW", "STAFF"]);

export const Person = z
  .object({
    id: z.string().min(1),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    role: Role,
    staffTitle: z.string().optional(),
    number: z.number().int().min(1).max(99).optional(),
    captain: z.boolean().default(false),
    photo: imagePath.optional(),
  })
  .refine((p) => (p.role === "STAFF" ? !!p.staffTitle : p.number !== undefined), {
    error: "Players need a kit number; staff need a staffTitle",
  });

export const Kit = z.object({
  id: z.enum(["home", "away"]),
  label: z.string(),
  name: z.string(),
  description: z.string(),
  bodyColor: z.string(),
  trimColor: z.string(),
  priceGHS: z.number().positive().optional(),
  sizes: z.array(z.string()).min(1),
});

export const Partner = z.object({
  name: z.string().min(1),
  tier: z.enum(["principal", "official", "supporter"]),
  logo: imagePath,
  url: z.url().optional(),
});

export const Club = z.object({
  name: z.string(),
  email: z.email(),
  /** International format without "+", e.g. 233241234567 */
  whatsapp: z.string().regex(/^233\d{9}$/),
  trialsWhatsappGroup: z.url(),
  address: z.string(),
  mapsUrl: z.url(),
  /** Only accounts the club has given us. A missing key = no icon anywhere on the site. */
  socials: z.object({
    instagram: z.url().optional(),
    facebook: z.url().optional(),
    tiktok: z.url().optional(),
    x: z.url().optional(),
    youtube: z.url().optional(),
    whatsappChannel: z.url().optional(),
  }),
  /** Optional hero video loop (MP4 in /public/video). Without it the hero shows its photo. */
  heroVideo: z
    .string()
    .regex(/^\/video\/.+\.mp4$/)
    .optional(),
  partnershipDeck: z
    .string()
    .regex(/^\/docs\/.+\.pdf$/)
    .optional(),
  aboutVideoYouTubeId: z.string().optional(),
});

export const Trials = z.object({
  season: z.string(),
  ageGroups: z.array(z.object({ name: z.string(), detail: z.string() })).length(3),
  dates: z.string(),
  venue: z.string(),
  bring: z.array(z.string()).min(1),
  eligibility: z.string(),
  /** Used to compute the applicant's age; ISO date. */
  trialDate: z.iso.date(),
});

export const About = z.object({
  intro: z.string(),
  body: z.array(z.string()).min(1),
  /** "Behind the crest": each part, and where it sits on the crest image (percent of width/height). */
  crestParts: z
    .array(
      z.object({
        id: z.string(),
        title: z.string(),
        text: z.string(),
        x: z.number().min(0).max(100),
        y: z.number().min(0).max(100),
        zoom: z.number().min(1).max(3),
      }),
    )
    .min(2),
  colours: z.array(z.object({ name: z.string(), hex: z.string(), meaning: z.string() })).min(1),
  timeline: z.array(z.object({ year: z.string(), title: z.string(), text: z.string() })).min(2),
});

export type Fixture = z.infer<typeof Fixture>;
export type Person = z.infer<typeof Person>;
export type Role = z.infer<typeof Role>;
export type Kit = z.infer<typeof Kit>;
export type Partner = z.infer<typeof Partner>;
export type Club = z.infer<typeof Club>;
export type Trials = z.infer<typeof Trials>;
export type About = z.infer<typeof About>;
