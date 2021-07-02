"use strict";
const createArticle = (i) => {
    const article = document.createElement("article");
    article.classList.add("cell");
    article.innerText = `${i}`;
    const container = document.querySelector(".container");
    container === null || container === void 0 ? void 0 : container.appendChild(article);
};
const createHeader = (i) => {
    const h2 = document.createElement("h2");
    h2.innerText = `Header ${i}`;
    const container = document.querySelector(".container");
    container === null || container === void 0 ? void 0 : container.appendChild(h2);
};
const makeDivs = () => {
    for (let i = 0; i < 10000; i++) {
        if (i % 100 === 0)
            createHeader(i);
        createArticle(i);
    }
};
const load = () => {
    makeDivs();
    const cells = Array.from(document.querySelectorAll(".cell"));
    cells.forEach((cell) => console.log(cell.getClientRects()[0].x));
};
load();
