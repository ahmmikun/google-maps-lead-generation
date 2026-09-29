---
name: google-maps-lead-generation
description: Core powered by ScrapeGraphAI (https://github.com/ScrapeGraphAI/Scrapegraph-ai). Discovers, collects, deduplicates, and validates business leads across geographic areas on Google Maps using ScrapeGraphAI graphs (SmartScraperGraph, ScriptCreatorGraph) with AI agent orchestration. Verifies website availability via parallel HTTP checks, and outputs both a complete leads CSV and a high-intent website opportunity leads CSV (businesses with no website, social profiles only, or broken links). Activate when asked to find, scrape, list, or generate leads for any business category or niche in a specific city, town, or region (e.g., "Find all dentists in Lahore", "Create a CSV of gyms in Faisalabad", "Generate leads for software houses in Karachi").
---

# Google Maps Lead Generation & Website Opportunity Skill

A comprehensive, LLM-powered lead generation workflow built on **[ScrapeGraphAI](https://github.com/ScrapeGraphAI/Scrapegraph-ai)**. The skill systematically searches Google Maps across geographic areas, deduplicates businesses, verifies website accessibility, and produces dual sales-ready CSV deliverables.

> **Architecture Principle**: In accordance with the ScrapeGraphAI paradigm, this skill does not rely on static pre-baked scripts in a `scripts/` folder. Instead, scraping pipelines and custom automation scripts are created and executed dynamically on demand using ScrapeGraphAI graphs (`SmartScraperGraph`, `ScriptCreatorGraph`, `SearchGraph`) and the AI Agent.

---

## Workflow Overview

```text
1. Parse Request (Niche & Location)
   ↓
2. Decompose Geography & Construct Query Matrix
   ↓
3. Execute ScrapeGraphAI Pipeline / Generate On-Demand Scripts
   ↓
4. Verify Website Reachability & Classify Lead Reasons
   ↓
5. Build Dual Deliverable CSVs (14-Field Schema)
   ↓
6. Generate Honest Execution Summary
```

*Detailed references:*
* [ScrapeGraphAI Integration](references/scrapegraph-integration.md)
* [Workflow Architecture](references/workflow-architecture.md)
* [Data Schema](references/data-schema.md)
* [Geographic Methodology](references/geographic-methodology.md)

---

## Execution Instructions

When a user requests leads for a business type and location:

### Step 1: Parse & Normalize Input Parameters
1. **Target Niche**: Identify the core industry (e.g., `physiotherapy`, `dentist`, `gym`, `software house`).
2. **Target Location**: Identify the primary municipality or region (e.g., `Lahore`, `Karachi`, `Islamabad`).
3. **Niche Normalization**: Produce 2–3 precise search keywords (avoid generic drift).
   * *Example for Dentists*: `dentist`, `dental clinic`, `dental surgeon`

### Step 2: Decompose Geography & Construct Query Matrix
1. Break down the target location into 8–15 major administrative zones, commercial districts, or towns.
   * *Consult [Geographic Methodology](references/geographic-methodology.md) for regional subdivision guidelines.*
2. Formulate a balanced query list:
   * (Primary Niche Term) × (Sub-localities)
   * (Secondary Niche Terms) × (Target City)

### Step 3: Configure ScrapeGraphAI Engine
Ensure dependencies are installed:
```bash
pip install scrapegraphai playwright python-dotenv requests
playwright install chromium
```

Set up the ScrapeGraphAI configuration with your preferred LLM provider (`OPENAI_API_KEY`, `GEMINI_API_KEY`, or local Ollama):
```python
import os
from dotenv import load_dotenv
load_dotenv()

graph_config = {
    "llm": {
        "api_key": os.environ.get("OPENAI_API_KEY") or os.environ.get("GEMINI_API_KEY"),
        "model": "openai/gpt-4o-mini",  # or "gemini/gemini-1.5-flash"
    },
    "verbose": True,
    "headless": True,
}
```

### Step 4: Execute Extraction or Generate On-Demand Script
The agent chooses between direct graph execution or custom script synthesis based on the user's task scale:

#### Option A: Direct Extraction with `SmartScraperGraph`
For direct lead extraction from a Google Maps search feed:
```python
from scrapegraphai.graphs import SmartScraperGraph

prompt = """
Extract all business listings from this Google Maps page.
For each place extract:
- name: Name of the business
- category: Business category
- address: Full address
- phone: Phone number
- rating: Rating score
- reviews: Total reviews
- website: Official website URL (if present)
- place_url: Full Google Maps URL
"""

smart_scraper = SmartScraperGraph(
    prompt=prompt,
    source=f"https://www.google.com/maps/search/{query.replace(' ', '+')}",
    config=graph_config,
)
results = smart_scraper.run()
```

#### Option B: Standalone Script Creation with `ScriptCreatorGraph`
If the user wants a dedicated, reusable automation script saved to their workspace:
```python
from scrapegraphai.graphs import ScriptCreatorGraph

script_creator = ScriptCreatorGraph(
    prompt="Write a Playwright Python script that searches Google Maps for physiotherapy in Lahore, scrolls the results feed, deduplicates by place ID, and saves all details to a JSON file.",
    source="https://www.google.com/maps/search/physiotherapy+Lahore",
    config=graph_config,
)
generated_code = script_creator.run()
# Save generated_code to the user's workspace
```

#### Essential Data Cleaning Rules:
* **Strip Private Use Area (PUA) Glyphs**: Google Maps embeds custom font icons (e.g., `\ue0b0` for phone, `\ue0c8` for location pin). Strip all characters matching `[\ue000-\uf8ff]`.
* **Strip Newline Characters**: Clean all `\n` and `\r` from `phone` and `address` fields.
* **Deduplication**: Match unique businesses using the Google Maps Place ID extracted from the place URL regex: `!1s([0-9a-fA-Fx]+:[0-9a-fA-Fx]+)`.

### Step 5: Verify Website Availability & Classify Leads
For all unique leads discovered, analyze the `website` URL:

1. **Categorization**:
   * **Empty / None**: `type: "none"`, `status: "no_website"`
   * **Social Network**: (Facebook, Instagram, LinkedIn, YouTube, TikTok, WhatsApp, etc.) → `type: "social"`, `status: "not_own_website"`
   * **Directory / Aggregator**: (oladoc, marham, bit.ly, yelp, google.com, etc.) → `type: "directory"`, `status: "not_own_website"`
   * **Commercial Website**: Candidate for HTTP verification.

2. **HTTP Verification**:
   * Probe commercial websites with HTTP GET (12s timeout, browser User-Agent).
   * **Retry Logic**: Retry once after a 2-second pause if an initial timeout or connection reset occurs.
   * Final status: `up` (2xx/3xx), `down_http_4xx`, `down_http_5xx`, `down_ssl_error`, `down_dns_or_unreachable`, `down_timeout`, `down_redirect_loop`, `down_connection_reset`, or `down_other`.

### Step 6: Export Dual Standardized CSV Deliverables
Format all collected records according to the 14-field schema (refer to [Data Schema](references/data-schema.md)) and export with UTF-8 BOM (`utf-8-sig`):

```python
# Lead Reason assignment:
# if website_type == "none": lead_reason = "no_website"
# elif website_type in ("social", "directory"): lead_reason = f"no_own_website_{website_type}"
# elif website_status == "up": lead_reason = "has_website_up"
# else: lead_reason = f"website_{website_status}"
```

Generate two CSV files:
1. `output/<location>_<niche>_all_leads.csv`: The complete roster of all unique discovered businesses.
2. `output/<location>_<niche>_website_opportunity_leads.csv`: Filtered view containing only businesses where `lead_reason != "has_website_up"`.

### Step 7: Present Honest Execution Summary
Provide an honest summary of metrics derived directly from the generated files without data fabrication:

```text
Niche: <Niche>
Location: <Location>

Discovery Metrics:
- Total unique leads collected: <Count>
- Geographic queries executed: <Count>
- Target sub-localities searched: <List of areas>

Website Status Breakdown:
- Functional websites (Up): <Count>
- No website listed: <Count>
- Social profile only (No dedicated website): <Count>
- Directory listing only: <Count>
- Broken / unreachable websites: <Count>

Total Website Opportunity Leads: <Count>

Deliverable Files:
✓ Complete Leads CSV: <Path>
✓ Website Opportunity Leads CSV: <Path>
```

---

## Constraints & Quality Rules
* **No Fabricated Data**: Never invent business names, contact info, or website statuses. Only report actual records collected.
* **No Hardcoded Niches or Cities**: Always dynamically adapt queries to the user's requested domain and geography.
* **No Anti-Bot Evasion**: Do not bypass CAPTCHAs, access controls, or authentication systems.
* **Excel Compatibility**: Both CSV files must use `utf-8-sig` encoding and standard 14-field columns.
