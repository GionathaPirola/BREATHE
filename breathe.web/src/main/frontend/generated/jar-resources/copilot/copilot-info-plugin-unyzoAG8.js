import { a as D, N as $, e as d, x as s, H as A, T as u, M as E, b as H, t as C, Q as J, V as P, I as S } from "./copilot-B_o-uLE6.js";
import { r as I } from "./state-CntcjBRC.js";
import { B as R } from "./base-panel-V2byb2px.js";
import { showNotification as V } from "./copilot-notification-DKwsq0H1.js";
import { i as _ } from "./icons-BRjZkMfg.js";
const O = "copilot-info-panel{--dev-tools-red-color: red;--dev-tools-grey-color: gray;--dev-tools-green-color: green;position:relative}copilot-info-panel div.info-tray{display:flex;flex-direction:column;gap:10px}copilot-info-panel dl{display:grid;grid-template-columns:auto auto;gap:0;margin:var(--space-100) var(--space-50);font:var(--font-xsmall)}copilot-info-panel dl>dt,copilot-info-panel dl>dd{padding:3px 10px;margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}copilot-info-panel dd.live-reload-status>span{overflow:hidden;text-overflow:ellipsis;display:block;color:var(--status-color)}copilot-info-panel dd span.hidden{display:none}copilot-info-panel dd span.true{color:var(--dev-tools-green-color);font-size:large}copilot-info-panel dd span.false{color:var(--dev-tools-red-color);font-size:large}copilot-info-panel code{white-space:nowrap;-webkit-user-select:all;user-select:all}copilot-info-panel .checks{display:inline-grid;grid-template-columns:auto 1fr;gap:var(--space-50)}copilot-info-panel span.hint{font-size:var(--font-size-0);background:var(--gray-50);padding:var(--space-75);border-radius:var(--radius-2)}";
var j = function() {
  var e = document.getSelection();
  if (!e.rangeCount)
    return function() {
    };
  for (var t = document.activeElement, a = [], l = 0; l < e.rangeCount; l++)
    a.push(e.getRangeAt(l));
  switch (t.tagName.toUpperCase()) {
    case "INPUT":
    case "TEXTAREA":
      t.blur();
      break;
    default:
      t = null;
      break;
  }
  return e.removeAllRanges(), function() {
    e.type === "Caret" && e.removeAllRanges(), e.rangeCount || a.forEach(function(i) {
      e.addRange(i);
    }), t && t.focus();
  };
}, U = j, v = {
  "text/plain": "Text",
  "text/html": "Url",
  default: "Text"
}, T = "Copy to clipboard: #{key}, Enter";
function L(e) {
  var t = (/mac os x/i.test(navigator.userAgent) ? "⌘" : "Ctrl") + "+C";
  return e.replace(/#{\s*key\s*}/g, t);
}
function N(e, t) {
  var a, l, i, o, r, n, h = !1;
  t || (t = {}), a = t.debug || !1;
  try {
    i = U(), o = document.createRange(), r = document.getSelection(), n = document.createElement("span"), n.textContent = e, n.ariaHidden = "true", n.style.all = "unset", n.style.position = "fixed", n.style.top = 0, n.style.clip = "rect(0, 0, 0, 0)", n.style.whiteSpace = "pre", n.style.webkitUserSelect = "text", n.style.MozUserSelect = "text", n.style.msUserSelect = "text", n.style.userSelect = "text", n.addEventListener("copy", function(c) {
      if (c.stopPropagation(), t.format)
        if (c.preventDefault(), typeof c.clipboardData > "u") {
          a && console.warn("unable to use e.clipboardData"), a && console.warn("trying IE specific stuff"), window.clipboardData.clearData();
          var m = v[t.format] || v.default;
          window.clipboardData.setData(m, e);
        } else
          c.clipboardData.clearData(), c.clipboardData.setData(t.format, e);
      t.onCopy && (c.preventDefault(), t.onCopy(c.clipboardData));
    }), document.body.appendChild(n), o.selectNodeContents(n), r.addRange(o);
    var x = document.execCommand("copy");
    if (!x)
      throw new Error("copy command was unsuccessful");
    h = !0;
  } catch (c) {
    a && console.error("unable to copy using execCommand: ", c), a && console.warn("trying IE specific stuff");
    try {
      window.clipboardData.setData(t.format || "text", e), t.onCopy && t.onCopy(window.clipboardData), h = !0;
    } catch (m) {
      a && console.error("unable to copy using clipboardData: ", m), a && console.error("falling back to prompt"), l = L("message" in t ? t.message : T), window.prompt(l, e);
    }
  } finally {
    r && (typeof r.removeRange == "function" ? r.removeRange(o) : r.removeAllRanges()), n && document.body.removeChild(n), i();
  }
  return h;
}
var B = N;
const M = /* @__PURE__ */ D(B);
var F = Object.defineProperty, W = Object.getOwnPropertyDescriptor, g = (e, t, a, l) => {
  for (var i = l > 1 ? void 0 : l ? W(t, a) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (i = (l ? r(t, a, i) : r(i)) || i);
  return l && i && F(t, a, i), i;
};
const w = s`<a
  href="${J}"
  target="_blank"
  @click="${() => k("idea")}"
  title="Get IntelliJ plugin"
  >Get IntelliJ plugin</a
>`, b = s`<a
  href="${P}"
  target="_blank"
  @click="${() => k("vscode")}"
  title="Get VS Code plugin"
  >Get VS Code plugin</a
>`;
function k(e) {
  return S("get-plugin", e), !1;
}
let f = class extends R {
  constructor() {
    super(...arguments), this.serverInfo = [], this.clientInfo = [{ name: "Browser", version: navigator.userAgent }], this.handleServerInfoEvent = (e) => {
      const t = JSON.parse(e.data.info);
      this.serverInfo = t.versions, this.updateJdkInfo(t.jdkInfo), this.updateIdePluginInfo(), $().then((a) => {
        a && (this.clientInfo.unshift({ name: "Vaadin Employee", version: "true", more: void 0 }), this.requestUpdate("clientInfo"));
      });
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.onCommand("copilot-info", this.handleServerInfoEvent), this.onEventBus("system-info-with-callback", (e) => {
      e.detail.callback(this.getInfoForClipboard(e.detail.notify));
    }), this.reaction(
      () => d.idePluginState,
      () => {
        this.updateIdePluginInfo(), this.requestUpdate("serverInfo");
      }
    );
  }
  updateJdkInfo(e) {
    const t = e.extendedClassDefCapable && e.runningWithExtendClassDef && e.hotswapAgentFound && e.runningWitHotswap && e.hotswapVersionOk, a = e.jrebel;
    d.jdkInfo = {
      ...e,
      activeHotswap: a ? "jrebel" : t ? "hotswapagent" : void 0
    };
  }
  updateIdePluginInfo() {
    const e = this.getIndex("Copilot IDE Plugin");
    let t = "false", a;
    d.idePluginState?.active ? t = `${d.idePluginState.version}-${d.idePluginState.ide}` : d.idePluginState?.ide === "vscode" ? a = b : d.idePluginState?.ide === "idea" ? a = w : a = s`${w} or ${b}`, this.serverInfo[e].version = t, this.serverInfo[e].more = a;
  }
  getIndex(e) {
    return this.serverInfo.findIndex((t) => t.name === e);
  }
  render() {
    return s`<style>
        ${O}
      </style>
      <div class="info-tray">
        <dl>
          ${[...this.serverInfo, ...this.clientInfo].map(
      (e) => s`
              <dt>${e.name}</dt>
              <dd title="${e.version}" style="${e.name === "Java Hotswap" ? "white-space: normal" : ""}">
                ${this.renderVersion(e)} ${e.more}
              </dd>
            `
    )}
        </dl>
      </div>`;
  }
  renderVersion(e) {
    return e.name === "Java Hotswap" ? this.renderJavaHotswap() : this.renderValue(e.version);
  }
  renderValue(e) {
    return e === "false" ? p(!1) : e === "true" ? p(!0) : e;
  }
  getInfoForClipboard(e) {
    const t = this.renderRoot.querySelectorAll(".info-tray dt"), i = Array.from(t).map((o) => ({
      key: o.textContent.trim(),
      value: o.nextElementSibling.textContent.trim()
    })).filter((o) => o.key !== "Live reload").filter((o) => !o.key.startsWith("Vaadin Emplo")).map((o) => {
      const { key: r } = o;
      let { value: n } = o;
      return r === "Copilot IDE Plugin" && !d.idePluginState?.active ? n = "false" : r === "Java Hotswap" && (n = String(n.includes("JRebel is in use") || n.includes("HotswapAgent is in use"))), `${r}: ${n}`;
    }).join(`
`);
    return e && V({
      type: A.INFORMATION,
      message: "Environment information copied to clipboard",
      dismissId: "versionInfoCopied"
    }), i.trim();
  }
  renderJavaHotswap() {
    const e = d.jdkInfo;
    if (!e)
      return u;
    const t = e.activeHotswap === "jrebel";
    return !e.extendedClassDefCapable && !t ? s`<details>
        <summary>${p(!1)} No Hotswap solution in use</summary>
        <p>To enable hotswap for Java, you can either use HotswapAgent or JRebel.</p>
        <p>HotswapAgent is an open source project that utilizes the JetBrains Runtime (JDK).</p>
        <div class="checks">
          <span class="hint"
            >If you are running IntelliJ, edit the launch configuration to use the bundled JDK.<br />
            Otherwise, download it from
            <a target="_blank" href="https://github.com/JetBrains/JetBrainsRuntime/releases"
              >the JetBrains release page</a
            >
            to get started.
          </span>
        </div>
        <p>
          JRebel is a commercial solution available from
          <a target="_blank" href="https://www.jrebel.com/">jrebel.com</a>
        </p>
      </details>` : t ? s`<div class="checks">
        ${p(!0)}
        <span>JRebel is in use</span>
      </div>` : e.activeHotswap === "hotswapagent" ? s`<div class="checks">${p(!0)}<span>HotswapAgent is in use</span></div>` : s`<details>
      <summary><div class="checks">${p(!1)} HotswapAgent is partially enabled</div></summary>
      <div class="checks">
        ${p(e.extendedClassDefCapable)}
        <span>JDK supports hotswapping</span>
        ${p(e.runningWithExtendClassDef)}
        <span>JDK hotswapping enabled</span>
          ${e.runningWithExtendClassDef ? u : s`<span></span
                  ><span class="hint"
                    >Add the <code>-XX:+AllowEnhancedClassRedefinition</code> JVM argument when launching the
                    application</span
                  >`}
          ${p(e.hotswapAgentFound)}
          <span>HotswapAgent installed</span>
          ${e.hotswapAgentFound ? u : s`<span></span
                  ><span class="hint"
                    ><a target="_blank" href="https://github.com/HotswapProjects/HotswapAgent/releases"
                      >Download the latest HotswapAgent</a
                    >
                    and place it in <code>${e.hotswapAgentLocation}</code></span
                  >`}
          ${p(e.hotswapVersionOk)}
          <span>HotswapAgent is version 1.4.2 or newer</span>
          ${e.hotswapVersionOk ? u : s`<span></span
                  ><span class="hint"
                    >HotswapAgent version ${e.hotswapVersion} is in use<br />
                    <a target="_blank" href="https://github.com/HotswapProjects/HotswapAgent/releases"
                      >Download the latest HotswapAgent</a
                    >
                    and place it in <code>${e.hotswapAgentLocation}</code></span
                  >`}
          ${p(e.runningWitHotswap)}
          <span>HotswapAgent configured</span>
          ${e.runningWitHotswap ? u : s`<span></span
                  ><span class="hint"
                    >Add the <code>-XX:HotswapAgent=fatjar</code> JVM argument when launching the application</span
                  >`}
          ${p(e.runningInJavaDebugMode)}
        <span>Application running in Java debug mode</span>
          ${e.runningInJavaDebugMode ? u : s`<span></span><span class="hint">Start the application in debug mode in the IDE</span>`}
        <a href="https://vaadin.com/docs/latest/flow/configuration/live-reload/hotswap-agent" target="_blank" style="grid-column: 1 / -1">Read more about Hot Deploy & Live Reload</a>
    </details> `;
  }
};
g([
  I()
], f.prototype, "serverInfo", 2);
g([
  I()
], f.prototype, "clientInfo", 2);
f = g([
  C("copilot-info-panel")
], f);
let y = class extends E {
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), this.style.display = "flex";
  }
  render() {
    return s`<button title="Copy to clipboard" aria-label="Copy to clipboard" theme="icon tertiary">
      <span
        @click=${() => {
      H.emit("system-info-with-callback", {
        callback: M,
        notify: !0
      });
    }}
        >${_.copy}</span
      >
    </button>`;
  }
};
y = g([
  C("copilot-info-actions")
], y);
const z = {
  header: "Info",
  expanded: !0,
  panelOrder: 15,
  panel: "right",
  floating: !1,
  tag: "copilot-info-panel",
  actionsTag: "copilot-info-actions"
}, G = {
  init(e) {
    e.addPanel(z);
  }
};
window.Vaadin.copilot.plugins.push(G);
function p(e) {
  return e ? s`<span class="true">☑</span>` : s`<span class="false">☒</span>`;
}
export {
  y as Actions,
  f as CopilotInfoPanel
};
