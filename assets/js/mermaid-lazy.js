const mermaidSelector = "pre > code.language-mermaid";

let mermaidApiPromise;

function getMermaidApi() {
  if (!mermaidApiPromise) {
    mermaidApiPromise = (async () => {
      const mod = await import("https://cdn.jsdelivr.net/npm/mermaid@11.13.0/+esm");
      mod.default.initialize({
        startOnLoad: false,
        securityLevel: "strict",
      });
      return mod.default;
    })();
  }

  return mermaidApiPromise;
}

function buildContainer(source) {
  const container = document.createElement("div");
  container.className = "mermaid-lazy";

  const details = document.createElement("details");
  details.className = "mermaid-lazy-details";

  const summary = document.createElement("summary");
  summary.className = "mermaid-lazy-summary";
  summary.textContent = "Render diagram";
  details.appendChild(summary);

  const panel = document.createElement("div");
  panel.className = "mermaid-lazy-panel";

  const action = document.createElement("button");
  action.type = "button";
  action.className = "btn mermaid-lazy-button";
  action.textContent = "Render now";
  panel.appendChild(action);

  const target = document.createElement("div");
  target.className = "mermaid-lazy-target";
  panel.appendChild(target);

  details.appendChild(panel);
  container.appendChild(details);

  let rendered = false;
  let rendering = false;

  async function render() {
    if (rendered || rendering) return;
    rendering = true;
    action.disabled = true;
    action.textContent = "Rendering…";

    try {
      const mermaid = await getMermaidApi();
      const id = `mermaid-${Math.random().toString(36).slice(2)}`;
      const { svg } = await mermaid.render(id, source);
      target.innerHTML = svg;
      rendered = true;
      action.remove();
      summary.textContent = "Diagram";
    } catch (error) {
      action.disabled = false;
      action.textContent = "Retry render";
      target.textContent = "Failed to render Mermaid diagram.";
      console.error("Failed to render Mermaid diagram", error);
    } finally {
      rendering = false;
    }
  }

  action.addEventListener("click", render);
  details.addEventListener(
    "toggle",
    () => {
      if (details.open) {
        render();
      }
    },
    { once: true },
  );

  return container;
}

function setupMermaidLazyRender() {
  const blocks = Array.from(document.querySelectorAll(mermaidSelector));
  if (!blocks.length) return;

  for (const code of blocks) {
    const source = (code.textContent || "").replace(/\u00a0/g, " ").trim();
    if (!source) continue;

    const pre = code.closest("pre");
    if (!pre || !pre.parentNode) continue;

    const container = buildContainer(source);
    pre.parentNode.replaceChild(container, pre);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupMermaidLazyRender);
} else {
  setupMermaidLazyRender();
}
