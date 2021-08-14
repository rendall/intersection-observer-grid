(() => {
  "use strict";
  (() => {
    var e, t;
    const n = `${
        null !== (e = document.getElementById("margin-value").value) &&
        void 0 !== e
          ? e
          : 0
      }%`,
      l = parseInt(
        null !== (t = document.getElementById("threshold-value").value) &&
          void 0 !== t
          ? t
          : 0
      );
    ((e) => {
      var t, n;
      document.querySelector(".display").innerHTML = "";
      const l = parseInt(
        null !==
          (n =
            null === (t = document.getElementById("number-value")) ||
            void 0 === t
              ? void 0
              : t.value) && void 0 !== n
          ? n
          : 1e4
      );
      new Array(l)
        .fill(0)
        .map((e, t) => t)
        .forEach((t) => {
          t % 100 == 0 &&
            ((e) => {
              const t = document.createElement("h2");
              t.innerText = `Header ${e}`;
              const n = document.querySelector(".display");
              null == n || n.appendChild(t);
            })(t);
          const n = ((e) => {
            const t = document.createElement("article");
            t.classList.add("cell");
            const n = document.createElement("img");
            (n.src = `https://source.unsplash.com/random/160x160?${e}`),
              n.classList.add("image-display"),
              (n.loading = "lazy"),
              t.appendChild(n);
            const l = document.createElement("p");
            (l.innerText = `${e}`),
              l.classList.add("number-display"),
              t.appendChild(l);
            const r = document.querySelector(".display");
            return null == r || r.appendChild(t), t;
          })(t);
          e.observe(n);
        });
    })(
      new IntersectionObserver(
        (e, t) => {
          e.forEach((e) =>
            e.isIntersecting
              ? e.target.classList.add("is-view")
              : e.target.classList.remove("is-view")
          );
          const n = document.querySelectorAll(".is-view").length;
          document.getElementById(
            "rendered-number"
          ).innerText = `${n} elements rendered`;
        },
        {
          root: document.querySelector(".display"),
          rootMargin: n,
          threshold: l,
        }
      )
    ),
      document.querySelector("#toggle-view").addEventListener("click", () => {
        document.querySelector(".display").classList.toggle("list-view");
      });
  })();
})();
