# Google Maps Lead Generation & Website Opportunity Engine — Agent Instructions

When tasked with finding businesses, extracting local leads, scraping Google Maps, or identifying website opportunities (businesses without functional websites):

## 1. Operating Principles
- **Core Engine**: Leverage **ScrapeGraphAI** (`SmartScraperGraph`, `ScriptCreatorGraph`, `SearchGraph`) with LLM reasoning and Playwright.
- **Geographic Coverage**: Never rely on a single city query. Google Maps caps search feeds at 20-120 listings due to proximity bias. Always decompose cities into 8–15 administrative sectors, towns, or commercial centers.
- **Deduplication**: Deduplicate across overlapping zones using Google Maps Place IDs (`!1s...`).
- **Data Sanitization**: Strip private-use font icon glyphs (`[\ue000-\uf8ff]`) and newlines (`\n`, `\r`) from phone numbers and addresses.
- **Dual Deliverables**: Always produce both:
  1. `[location]_[niche]_all_leads.csv` (Complete dataset)
  2. `[location]_[niche]_website_opportunity_leads.csv` (No website, social profile only, or verified broken website)

## 2. Standard 14-Column Schema
All CSV files must use UTF-8-SIG encoding with the following columns:
`business_name`, `category`, `phone`, `address`, `rating`, `reviews`, `website`, `website_type`, `website_status`, `website_status_code`, `website_status_detail`, `lead_reason`, `place_url`, `source_query`.

## 3. Website Opportunity Classification
- `website` is empty → `website_type: none`, `website_status: no_website`, `lead_reason: no_website`
- `website` is Facebook/Instagram/TikTok/WhatsApp/LinkedIn → `website_type: social`, `website_status: not_own_website`, `lead_reason: no_own_website_social`
- `website` is directory/aggregator (oladoc, marham, yelp, bit.ly) → `website_type: directory`, `website_status: not_own_website`, `lead_reason: no_own_website_directory`
- `website` is standalone domain → Perform HTTP GET (12s timeout, User-Agent header, 1 retry). If 200/300 → `has_website_up`. If 4xx/5xx/timeout/SSL error → `website_down_*` (included in opportunity CSV).

## 4. References & Documentation
- Consult `references/scrapegraph-integration.md` for ScrapeGraphAI code patterns.
- Consult `references/geographic-methodology.md` for city decomposition guides.
- Consult `references/data-schema.md` for field types and values.
