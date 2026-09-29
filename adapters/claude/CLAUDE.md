# Google Maps Lead Generation — Claude Code Adapter

Copy this file to `CLAUDE.md` in the root of your project or configure it with Claude Code CLI.

## Instructions
- **Engine**: ScrapeGraphAI (`SmartScraperGraph`, `ScriptCreatorGraph`).
- **Decomposition**: Break the requested city into 8–15 sub-localities (e.g. DHA, Gulberg, Cantt) and execute a 2-tier query matrix.
- **Deduplication**: Deduplicate across overlapping zones using Google Maps Place IDs (`!1s...`).
- **Data Cleansing**: Strip font icon glyphs `[\ue000-\uf8ff]` and newline characters `\n` from phones and addresses.
- **Website Auditing**: Test standalone URLs via parallel HTTP GET requests (12s timeout, 1 retry). Classify social and directory URLs as `not_own_website`.
- **Outputs**: Generate two CSV deliverables in UTF-8-SIG (`[location]_[niche]_all_leads.csv` and `[location]_[niche]_website_opportunity_leads.csv`).
