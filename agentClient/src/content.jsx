// src/content.jsx
// AI generated 
console.log("✅ Content script loaded on", window.location.href);

const tag = document.createElement("div");
tag.innerText = "👀 AgentBinod is watching!";
tag.style.cssText =
  "position: fixed; top: 10px; right: 10px; background: #111; color: #0f0; padding: 10px; z-index: 999999;";
document.body.appendChild(tag);
