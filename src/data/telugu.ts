// Single source of truth for the Telugu glyph ramps used by the footer wave
// (TeluguWave.astro) and the OG-image glyph echo row (og-image endpoint).

// Character ramp, low -> high intensity. Single-codepoint letters only:
// no conjuncts, no combining vowel signs (they render dotted circles standalone).
export const RAMP = [" ", "·", "ఽ", "ల", "వ", "త", "అ", "ఘ", "భ"];

// Full alphabet seeded per-cell, shown only at wave crests (intensity > 0.82)
// so "real words-of-letters" appear on the peaks.
export const ALPHABET = [
  ..."అఆఇఈఉఊఎఏఐఒఓఔకఖగఘచఛజఝటఠడఢణతథదధనపఫబభమయరలవశషసహళఱ",
];

// Static echo row rendered on the OG card (§12).
export const OG_GLYPH_ROW = ["అ", "ల", "వ", "త", "భ"];
