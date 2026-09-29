# Google Maps Lead Generation — Gemini Directives

When processing requests to scrape, collect, or find local leads across any geography:

## Core Directives
1. **Engine**: ScrapeGraphAI (`SmartScraperGraph`, `ScriptCreatorGraph`) using `gemini/gemini-1.5-flash` or `gemini/gemini-1.5-pro` as the LLM backend.
2. **Geographic Coverage**: Google Maps results truncate due to radius-based proximity bias. Always decompose cities into 8–15 administrative sectors, towns, or commercial centers.
3. **Place ID Deduplication**: Extract Google Maps Place IDs (`!1s...`) to merge identical listings across queries.
4. **Data Sanitization**: Strip private-use font icons (`[\ue000-\uf8ff]`) and `\n` characters from phone and address attributes.
5. **Website Opportunity Identification**:
   - Missing URL or social profile (Facebook, Instagram, etc.) → Qualified Lead.
   - Standalone website unreachable (HTTP 4xx/5xx/timeout/SSL) → Qualified Lead.
   - Verified active website (HTTP 200/300) → Excluded from opportunity list.
6. **Deliverables**: Output both `[location]_[niche]_all_leads.csv` and `[location]_[niche]_website_opportunity_leads.csv` with standard 14 fields in UTF-8-SIG.
