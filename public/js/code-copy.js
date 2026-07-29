/*
 * Hallmark · component: code-copy · theme: Atelier (system reuse)
 * states: default · hover · focus · active · copied(success) · error
 * scope: only <pre> inside .article-content (direct article page) and
 *        #overlay-content (homepage overlay). Never touches .talk-bubble,
 *        so small_talk is provably excluded.
 * No dependencies. Vanilla JS. Exposes window.__setupCodeCopy(root).
 */
(function () {
  "use strict";

  var LABEL_COPY = "复制";
  var LABEL_COPIED = "已复制";
  var LABEL_ERROR = "失败";
  var REVERT_MS = 1600;

  function getCodeText(pre) {
    // Shiki renders the code inside <code> as <span class="line">…</span>
    // per line, with real newlines between line spans — textContent gives
    // the clean code body (no line numbers, no language label, no button).
    var code = pre.querySelector("code");
    return code ? code.textContent : pre.textContent;
  }

  function legacyCopy(text) {
    try {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "absolute";
      ta.style.left = "-9999px";
      ta.style.top = "0";
      document.body.appendChild(ta);
      ta.select();
      var ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch (e) {
      return false;
    }
  }

  function copyText(text, onDone, onFail) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(onDone, function () {
        if (legacyCopy(text)) onDone();
        else onFail();
      });
    } else if (legacyCopy(text)) {
      onDone();
    } else {
      onFail();
    }
  }

  function buildButton(pre) {
    if (pre.getAttribute("data-copy-bound") === "1") return;
    pre.setAttribute("data-copy-bound", "1");

    // Wrap <pre> in a positioned container so the button stays anchored to
    // the block and is NOT scrolled away by the <pre> horizontal scrollbar.
    var parent = pre.parentNode;
    if (!parent || parent.classList && parent.classList.contains("code-block")) return;
    var wrapper = document.createElement("div");
    wrapper.className = "code-block";
    parent.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "code-copy-btn";
    btn.setAttribute("aria-label", "复制代码");
    btn.textContent = LABEL_COPY;

    btn.addEventListener("click", function () {
      var text = getCodeText(pre);
      copyText(
        text,
        function () {
          btn.classList.add("is-copied");
          btn.classList.remove("is-error");
          btn.textContent = LABEL_COPIED;
          window.setTimeout(function () {
            btn.classList.remove("is-copied");
            btn.textContent = LABEL_COPY;
          }, REVERT_MS);
        },
        function () {
          btn.classList.add("is-error");
          btn.classList.remove("is-copied");
          btn.textContent = LABEL_ERROR;
          window.setTimeout(function () {
            btn.classList.remove("is-error");
            btn.textContent = LABEL_COPY;
          }, REVERT_MS);
        }
      );
    });

    wrapper.appendChild(btn);
  }

  function setup(root) {
    if (!root) return;
    var pres = root.querySelectorAll("pre");
    for (var i = 0; i < pres.length; i++) buildButton(pres[i]);
  }

  window.__setupCodeCopy = setup;

  function autoInit() {
    // Direct article page render. Overlay content is bound on demand by
    // MainLayout.openArticle via window.__setupCodeCopy(overlayContent).
    var nodes = document.querySelectorAll(".article-content");
    for (var i = 0; i < nodes.length; i++) setup(nodes[i]);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", autoInit);
  } else {
    autoInit();
  }
})();
