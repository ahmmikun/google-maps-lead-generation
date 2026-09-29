# GitHub Copilot Adapter — Google Maps Lead Generation

Copy this file to `.github/copilot-instructions.md` in your project repository.

## Key Directives
1. **Scraping Engine**: Utilize ScrapeGraphAI (`scrapegraphai.graphs.SmartScraperGraph`, `ScriptCreatorGraph`) with Playwright Chromium.
2. **Geographic Strategy**: Decompose target municipalities into 8–15 administrative sectors, towns, or commercial zones. Construct a balanced 2-tier query matrix.
3. **Deduplication & Cleansing**: Deduplicate using Place IDs extracted via regex: `!1s([0-9a-fA-Fx]+:[0-9a-fA-Fx]+)`. Strip font icon glyphs `[\ue000-\uf8ff]` and newline characters `\n` from phone and address attributes.
4. **Website Audit & Opportunity Classification**:
   - Missing URL or social profile (Facebook, Instagram, LinkedIn, TikTok, WhatsApp) → Qualified outreach lead (`not_own_website`).
   - Test standalone websites with HTTP GET (12s timeout, 1 retry). Classify unreachable sites as `website_down_*` (qualified outreach lead).
   - Exclude verified active sites (`has_website_up`) from the opportunity deliverable.
5. **Dual CSV Export**: Export both `[location]_[niche]_all_leads.csv` and `[location]_[niche]_website_opportunity_leads.csv` in UTF-8-SIG with 14 schema fields.
