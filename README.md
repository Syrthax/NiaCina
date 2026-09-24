# HiResume

A resume builder that pulls in your GitHub projects, so you can put together a different resume for each application without retyping it.

## Run locally

```bash
npm start
```

Then open `http://localhost:4173` in your browser.

## Features

- Empty fields with example placeholders; collapsible sections and entries keep the editor short
- Profile, contact links (website, LinkedIn, GitHub), summary, skills (chip input) and languages
- Experience, Education, Certifications and Achievements: add, reorder, collapse, remove, or untick an entry to leave it off one version of the resume
- Project picker popup with search, filters and pages; custom projects for non-GitHub work
- GitHub access by username (public repos) or a fine-grained personal access token (includes private repos). Private repos on the resume trigger a warning, with an option to hide their links
- Import skills from your GitHub repo languages and topics, in a paged popup
- Skill suggestions as you type from a catalog of ~230 languages, frameworks, platforms and tools
- Import experience, education, certifications, skills and more from your LinkedIn data export ZIP (read in the browser, nothing uploaded)
- On-device grammar check (Harper) with one-click fixes
- Four templates (Modern, Classic, Compact, Sidebar) and a color theme picker
- Autosaves in your browser; Export/Import JSON to back up or switch between resume versions. The GitHub token is never exported and is only stored if you tick "Remember token"
- Save as PDF via the print dialog; empty sections are left out
