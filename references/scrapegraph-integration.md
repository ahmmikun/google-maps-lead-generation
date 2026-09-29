# ScrapeGraphAI Integration Reference

This document provides configuration patterns, graph architectures, and prompt templates for using **[ScrapeGraphAI](https://github.com/ScrapeGraphAI/Scrapegraph-ai)** as the core extraction and code-generation engine in the lead discovery workflow.

---

## 1. What is ScrapeGraphAI?

[ScrapeGraphAI](https://github.com/ScrapeGraphAI/Scrapegraph-ai) is an open-source web scraping Python library that uses Large Language Models (LLMs) and direct graph logic to create scraping pipelines for websites, local documents, and search engines.

Instead of writing brittle, fixed scraping scripts, ScrapeGraphAI:
1. Dynamically understands web page DOM layouts.
2. Extracts targeted schema data with natural language prompts.
3. Can generate standalone, custom Python scraping scripts on demand using `ScriptCreatorGraph`.

---

## 2. Core ScrapeGraphAI Graphs Used in This Skill

### A. `SmartScraperGraph`
Extracts structured information directly from a single URL or HTML source using an LLM.

```python
from scrapegraphai.graphs import SmartScraperGraph

graph_config = {
    "llm": {
        "api_key": os.environ.get("OPENAI_API_KEY"),
        "model": "openai/gpt-4o-mini",
    },
    "verbose": True,
    "headless": True,
}

smart_scraper = SmartScraperGraph(
    prompt="""
    Extract all business listings from this Google Maps search result page.
    For each business, extract:
    - business_name: Name of the business
    - category: Business category
    - address: Full address
    - phone: Contact phone number
    - rating: Rating score
    - reviews: Number of reviews
    - website: Official website URL (if available)
    - place_url: URL to the Google Maps listing
    """,
    source="https://www.google.com/maps/search/physiotherapy+DHA+Lahore",
    config=graph_config,
)

result = smart_scraper.run()
```

### B. `ScriptCreatorGraph` (On-Demand Script Generation)
When a user or agent requests a custom, standalone scraping script for a specific niche or portal, `ScriptCreatorGraph` writes the complete Python script automatically.

```python
from scrapegraphai.graphs import ScriptCreatorGraph

script_creator = ScriptCreatorGraph(
    prompt="""
    Write a Python Playwright script that navigates to Google Maps search results,
    scrolls the results feed to load all businesses, and extracts:
    business_name, category, address, phone, rating, reviews, website, and place_url.
    Output the data into a JSON file.
    """,
    source="https://www.google.com/maps/search/dentists+in+Islamabad",
    config=graph_config,
)

generated_script = script_creator.run()
# The generated script code is returned directly and can be saved to a file or executed.
```

### C. `SearchGraph`
Searches the web via a query and automatically extracts relevant business listings from top search results.

```python
from scrapegraphai.graphs import SearchGraph

search_graph = SearchGraph(
    prompt="Find all gyms and fitness centers in Faisalabad with contact numbers and websites",
    config=graph_config,
)

results = search_graph.run()
```

### D. `SmartScraperMultiGraph`
Executes multi-page extraction across a list of URLs (e.g. across multiple Google Maps place URLs or sub-locality searches).

---

## 3. Supported LLM Backends

ScrapeGraphAI supports all major LLM providers:

### OpenAI
```python
graph_config = {
    "llm": {
        "api_key": os.environ["OPENAI_API_KEY"],
        "model": "openai/gpt-4o-mini",  # or openai/gpt-4o
    },
    "headless": True,
}
```

### Google Gemini
```python
graph_config = {
    "llm": {
        "api_key": os.environ["GEMINI_API_KEY"],
        "model": "gemini/gemini-1.5-flash",
    },
    "headless": True,
}
```

### Local / Ollama (Zero Cost / Offline)
```python
graph_config = {
    "llm": {
        "model": "ollama/llama3",
        "base_url": "http://localhost:11434",
    },
    "headless": True,
}
```

### Anthropic Claude
```python
graph_config = {
    "llm": {
        "api_key": os.environ["ANTHROPIC_API_KEY"],
        "model": "anthropic/claude-3-5-sonnet",
    },
    "headless": True,
}
```

---

## 4. Integration in the Lead Generation Pipeline

1. **Query Planning**: The AI Agent decomposes the target city and niche into a query matrix.
2. **Scraping & Code Generation**:
   - The agent invokes `SmartScraperGraph` to extract structured lead data directly from search sources.
   - Alternatively, for repetitive or large-scale batch runs, the agent uses `ScriptCreatorGraph` to create and run custom extraction scripts tailored to the user's specific target directory or site.
3. **Website Verification & Classification**:
   - Classifies URLs into `social`, `directory`, `website`, or `none`.
   - Probes standalone websites to verify reachability.
4. **CSV Export**:
   - Standardizes output into the 14-field schema.
   - Generates `[location]_[niche]_all_leads.csv` and `[location]_[niche]_website_opportunity_leads.csv`.
