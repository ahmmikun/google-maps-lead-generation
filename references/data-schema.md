# Data Schema Reference

This document defines the schema, types, allowed values, and file contracts across the lead generation pipeline.

---

## 1. Final CSV Deliverable Schema (14 Fields)

Both final CSV files (`[location]_[niche]_all_leads.csv` and `[location]_[niche]_website_opportunity_leads.csv`) adhere to this exact 14-column layout:

| # | Field | Type | Description | Example |
|---|---|---|---|---|
| 1 | `business_name` | string | Normalized business/organization name | `Lahore Spine & Rehab Clinic` |
| 2 | `category` | string | Google Maps category classification | `Physiotherapy clinic` |
| 3 | `phone` | string | Cleaned phone number (no leading/embedded `\n`) | `+92 300 1234567` |
| 4 | `address` | string | Cleaned full street / physical address | `14-C, Main Boulevard, Gulberg III, Lahore` |
| 5 | `rating` | string | Google rating score (1.0 - 5.0) | `4.8` |
| 6 | `reviews` | string | Total count or review label | `(87)` or `87 reviews` |
| 7 | `website` | string | Raw destination URL listed on Google Maps | `https://example-rehab.com` |
| 8 | `website_type` | enum | Categorization of the website URL | `website`, `social`, `directory`, `none` |
| 9 | `website_status` | enum | Health or verification status of the website | `up`, `no_website`, `down_timeout` |
| 10 | `website_status_code` | integer/string | HTTP response status code (if checked) | `200`, `404`, `500` |
| 11 | `website_status_detail`| string | Diagnostic error reason if broken | `conn: ConnectionRefusedError` |
| 12 | `lead_reason` | enum | Categorization rule explaining why this is a lead | `no_website`, `no_own_website_social`, `website_down_http_4xx`, `has_website_up` |
| 13 | `place_url` | string | Canonical Google Maps Place URL (excluding query params) | `https://www.google.com/maps/place/...` |
| 14 | `source_query` | string | The specific search query that discovered this place | `physiotherapy DHA Lahore` |

---

## 2. Enumerated Values

### `website_type`
* `none`: No website was listed on Google Maps.
* `social`: The URL points to a social network profile (e.g., Facebook, Instagram, YouTube, WhatsApp, TikTok, LinkedIn, Twitter/X).
* `directory`: The URL points to an aggregator, medical portal, or shortener (e.g., oladoc.com, marham.pk, goo.gl, bit.ly, yelp.com).
* `website`: The URL is a standalone business website.

### `website_status`
* `no_website`: Google Maps has no website entry for this business.
* `not_own_website`: The business links to a social network or directory aggregator instead of a dedicated site.
* `up`: HTTP GET returned a 2xx or 3xx status code.
* `down_http_4xx`: Returned client error (e.g., 404 Not Found, 403 Forbidden).
* `down_http_5xx`: Returned server error (e.g., 500 Internal Server Error, 502 Bad Gateway).
* `down_ssl_error`: SSL certificate handshake failed or expired.
* `down_dns_or_unreachable`: Domain name resolution failed or host connection refused.
* `down_timeout`: Server failed to respond within the configured timeout period.
* `down_redirect_loop`: URL encountered too many redirect hops.
* `down_connection_reset`: Connection terminated prematurely by peer (`ChunkedEncodingError` / socket reset).
* `down_other`: Other unclassified HTTP exception.

### `lead_reason`
* `no_website`: Business has no website listed at all.
* `no_own_website_social`: Business relies entirely on social media presence.
* `no_own_website_directory`: Business relies on third-party aggregators/directories.
* `website_down_*`: Business has a website listed, but it is demonstrably unreachable (e.g., `website_down_http_4xx`, `website_down_dns_or_unreachable`).
* `has_website_up`: Business has a functional, verified website (excluded from the website opportunity dataset).

---

## 3. Intermediate Artifact Schemas

### `place_hrefs.json`
Dictionary keyed by Google Maps Place ID (or place URL fallback):
```json
{
  "0x391904...:0x7c2...": {
    "href": "https://www.google.com/maps/place/...",
    "name": "Lahore Spine & Rehab",
    "query": "physiotherapist Gulberg Lahore",
    "place_id": "0x391904...:0x7c2..."
  }
}
```

### `places_raw.json`
List of business records extracted by Playwright:
```json
[
  {
    "name": "Lahore Spine & Rehab",
    "category": "Physiotherapy clinic",
    "address": "14-C Main Blvd, Gulberg III, Lahore",
    "phone": "+92 300 1234567",
    "website": "https://example-spine.pk",
    "rating": "4.9",
    "reviews": "(124)",
    "place_url": "https://www.google.com/maps/place/...",
    "query": "physiotherapist Gulberg Lahore",
    "source": "google_maps",
    "place_id": "0x391904...:0x7c2..."
  }
]
```

### `website_status.json`
Dictionary keyed by unique website URL:
```json
{
  "https://example-spine.pk": {
    "url": "https://example-spine.pk",
    "type": "website",
    "status": "up",
    "code": 200,
    "reason": "https://example-spine.pk/",
    "error": null
  }
}
```
