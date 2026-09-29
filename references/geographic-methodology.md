# Geographic Decomposition & Query Methodology

This document outlines the systematic strategy for maximizing geographic search coverage on Google Maps.

---

## 1. The Coverage Problem on Google Maps

Google Maps limits search results using a proximity-weighted ranking model and pagination limits:
1. **Feed Truncation**: A single query (e.g., `dentists in Lahore`) will rarely return more than 100–120 listings, even if thousands exist across the city.
2. **Geographical Centering Bias**: Google Maps clusters results near the city center or high-density search coordinates, starving outlying suburbs, administrative towns, and business districts of visibility.

**Rule**: Never assume a single city-wide query represents full coverage. Geographic decomposition is mandatory.

---

## 2. Systematic Decomposition Hierarchy

When given a target location (e.g., city or region), the agent must decompose the location into realistic sub-localities:

```text
Target City (e.g., Lahore)
  ├── High-Density Commercial Hubs (e.g., Gulberg, Blue Area, Saddar)
  ├── Planned Residential/Commercial Estates (e.g., DHA, Bahria Town)
  ├── Major Sub-Towns & Tehsils (e.g., Model Town, Johar Town, Cantt)
  ├── Outlying Suburban Belts (e.g., Shahdara, Raiwind Road)
  └── Secondary/Industrial Quarters (e.g., Quaid-e-Azam Industrial Estate)
```

### City Reference Examples

#### Lahore, Pakistan
* Core Towns & Areas: DHA Lahore, Gulberg Lahore, Model Town Lahore, Johar Town Lahore, Bahria Town Lahore, Cantt Lahore, Faisal Town Lahore, Garden Town Lahore, Samanabad Lahore, Wapda Town Lahore, Shahdara Lahore, Iqbal Town Lahore, Cavalry Ground Lahore.

#### Karachi, Pakistan
* Core Towns & Areas: Clifton Karachi, DHA Karachi, Gulshan-e-Iqbal Karachi, Saddar Karachi, North Nazimabad Karachi, PECHS Karachi, Bahadurabad Karachi, Tariq Road Karachi, Korangi Karachi, Malir Karachi, Federal B Area Karachi.

#### Islamabad / Rawalpindi, Pakistan
* Core Sectors & Towns: Blue Area Islamabad, F-6 Islamabad, F-7 Islamabad, F-8 Islamabad, F-10 Islamabad, F-11 Islamabad, G-9 Islamabad, G-11 Islamabad, I-8 Islamabad, DHA Islamabad, Bahria Town Islamabad, Saddar Rawalpindi, Satellite Town Rawalpindi.

*Note: For any international or domestic city, the agent uses its own geographic knowledge base to determine the appropriate 8–20 major administrative and commercial subdivisions.*

---

## 3. Query Matrix Formula

To ensure both depth in high-density areas and broad coverage across the whole city, construct queries using a two-tier formula:

### Formula
```text
Queries = (Primary Niche Term 1 × All Sub-Localities)
        + (Primary Niche Term 2 × Top 5 Sub-Localities)
        + (Secondary Niche Terms × Target City)
```

### Concrete Example: "Physiotherapists in Lahore"

1. **Niche Normalization** (2–3 precise terms, avoid semantic drift):
   * Primary 1: `physiotherapy clinic`
   * Primary 2: `physiotherapist`
   * Secondary 1: `physical therapy`
   * Secondary 2: `rehab center`

2. **Generated Query Set**:
   * `physiotherapy clinic DHA Lahore`
   * `physiotherapy clinic Gulberg Lahore`
   * `physiotherapy clinic Model Town Lahore`
   * `physiotherapy clinic Johar Town Lahore`
   * `physiotherapy clinic Bahria Town Lahore`
   * `physiotherapy clinic Cantt Lahore`
   * `physiotherapy clinic Faisal Town Lahore`
   * `physiotherapist DHA Lahore`
   * `physiotherapist Gulberg Lahore`
   * `physiotherapist Model Town Lahore`
   * `physiotherapist Johar Town Lahore`
   * `physical therapy Lahore`
   * `rehab center Lahore`

---

## 4. Guardrails Against Semantic Drift

* **Do not expand too broadly**: If searching for "Dentists", do NOT expand into "Medical Clinics" or "Hospitals".
* **Do not invent subdivisions**: Use verifiable town and neighborhood names.
* **Avoid redundant overlaps**: Do not query micro-streets (e.g. `Street 4 Block C Johar Town`) when the town level `Johar Town` already captures them in Google Maps.

---

## 5. Coverage Analysis & Honest Reporting

1. **Deduplication Audit**: The agent counts how many unique Google Maps Place IDs were discovered vs total places encountered. High duplicate overlap in adjacent zones indicates thorough saturation.
2. **Cold Zones**: If an area yields 0 or 1 result, the agent notes whether that area is purely industrial or residential without commercial clinics.
3. **Never Fabricate**: Any business count, lead reason, or metric reported to the user must originate strictly from the output files produced by `scripts/build_csvs.py`.
