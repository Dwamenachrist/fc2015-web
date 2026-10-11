/**
 * Placeholder markers. `npm run check:launch` fails while either is used
 * anywhere in content/ (TDD §5, §9). Never remove a marker without putting
 * the client's real value in its place.
 *
 * TBD(label, fallback)    – a value the client still has to give us.
 * sample(label, value)    – staging-only demo content (e.g. sample fixtures)
 *                           so the client can review a filled-in design.
 */
export function TBD<T>(_label: string, fallback: T): T {
  return fallback;
}

export function sample<T>(_label: string, value: T): T {
  return value;
}
