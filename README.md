# Shangyu Lou — Academic Homepage

Live website: https://shangyulou.github.io/

An English-only academic homepage with a white background, magenta links, a right-aligned portrait, simple navigation, a dark footer, and a light/dark theme toggle. Uses plain HTML, CSS, and JavaScript, with no build tools, third-party fonts, analytics, or runtime dependencies.

## Edit your information

Edit `profile.js` and commit to `main`. GitHub Pages automatically publishes updates.

- `firstName`, `lastName`: your public name.
- `biography`: an array of English paragraphs.
- `role`, `affiliation`: optional position and institution.
- `photo`: a relative image path such as `./portrait.jpg`. Upload the actual photo to the same repository. Until then, the site shows a clearly labeled placeholder. Use `photoAlt` to describe the image.
- `email`, `github`, `scholar`, `orcid`, `twitter`: public contact details and profile links. Empty values are hidden. Only add information you want publicly visible.
- `cv`: a relative PDF path such as `./cv.pdf`, or a complete HTTPS link. Upload the file before adding its path.
- `updated`: the date of your latest content update, in English.

The biography and portrait were supplied by Shangyu Lou. Selected publications are shown directly on the About page, in the order given in `profile.js`. The top navigation contains About and Blog.

## Research interests

Add strings or objects to `research`:

```js
{ title: 'Your research area', description: 'A short description of your work.' }
```

## Publications

Add real publications to `publications`:

```js
{
  title: 'Your paper title',
  authors: 'Author One, Author Two',
  year: 2026,
  venue: 'Journal or Conference',
  keywords: ['keyword'],
  paper: 'https://example.org/paper',
  code: '',
  project: '',
  bibtex: '@article{key,\n  title={Your paper title},\n  year={2026}\n}'
}
```

The `publications` array controls the Selected Publications section on the homepage. Entries retain their array order. Use `paper` for the paper page and `pdf` for a public PDF link. Author names matching the profile name are emphasized.

## Archived profile fields

`cv` and `experience` are retained in the data file for potential future use but are not displayed. Example:

```js
{ period: '2024–2026', title: 'Degree or position', institution: 'Your institution', description: 'A short description.' }
```

## Blog

Add entries to `posts`:

```js
{ title: 'Your post title', date: 'October 4, 2026', summary: 'An introduction.', content: 'Optional full text.', url: '' }
```

An optional `url` links to an externally hosted full article. Keep entries in your preferred display order.

## Preview locally

Open `index.html` directly, or run:

```sh
python -m http.server 8000 --bind 127.0.0.1
```

Visit http://127.0.0.1:8000/ . The source files are `index.html`, `styles.css`, `site.js`, `profile.js`, `portrait.jpg`, and `.nojekyll`.

## Deployment

GitHub repository: `shangyulou/shangyulou.github.io`. Settings → Pages → Deploy from a branch → `main` / `(root)`.

Navigation uses URL fragments (`#about`, `#blog`, `#selected-publications`), so direct links work on GitHub Pages without server configuration. The former `#publications` link now opens the Selected Publications section on About; `#cv` falls back to About. With JavaScript disabled, all sections remain available as one long page. A print stylesheet includes all sections. Theme preferences are saved locally in the visitor's browser.
