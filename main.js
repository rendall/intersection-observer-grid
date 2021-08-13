"use strict";
const createArticle = (i) => {
    const article = document.createElement("article");
    article.classList.add("cell");
    const imageDisplay = document.createElement("img");
    imageDisplay.src = `https://source.unsplash.com/random/160x160?${i}`;
    imageDisplay.classList.add('image-display');
    imageDisplay.loading = "lazy";
    article.appendChild(imageDisplay);
    const numberDisplay = document.createElement("p");
    numberDisplay.innerText = `${i}`;
    numberDisplay.classList.add("number-display");
    article.appendChild(numberDisplay);
    const view = document.querySelector(".display");
    view === null || view === void 0 ? void 0 : view.appendChild(article);
    return article;
};
const createHeader = (i) => {
    const h2 = document.createElement("h2");
    h2.innerText = `Header ${i}`;
    const view = document.querySelector(".display");
    view === null || view === void 0 ? void 0 : view.appendChild(h2);
};
const makeDivs = (observer) => {
    var _a, _b;
    document.querySelector(".display").innerHTML = "";
    const numElements = parseInt((_b = (_a = document.getElementById("number-value")) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : 10000);
    (new Array(numElements)).fill(0).map((z, i) => i).forEach(i => {
        if (i % 100 === 0)
            createHeader(i);
        const article = createArticle(i);
        observer.observe(article);
    });
};
const onSliderInput = (input) => {
    const id = `${input.id}-value`;
    const output = document.getElementById(id);
    output.value = input.value;
};
const onSliderChange = (e) => setup();
const setup = () => {
    var _a, _b;
    const allCells = () => Array.from(document.querySelectorAll(".cells"));
    const callback = (entries, observer) => {
        entries.forEach((entry) => entry.isIntersecting
            ? entry.target.classList.add("is-view")
            : entry.target.classList.remove("is-view"));
        const renderedNum = document.querySelectorAll(".is-view").length;
        document.getElementById("rendered-number").innerText = `${renderedNum} elements rendered`;
    };
    const rootMargin = `${(_a = document.getElementById("margin-value").value) !== null && _a !== void 0 ? _a : 0}%`;
    const threshold = parseInt((_b = document.getElementById("threshold-value").value) !== null && _b !== void 0 ? _b : 0);
    const observer = new IntersectionObserver(callback, {
        root: document.querySelector(".display"),
        rootMargin,
        threshold,
    });
    makeDivs(observer);
    const toggleView = document.querySelector("#toggle-view");
    toggleView.addEventListener("click", () => {
        document.querySelector(".display").classList.toggle("list-view");
    });
};
setup();
