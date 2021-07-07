"use strict";
const createArticle = (i) => {
    const article = document.createElement("article");
    article.classList.add("cell");
    const number = document.createElement("p");
    number.innerText = `${i}`;
    number.classList.add("number");
    article.appendChild(number);
    const view = document.querySelector(".view");
    view === null || view === void 0 ? void 0 : view.appendChild(article);
    return article;
};
const createHeader = (i) => {
    const h2 = document.createElement("h2");
    h2.innerText = `Header ${i}`;
    const view = document.querySelector(".view");
    view === null || view === void 0 ? void 0 : view.appendChild(h2);
};
const makeDivs = (observer) => {
    var _a, _b;
    document.querySelector(".view").innerHTML = "";
    const numElements = parseInt((_b = (_a = document.getElementById("number-value")) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : 10000);
    for (let i = 0; i < numElements; i++) {
        if (i % 100 === 0)
            createHeader(i);
        const article = createArticle(i);
        observer.observe(article);
    }
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
        console.log(`${renderedNum} elements rendered`);
    };
    const rootMargin = `${(_a = document.getElementById("margin-value").value) !== null && _a !== void 0 ? _a : 0}%`;
    const threshold = parseInt((_b = document.getElementById("threshold-value").value) !== null && _b !== void 0 ? _b : 0);
    console.log("observer options", { rootMargin, threshold });
    const observer = new IntersectionObserver(callback, {
        root: document.querySelector(".view"),
        rootMargin,
        threshold,
    });
    makeDivs(observer);
};
setup();
