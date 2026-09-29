# Google Maps Lead Generation — Claude Code Directives

Activate this skill when asked to find local businesses, generate B2B leads, scrape Google Maps listings, or identify businesses that need websites.

## Workflow Rules
1. **Core Framework**: Use ScrapeGraphAI (`scrapegraphai`) as the scraping and automation engine.
2. **Decomposition**: Break the requested city into 8–15 realistic sub-localities (e.g. DHA, Gulberg, Johar Town for Lahore). Construct a 2-tier query matrix.
3. **Execution**:
   - For ad-hoc scraping: Run `SmartScraperGraph` with browser rendering.
   - For user-requested automation scripts: Use `ScriptCreatorGraph` to generate standalone, reusable Playwright scripts.
4. **Data Cleaning**: Remove font icon glyphs (`[\ue000-\uf8ff]`) and newlines (`\n`) from phones and addresses.
5. **Website Auditing**: Test standalone URLs with HTTP GET (12s timeout, retries on transient errors). Classify social/directory URLs as `not_own_website`.
6. **Outputs**: Always output two CSV files in `utf-8-sig`:
   - `[location]_[niche]_all_leads.csv`
   - `[location]_[niche]_website_opportunity_leads.csv`
7. **No Fabrication**: Never invent phone numbers, addresses, ratings, or website statuses. Report genuine discovery counts.

Refer to `references/` for full schemas and ScrapeGraphAI configurations.
