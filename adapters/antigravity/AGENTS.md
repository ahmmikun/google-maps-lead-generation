# Google Maps Lead Generation — Google Antigravity Adapter

Copy this file to `AGENTS.md` or `.agents/skills/google-maps-lead-generation/AGENTS.md` in your project.

## Directives
- **Engine**: ScrapeGraphAI (`SmartScraperGraph`, `ScriptCreatorGraph`) with Playwright Chromium.
- **Geographic Decomposition**: Always decompose target cities into 8–15 administrative sectors, towns, or commercial centers to overcome Google Maps result truncation.
- **Deduplication**: Match listings across queries using the Google Maps Place ID regex `!1s([0-9a-fA-Fx]+:[0-9a-fA-Fx]+)`.
- **Data Cleansing**: Strip private-use font icon glyphs `[\ue000-\uf8ff]` and newline characters `\n` from phone and address strings.
- **Website Audit**:
  - Missing URL or social profile (Facebook, Instagram, LinkedIn, TikTok, WhatsApp) → Qualified lead (`not_own_website`).
  - Standalone website unreachable (HTTP 4xx/5xx/timeout/SSL) → Qualified lead (`website_down_*`).
  - Active website (HTTP 200/300) → Excluded from opportunity list.
- **Deliverables**: Output dual CSVs in UTF-8-SIG (`[location]_[niche]_all_leads.csv` and `[location]_[niche]_website_opportunity_leads.csv`) using the 14-field schema.
