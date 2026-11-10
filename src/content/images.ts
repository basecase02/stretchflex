/**
 * The original site photos and logos. The files stay at their original
 * /wp-content/uploads/... URLs inside /public so every image link that Google,
 * Open Graph and the structured data already point to keeps resolving.
 */
// The team, photographed for real at the studio's front desk (landscape and portrait).
import team from "../../public/images/team/stretchflex-team-reception.jpg";
import teamTall from "../../public/images/team/stretchflex-team-reception-tall.jpg";
import kneeStretch from "../../public/wp-content/uploads/2026/02/openart-image__cfe8QLq_1770268051809_raw.webp";
import legStretch from "../../public/wp-content/uploads/2026/02/openart-image_b-UlVvty_1770267647921_raw.webp";
import logo from "../../public/wp-content/uploads/2025/11/StretchFlex-logo.webp";
import logoWhite from "../../public/wp-content/uploads/2026/01/StretchFlex-logo-copy.webp";

export const images = { team, teamTall, kneeStretch, legStretch, logo, logoWhite };
