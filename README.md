<div align="center">

# 🗺️ Google Maps Lead Generation & Website Opportunity Skill

### Autonomous Lead Discovery, Geographic Partitioning & Website Opportunity Engine for AI Coding Agents

[![npm version](https://img.shields.io/npm/v/google-maps-lead-generation.svg?style=for-the-badge&color=CB3837&logo=npm)](https://www.npmjs.com/package/google-maps-lead-generation)
[![npm downloads](https://img.shields.io/npm/dt/google-maps-lead-generation.svg?style=for-the-badge&color=2563EB&logo=npm)](https://www.npmjs.com/package/google-maps-lead-generation)
[![Agent Skills Compliant](https://img.shields.io/badge/Agent_Skills-Specification_Compliant-7C3AED.svg?style=for-the-badge&logo=anthropic)](https://agentskills.io)
[![ScrapeGraphAI](https://img.shields.io/badge/Core_Engine-ScrapeGraphAI-FF6B6B.svg?style=for-the-badge&logo=python)](https://github.com/ScrapeGraphAI/Scrapegraph-ai)
[![Python Version](https://img.shields.io/badge/Python-3.10+-3776AB.svg?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

<br/>

Specialized for **Claude Code** · **Google Antigravity** · **Cursor IDE** · **Windsurf** · **VS Code Copilot** · **Gemini CLI**

<br/>

```bash
npx google-maps-lead-generation init
```

</div>

---

## ⚡ What This Does

A production-grade **[Agent Skill](https://agentskills.io)** that systematically discovers, extracts, deduplicates, and verifies business leads across target geographic territories on Google Maps using **[ScrapeGraphAI](https://github.com/ScrapeGraphAI/Scrapegraph-ai)**.

Automatically categorizes and isolates high-intent B2B outreach prospects:
* 🚫 **No Website Listed**: Businesses with zero web presence on Google Maps.
* 📱 **Social Profile Only**: Businesses linking only to Facebook, Instagram, TikTok, LinkedIn, or WhatsApp.
* 📂 **Directory Listing Only**: Businesses relying solely on portals and aggregators (oladoc, marham, yelp).
* 💥 **Broken / Unreachable Websites**: Listed websites failing HTTP health checks (DNS failure, HTTP 404/500, SSL expired, timeout).

---

## ⚡ Quick Install via NPX

Run one command in the root of any workspace or project:

```bash
npx google-maps-lead-generation init
```

The interactive installer guides you through configuring your AI editor or platform:

```text
Google Maps Lead Generation & Website Opportunity Skill v1.0.0
Powered by ScrapeGraphAI · Compatible with all Agentic AI IDEs & CLIs

Select your AI platform or IDE: (Use ↑/↓ arrows, Enter to select, or press 1-7)

  ● [1] All Platforms (Claude, Antigravity, Cursor, Windsurf, Copilot, Gemini) - [Recommended]
    [2] Claude Code CLI (CLAUDE.md)
    [3] Google Antigravity & Gemini CLI (AGENTS.md & GEMINI.md)
    [4] Cursor IDE (.cursorrules & .cursor/rules/*.mdc)
    [5] Windsurf IDE (.windsurfrules)
    [6] VS Code / GitHub Copilot (.github/copilot-instructions.md)
    [7] Export Standalone Prompt for Web LLMs (ChatGPT, Claude.ai)
```

### CLI Command Options

| Command | Action |
|:---|:---|
| `npx google-maps-lead-generation` | Launch interactive platform installer |
| `npx google-maps-lead-generation init` | Launch interactive setup wizard |
| `npx google-maps-lead-generation init -y` | Auto-install adapters for all IDEs silently (CI-ready) |
| `npx google-maps-lead-generation prompt` | Export standalone prompt to `./lead-gen-prompt.md` |
| `npx google-maps-lead-generation -v` | Display version number |
| `npx google-maps-lead-generation -h` | Display help message |

---

## 🌟 Key Features

* 🧠 **ScrapeGraphAI Core Engine**: Powered by LLM graph pipelines (`SmartScraperGraph`, `ScriptCreatorGraph`, `SearchGraph`). No brittle, hardcoded CSS selectors—automation scripts are synthesized dynamically on demand!
* 🏙️ **Systematic Geographic Decomposition**: Overcomes Google Maps feed truncation caps (20–120 listings) by automatically partitioning cities into 8–15 administrative sectors, towns, and commercial districts.
* 🔎 **Place ID Deduplication**: Robust cross-query deduplication via Google Maps Place IDs (`!1s...`), preventing duplicate business records across overlapping zones.
* 🌐 **Website Health & Opportunity Detection**: Probes standalone websites via parallel HTTP checks with transient failure retry logic while classifying social profiles (Facebook, Instagram, TikTok, WhatsApp) and directories (oladoc, marham, yelp) as direct website opportunities.
* 📊 **Dual Sales-Ready CSV Deliverables**:
  1. `[location]_[niche]_all_leads.csv` — Full universe of unique discovered businesses.
  2. `[location]_[niche]_website_opportunity_leads.csv` — High-intent outreach prospects (missing, broken, or social-only websites).
* 🧹 **Pristine Data Sanitization**: Automatically strips font icon glyphs (, ) and newline artifacts (`\n`) for direct import into Excel and CRMs.
* 🛡️ **100% Agent Skills Spec Compliant**: Fully verified with the official [`skills-ref`](https://github.com/agentskills/agentskills/tree/main/skills-ref) validator.

---

## 🏗️ Architecture & Pipeline

```text
               ┌────────────────────────────────────────────────────────┐
               │                     User Prompt                        │
               │  "Find all physiotherapists in Lahore & export CSV"    │
               └──────────────────────────┬─────────────────────────────┘
                                          │
                                          ▼
               ┌────────────────────────────────────────────────────────┐
               │               Agent Parameter Extraction               │
               │   • Niche Normalization (physiotherapy, rehab center)  │
               │   • Geographic Decomposition (Gulberg, DHA, Cantt...)  │
               └──────────────────────────┬─────────────────────────────┘
                                          │
                                          ▼
               ┌────────────────────────────────────────────────────────┐
               │                 ScrapeGraphAI Engine                   │
               │   • SmartScraperGraph / ScriptCreatorGraph             │
               │   • Playwright DOM feed navigation & scrolling         │
               │   • Place ID (!1s...) deduplication registry           │
               └──────────────────────────┬─────────────────────────────┘
                                          │
                                          ▼
               ┌────────────────────────────────────────────────────────┐
               │              Website Health & Verification             │
               │   • Social / Directory Profiling (not_own_website)     │
               │   • Multi-threaded HTTP Health Probing (12s + Retry)   │
               │   • Status: up, down_4xx, down_5xx, ssl_error, timeout │
               └──────────────────────────┬─────────────────────────────┘
                                          │
                     ┌────────────────────┴────────────────────┐
                     ▼                                         ▼
   ┌───────────────────────────────────┐     ┌───────────────────────────────────┐
   │        1. Complete Leads          │     │    2. Website Opportunity Leads   │
   │  [location]_[niche]_all_leads.csv │     │ [location]_[niche]_opportunities  │
   │  (Every discovered business)      │     │ (No website / social only / down) │
   └───────────────────────────────────┘     └───────────────────────────────────┘
```

---

## 🤖 Supported AI IDEs & Agentic CLIs

This skill provides native, zero-configuration support for all leading agentic coding environments and command-line agents:

| Platform / IDE | Native Integration File | Adapter Location |
|:---|:---|:---|
| **Claude Code CLI** | `CLAUDE.md` | `adapters/claude/CLAUDE.md` |
| **Google Antigravity IDE / CLI** | `AGENTS.md` | `adapters/antigravity/AGENTS.md` |
| **Cursor IDE (v0.40+)** | `.cursor/rules/google-maps-lead-generation.mdc` | `adapters/cursor/google-maps-lead-generation.mdc` |
| **Cursor IDE (Legacy)** | `.cursorrules` | `adapters/cursor/.cursorrules` |
| **Windsurf IDE (Codeium)** | `.windsurfrules` | `adapters/windsurf/.windsurfrules` |
| **VS Code / GitHub Copilot** | `.github/copilot-instructions.md` | `adapters/copilot/copilot-instructions.md` |
| **Gemini CLI / Google AI** | `GEMINI.md` | `adapters/gemini/GEMINI.md` |
| **Cline / Roo Code** | `.clinerules` | `adapters/cline/.clinerules` |
| **Web LLMs (ChatGPT, Claude.ai, DeepSeek)** | *Prompt Template* | `adapters/system-prompt/prompt.md` |
| **Universal Agent Skills Standard** | `SKILL.md` | [Specification Standard](https://agentskills.io) |

### How to Use With Your Favorite Tool

* **Claude Code**: Simply run `claude` in your project root or copy `CLAUDE.md`.
* **Google Antigravity**: Place in your `.agents/skills/` directory or reference `AGENTS.md`.
* **Cursor**: The bundled `.cursorrules` and `.cursor/rules/google-maps-lead-generation.mdc` automatically activate when discussing scraping or leads.
* **Windsurf**: Cascade natively reads the `.windsurfrules` configuration.
* **GitHub Copilot**: Automatically loaded via `.github/copilot-instructions.md` in VS Code / JetBrains.
* **Web Chat (ChatGPT / Claude.ai)**: Copy the standalone prompt from `adapters/system-prompt/prompt.md` into your conversation.

---

## 📁 Repository Structure

Adheres to the official [Agent Skills Directory Specification](https://agentskills.io/specification):

```text
google-maps-lead-generation/
├── SKILL.md                              # Main agent instructions + frontmatter
├── AGENTS.md                             # Google Antigravity & universal agent directives
├── CLAUDE.md                             # Claude Code CLI instructions
├── GEMINI.md                             # Gemini CLI & Google AI directives
├── README.md                             # Comprehensive showcase documentation
├── LICENSE                               # MIT License
├── package.json                          # npm package configuration
├── requirements.txt                      # Python dependencies
├── bin/
│   └── cli.js                            # Executable CLI installer (npx)
├── .cursorrules                          # Cursor IDE legacy rule file
├── .windsurfrules                        # Windsurf IDE rule file
├── .clinerules                           # Cline / Roo Code rules
├── .cursor/rules/
│   └── google-maps-lead-generation.mdc  # Cursor 0.40+ rule engine definition
├── .github/
│   └── copilot-instructions.md           # GitHub Copilot instructions
├── adapters/                             # Standalone adapters for external projects
│   ├── antigravity/AGENTS.md
│   ├── claude/CLAUDE.md
│   ├── cursor/.cursorrules
│   ├── cursor/google-maps-lead-generation.mdc
│   ├── windsurf/.windsurfrules
│   ├── copilot/copilot-instructions.md
│   ├── gemini/GEMINI.md
│   ├── cline/.clinerules
│   └── system-prompt/prompt.md
├── references/                           # Progressive disclosure documentation
│   ├── scrapegraph-integration.md        # ScrapeGraphAI graph patterns & LLM configs
│   ├── workflow-architecture.md          # End-to-end technical pipeline breakdown
│   ├── data-schema.md                    # Standardized 14-field CSV & JSON schema
│   └── geographic-methodology.md         # City partitioning & query matrix strategy
└── assets/                               # Templates and schema definitions
    ├── sample_output_schema.json         # JSON schema for lead records
    └── sample_queries.txt                # Example geographic query matrix
```

---

## 🚀 Quickstart & Usage

### 1. Prerequisites

* Python 3.10 or higher
* Node.js 16+ (for `npx` execution)
* Chrome / Chromium browser binary (managed by Playwright)
* An API key for your preferred LLM (OpenAI, Google Gemini, Anthropic, or local Ollama)

### 2. Environment Setup

Configure your API key in your project's `.env`:

```env
OPENAI_API_KEY=your-openai-api-key
# OR
GEMINI_API_KEY=your-gemini-api-key
```

### 3. Running with an AI Agent

When activated in an Agent Skills client (Claude Code, Antigravity IDE, Cursor, etc.), simply instruct your agent:

> *"Generate a lead list of all software houses in Karachi and find businesses without functional websites."*

The agent reads `SKILL.md`, consults the reference guides, initializes ScrapeGraphAI, extracts listings, audits websites, and outputs the two CSV files.

---

## 📊 Deliverable Schema (14 Columns)

Both output CSV files follow this exact 14-field layout in UTF-8-SIG (Excel ready):

| # | Field | Type | Description |
|---|---|---|---|
| 1 | `business_name` | string | Sanitized business / clinic name |
| 2 | `category` | string | Google Maps category tag |
| 3 | `phone` | string | Cleaned phone number (no icon or newline artifacts) |
| 4 | `address` | string | Cleaned physical address |
| 5 | `rating` | string | Average star rating (1.0 – 5.0) |
| 6 | `reviews` | string | Review count, e.g. `(142)` |
| 7 | `website` | string | Raw destination URL listed on Google Maps |
| 8 | `website_type` | enum | `website`, `social`, `directory`, `none` |
| 9 | `website_status` | enum | `up`, `no_website`, `not_own_website`, `down_timeout`, etc. |
| 10 | `website_status_code` | int/str | HTTP response code (e.g. `200`, `404`, `500`) |
| 11 | `website_status_detail`| string | Diagnostic error reason (e.g. `conn: ConnectionRefusedError`) |
| 12 | `lead_reason` | enum | `no_website`, `no_own_website_social`, `website_down_*`, `has_website_up` |
| 13 | `place_url` | string | Canonical Google Maps Place URL |
| 14 | `source_query` | string | Search query that surfaced the lead |

---

## 🤖 Supported LLM Backends

ScrapeGraphAI supports all major LLM backends:

| Provider | Model Identifier | Config Key |
|---|---|---|
| **OpenAI** | `openai/gpt-4o-mini`, `openai/gpt-4o` | `api_key: os.environ["OPENAI_API_KEY"]` |
| **Google Gemini** | `gemini/gemini-1.5-flash`, `gemini/gemini-1.5-pro` | `api_key: os.environ["GEMINI_API_KEY"]` |
| **Anthropic** | `anthropic/claude-3-5-sonnet` | `api_key: os.environ["ANTHROPIC_API_KEY"]` |
| **Ollama (Local)** | `ollama/llama3`, `ollama/mistral` | `base_url: "http://localhost:11434"` |

---

## ✅ Spec Validation

To validate this skill against the official Agent Skills standard:

```bash
pip install skills-ref
python -m skills_ref.cli validate ./google-maps-lead-generation
```

Output:
```text
Valid skill: google-maps-lead-generation
```

---

## 🤝 Contributing

Contributions, feedback, and pull requests are welcome! If you encounter any bugs or have feature suggestions, please open an issue on the [GitHub repository](https://github.com/ahmmikun/google-maps-lead-generation/issues).

---

## 📄 License

Distributed under the [MIT License](LICENSE). Built for the open AI agent ecosystem.
