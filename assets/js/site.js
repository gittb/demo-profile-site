/* L0 — hydrate the page from content/site.json.
   The HTML already contains readable fallback copy, so a failed fetch
   leaves a complete, sensible page rather than an empty one. */

(function () {
  "use strict";

  var SOURCE = "content/site.json";

  function apply(data) {
    if (!data || typeof data !== "object") return;

    var fields = document.querySelectorAll("[data-bind]");
    Array.prototype.forEach.call(fields, function (el) {
      var key = el.getAttribute("data-bind");
      if (!key) return;

      var value = data[key];
      if (typeof value !== "string" || value.trim() === "") return;

      el.textContent = value;
    });

    if (typeof data.name === "string" && data.name.trim() !== "") {
      document.title = data.name + " — " + (data.role || "Profile");
    }
  }

  if (typeof fetch !== "function") return;

  fetch(SOURCE, { cache: "no-cache" })
    .then(function (response) {
      if (!response.ok) throw new Error("HTTP " + response.status);
      return response.json();
    })
    .then(apply)
    .catch(function (error) {
      // Fallback markup is already in the document; log for developers only.
      console.warn("Content not loaded (" + error.message + "). Using fallback copy.");
    });
})();
