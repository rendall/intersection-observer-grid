const createArticle = (i: number) => {
  const article = document.createElement("article");
  article.classList.add("cell");
  article.innerText = `${i}`;
  const container = document.querySelector(".container");
  container?.appendChild(article);
};
const createHeader = (i: number) => {
  const h2 = document.createElement("h2");
  h2.innerText = `Header ${i}`;
  const container = document.querySelector(".container");
  container?.appendChild(h2);
};
const makeDivs = () => {
  for (let i = 0; i < 10000; i++) {
    if (i % 100 === 0) createHeader(i);
    createArticle(i);
  }
};

const load = () => {
  makeDivs();
  const cells = Array.from<HTMLDivElement>(document.querySelectorAll(".cell"));
  cells.forEach(
    (cell) => console.log(cell.getClientRects()[0].x)
  );
};
load();
