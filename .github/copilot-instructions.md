# GitHub Copilot Instructions — Google Maps Lead Generation Skill

These instructions guide GitHub Copilot in executing local lead generation, Google Maps scraping, and website opportunity audits.

## Key Directives

1. **Scraping Engine**:
   - Utilize ScrapeGraphAI (`scrapegraphai.graphs.SmartScraperGraph`, `ScriptCreatorGraph`).
   - Use Playwright Chromium for rendering dynamic Google Maps content.
   - Configure graph with appropriate LLM (`openai/gpt-4o-mini`, `gemini/gemini-1.5-flash`, etc.).

2. **Geographic Strategy**:
   - Never query only the city name. Google Maps truncates after 20–120 listings due to proximity bias.
   - Decompose target municipalities into 8–15 administrative sectors, towns, or commercial zones.
   - Construct a balanced query matrix: (Primary Niche Term × Sub-localities) + (Secondary Terms × City).

3. **Deduplication & Cleansing**:
   - Deduplicate using Place IDs extracted via regex: `!1s([0-9a-fA-Fx]+:[0-9a-fA-Fx]+)`.
   - Cleanse Google Maps font icon glyphs `[\ue000-\uf8ff]` and newline characters `\n` from phone and address attributes.

4. **Website Audit & Opportunity Classification**:
   - Identify businesses with no website or social profiles (Facebook, Instagram, LinkedIn, TikTok, WhatsApp) as qualified outreach leads (`not_own_website`).
   - Test standalone websites with HTTP GET (12s timeout, 1 retry). Classify unreachable sites as `website_down_*` (qualified outreach leads).
   - Exclude verified active sites (`has_website_up`) from the opportunity deliverable.

5. **Dual CSV Export**:
   - Export both `[location]_[niche]_all_leads.csv` and `[location]_[niche]_website_opportunity_leads.csv`.
   - Adhere strictly to the 14-column schema in UTF-8-SIG encoding.
