# The Compute Initiative — compute.care

Static website. Run `python -m http.server 8000` from the repository and open http://localhost:8000. No build step or package installation is required.

The site uses `site-v2.css` and `site-v2.js`. All primary content and navigation are available without JavaScript. JavaScript adds the compact mobile menu, photo viewer, and email draft form. The form opens the visitor’s email client; it does not send or store submissions.

## Content and maintenance

- `index.html`: mission, program milestones, school introductions, curriculum overview, and partners.
- `schools.html`: Panayapatti and Kuruvikondanpatti profiles.
- `curriculum.html`: seven foundation units and week-eight review/project, plus Python enrichment.
- `events.html`: milestones and classroom photos.
- `about.html`, `contact.html`, `donate.html`: team, involvement, and existing donation destinations.

Program counts (2 schools, 200 students, 700+ hours, 300 books), personnel, partnerships, event dates, and donation destinations come from the repository’s existing published-page content. These are reported milestones, not live counters. Confirm and update them as the program grows. The NSNA link goes to its homepage, not a verified project checkout. The GoFundMe link is preserved from the original site; no donation transactions were performed.

Curriculum content was checked against the shared `Basic_Computer_Skills_Curriculum_India_Revised V2.docx` (October 2025) and `TCi Curriculum_Summary.docx` (April 2026). The latter summarises seven topic weeks; the underlying curriculum explicitly adds week eight for review and a practical project. Python practical files substantiate the enrichment reference. No assessment answer keys or private personnel records are published.

Photos were inspected before use. All photos used on the website already exist in the repository and illustrate their matching school/activity. Shared Drive folders were consulted for school and curriculum context; no new private Drive photo or authenticated Drive URL is published.

## Before publication

Review factual content and the redesign in the pull request, then merge through the repository’s normal publishing process. This change does not configure or replace hosting.

## Stylesheet compatibility

The redesigned pages use versioned asset filenames to avoid reusing cached pre-redesign CSS or JavaScript. `index.css` retains the legacy rules for older HTML still cached during deployment. When changing the markup/style contract, publish a new asset filename and update every page together.

All active pages declare a root base URL because compute.care is hosted at the domain root. This ensures styles, navigation, and photos resolve correctly even if hosting serves an inner page through a trailing-slash URL.

Layout repair validation: all seven pages rendered in Chromium at 1440px and 390px with no horizontal overflow, missing source images, or JavaScript errors. Mobile menu open/Escape close, curriculum expansion, and photo viewer open/Escape close passed. Live-host verification was unavailable from the workspace (502 responses).
