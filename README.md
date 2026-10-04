# Shangyu Lou — Academic Homepage

Live website: https://shangyulou.github.io/

An English academic website with two tabs: About and Selected Publications. Built with plain HTML, CSS, and JavaScript, with no build tools or runtime dependencies.

## Edit the content

Edit `profile.js`. The `biography` array contains paragraphs; a paragraph may use a `parts` array of strings and `{ text, url }` objects to include links. Keep the fallback content in `index.html` in sync for visitors without JavaScript.

The `publications` array controls the three selected papers and their order. Each entry has `title`, `authors`, `year`, `venue`, `paper`, and `pdf`. Author names matching the profile name are emphasized. Use official publisher links where available.

`photo` and `photoAlt` control the portrait. The `email`, `scholar`, `github`, `orcid`, and `twitter` fields control icons beneath the portrait; blank values are hidden. Only Google Scholar is currently displayed. The `cv` and `experience` fields are reserved and are not displayed.

## Preview and publish

Run `python -m http.server 8000 --bind 127.0.0.1` from this folder, then visit http://127.0.0.1:8000/ .

Commit changes to the `main` branch of `shangyulou/shangyulou.github.io`. GitHub Pages publishes from the repository root. Bump the asset version query strings in `index.html` when changing JavaScript or CSS to avoid stale browser caches.

Navigation uses `#about` and `#selected-publications`. The old `#publications` link opens Selected Publications; other unknown fragments fall back to About. Without JavaScript, both pages are visible. Theme preferences are saved locally in the visitor's browser.
