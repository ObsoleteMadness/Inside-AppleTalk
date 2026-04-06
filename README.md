# appletalk-docs

AppleTalk documentation OCR'd and converted to Markdown, published as a
[GitHub Pages site](https://obsoletemadness.github.io/appletalk-docs/) built with
[Hugo](https://gohugo.io/).

## Contributing

Contributions are warmly welcomed — especially OCR corrections, formatting fixes, and
missing content. See the [Contributing page](https://obsoletemadness.github.io/appletalk-docs/contributing/)
on the site for full instructions, or read `content/contributing.md` directly.

Every page on the site has an **"Edit this page"** link that opens the source file in
GitHub's editor so you can submit a fix without any local setup.

## Local Development

You need [Hugo extended](https://gohugo.io/installation/) v0.128.0 or newer.

```bash
# Clone the repository
git clone https://github.com/ObsoleteMadness/appletalk-docs.git
cd appletalk-docs

# Install the theme (one-time)
git clone https://github.com/alex-shpak/hugo-book.git themes/hugo-book --depth 1

# Start the live-reload dev server
hugo server --buildDrafts
```

Then open <http://localhost:1313/appletalk-docs/> in your browser.

## ASCII Diagrams

In addition to Mermaid blocks, the site can render ASCII charts into SVG using
the browser-side `svgbob-wasm` renderer.

Use fenced code blocks with one of these languages:

- `goat`
- `ascii`
- `svgbob`

Example:

````markdown
```goat
+------------------+
| AppleTalk node A |----->+------------------+
+------------------+      | AppleTalk node B |
                          +------------------+
```
````

## Deployment

The site is automatically built and deployed to GitHub Pages whenever a commit is
merged to `main` via the workflow in `.github/workflows/pages.yml`.
