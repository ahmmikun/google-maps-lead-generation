# Google Maps Lead Generation — Gemini Adapter

Copy this file to `GEMINI.md` in the root of your project or CLI environment.

## Directives
- **Engine**: ScrapeGraphAI (`SmartScraperGraph`, `ScriptCreatorGraph`) using `gemini/gemini-1.5-flash` or `gemini/gemini-1.5-pro` as the LLM backend.
- **Geographic Partitioning**: Decompose cities into 8–15 administrative sectors, towns, or commercial centers to overcome Google Maps result truncation.
- **Place ID Deduplication**: Match listings across queries using Place ID regex `!1s([0-9a-fA-Fx]+:[0-9a-fA-Fx]+)`.
- **Data Cleansing**: Strip private-use font icons `[\ue000-\uf8ff]` and `\n` characters from phone and address attributes.
- **Website Audit**:
  - Missing URL or social profile (Facebook, Instagram, LinkedIn, TikTok, WhatsApp) → Qualified lead (`not_own_website`).
  - Standalone website unreachable (HTTP 4xx/5xx/timeout/SSL) → Qualified lead (`website_down_*`).
  - Active website (HTTP 200/300) → Excluded from opportunity list.
- **Deliverables**: Output dual CSVs in UTF-8-SIG (`[location]_[niche]_all_leads.csv` and `[location]_[niche]_website_opportunity_leads.csv`) using the 14-field schema.
