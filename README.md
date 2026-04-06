# Inside-AppleTalk

AppleTalk documentation OCR'd and converted to Markdown, published as a
[GitHub Pages site](https://obsoletemadness.github.io/inside-appletalk/) built with
[Jekyll](https://jekyllrb.com/).

## Contributing

Contributions are warmly welcomed — especially OCR corrections, formatting fixes, and
missing content. See the [Contributing page](https://obsoletemadness.github.io/inside-appletalk/contributing/)
on the site for full instructions, or read `content/contributing.md` directly.

Every page on the site has an **"Edit this page"** link that opens the source file in
GitHub's editor so you can submit a fix without any local setup.

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

## Sources/Attribution

* Sidhu, Gursharan S., Richard F. Andrews, and Alan B. Oppenheimer. 1990. Inside AppleTalk. 2nd ed. Reading, Mass.: Addison-Wesley Pub. Co. Accessed April 4, 2026. https://vintageapple.org/macbooks/pdf/Inside_AppleTalk_Second_Edition_1990.pdf
* AppleTalk® Phase 2 Protocol Specification An Addendum to Inside AppleTalk (APDA™ # C0144LL/A). Accessed April 4, 2026. https://archive.org/details/bitsavers_applecommu0144LLAAppleTalkPhase2ProtocolSpecificat_2289422
* AppleTalk Filing Protocol Engineering Technical Notes (030-M098). Accessed April 4, 2026 https://archive.org/details/InsideAppletalkVol2/022_AppleTalkFilingProtocolEngineeringTechnicalNotes/
* AppleTalk Data Stream Protocol Preliminary Note Final Draft (CAT NO: M028). Accessed April 4, 2026. https://archive.org/details/iavol1/011_AAPDAAppleTalkDataStreamPreliminaryNote/
* AppleTalk Phase 2 Protocol Specification June 30, 1989 Accessed April 4, 2026 https://archive.org/details/InsideAppletalkVol2/021_AppleTalkDataStreamProtocol
* AppleTalk Except from Naugle MG. Network Protocol Handbook. McGraw-Hill; 1994. Accessed April 6, 2026. https://archive.org/details/networkprotocolh0000naug
