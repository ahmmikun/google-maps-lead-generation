# Workflow Architecture (ScrapeGraphAI Core)

This document describes the end-to-end architecture of the **Google Maps Lead Generation & Website Opportunity Workflow**, powered by **[ScrapeGraphAI](https://github.com/ScrapeGraphAI/Scrapegraph-ai)**.

---

## 1. High-Level Flowchart

```text
[ USER REQUEST ]
  │ e.g. "Create a CSV of all physiotherapists in Lahore"
  ▼
[ 1. PARAMETER EXTRACTION & NORMALIZATION (Agent Intelligence) ]
  ├─ Target Niche: "physiotherapy clinic", "physiotherapist", "physical therapy"
  └─ Target Location: "Lahore"
  ▼
[ 2. GEOGRAPHIC DECOMPOSITION & QUERY GENERATION (Agent Intelligence) ]
  ├─ Decompose city into administrative zones, towns, commercial sectors
  └─ Generate matrix: [Niche Term] × [Sub-locality] + [Broader Term] × [City]
  ▼
[ 3. SCRAPEGRAPHAI ENGINE & CODE GENERATION ]
  ├─ ScrapeGraphAI `SmartScraperGraph`: Multi-attribute scraping using LLM + Playwright DOM logic
  ├─ ScrapeGraphAI `ScriptCreatorGraph`: Generates on-demand custom scripts for user workflows
  ├─ Google Maps Place Extraction: Name, category, address, phone, rating, reviews, website
  ├─ Deduplication: Google Maps Place ID (!1s...) resolution
  └─ Cleanses PUA icon glyphs (phone/pin font icons) and newline characters
  ▼
[ 4. WEBSITE AVAILABILITY & LEAD CLASSIFICATION ]
  ├─ URL Pre-classification:
  │   ├─ Empty/Missing → type: "none", status: "no_website"
  │   ├─ Social Profiles (FB, IG, YouTube, WhatsApp, TikTok, etc.) → type: "social", status: "not_own_website"
  │   └─ Aggregators & Directories (oladoc, marham, bit.ly, etc.) → type: "directory", status: "not_own_website"
  ├─ Standalone Websites:
  │   └─ Multi-threaded HTTP GET verification (parallel workers, 12s timeout)
  │   └─ Automatic retry for transient timeouts and connection resets
  │   └─ Classifies as: up, down_http_4xx, down_http_5xx, down_ssl_error,
  │                     down_dns_or_unreachable, down_timeout, etc.
  └─ Enriches lead records with verification diagnostics
  ▼
[ 5. CSV EXPORT & REASON BREAKDOWN ]
  ├─ Standardizes 14-field production schema (UTF-8-SIG for Excel/CRM)
  ├─ Generates `[location]_[niche]_all_leads.csv` (Complete dataset)
  ├─ Generates `[location]_[niche]_website_opportunity_leads.csv` (Filtered website opportunities)
  └─ Prints execution statistics and status breakdown
  ▼
[ 6. EXECUTION SUMMARY & HONEST COVERAGE REPORT ]
  └─ Quantifies discovered leads, searched queries, and opportunities without fabrication
```

---

## 2. Component Breakdown

### A. Agent Layer (SKILL.md)
* **Responsibility**: Interprets the user's intent, extracts geographic constraints, expands the niche safely (avoiding semantic drift), decomposes the territory into realistic sub-localities, orchestrates ScrapeGraphAI graphs, and produces the final coverage report.
* **On-Demand Script Creation**: Instead of maintaining static pre-baked scripts in a `scripts/` folder, the agent leverages ScrapeGraphAI (`ScriptCreatorGraph` and `SmartScraperGraph`) to synthesize and execute targeted scraping scripts on the fly.

### B. ScrapeGraphAI Core Engine
* **`SmartScraperGraph`**: Direct prompt-driven scraping of dynamic Google Maps feeds and business profile pages.
* **`ScriptCreatorGraph`**: Generates robust, custom Playwright/BeautifulSoup automation code dynamically when users request dedicated reusable scraping scripts.
* **Playwright Backend**: Handles JavaScript rendering, feed scrolling, and DOM interaction in both headless and headed modes.

### C. Website Verification Engine
* **Categorization Engine**: Separates commercial websites from social media pages and directory listings before initiating network requests.
* **Concurrency & Resilience**: Non-destructive HTTP GET requests with custom User-Agent headers, testing reachability with automatic retries for transient errors.

### D. Dual CSV Delivery
* **Complete Leads Dataset**: Contains every discovered business lead within the target geography.
* **Website Opportunity Dataset**: Filters exclusively for businesses lacking a functional website (no website listed, social/directory profile only, or verified broken URL).
