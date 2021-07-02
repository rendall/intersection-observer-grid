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
    for (let i = 0; i < 10000; i++) {
        if (i % 100 === 0)
            createHeader(i);
        const article = createArticle(i);
        observer.observe(article);
    }
};
const allCells = () => Array.from(document.querySelectorAll(".cells"));
const load = () => {
    const options = {
        root: document.querySelector(".view"),
        rootMargin: "20%",
        threshold: 0.1,
    };
    const callback = (entries, observer) => {
        entries.forEach((entry) => entry.isIntersecting
            ? entry.target.classList.add("is-view")
            : entry.target.classList.remove("is-view"));
        console.log({ entries });
    };
    const observer = new IntersectionObserver(callback, options);
    makeDivs(observer);
};
load();
